import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("AsciiDoc pages provide TOC and search fragments", () => {
  const siteDir = mkdtempSync(join(tmpdir(), "hextra-asciidoc-"));
  const contentDir = join(siteDir, "content");
  const publishDir = join(siteDir, "public");
  const themesDir = join(siteDir, "themes");
  const binDir = join(siteDir, "bin");

  mkdirSync(join(contentDir, "docs"), { recursive: true });
  mkdirSync(themesDir);
  mkdirSync(binDir);
  symlinkSync(process.cwd(), join(themesDir, "hextra"), "dir");

  const asciidoctorPath = join(binDir, "asciidoctor");
  writeFileSync(
    asciidoctorPath,
    `#!/bin/sh
cat >/dev/null
cat <<'HTML'
<div class="sect1">
<h2 id="_overview">Overview</h2>
<div class="sectionbody">
<div class="paragraph"><p>AsciiDoc paragraph content.</p></div>
<div class="sect2">
<h3 id="_details">Details</h3>
<div class="paragraph"><p>Nested detail content.</p></div>
</div>
</div>
</div>
HTML
`
  );
  chmodSync(asciidoctorPath, 0o755);

  writeFileSync(
    join(siteDir, "hugo.yaml"),
    `title: Test
baseURL: https://example.org/
theme: hextra
security:
  exec:
    allow:
      - "^asciidoctor$"
`
  );
  writeFileSync(
    join(contentDir, "_index.md"),
    `---
title: Home
---
`
  );
  writeFileSync(
    join(contentDir, "docs", "_index.md"),
    `---
title: Docs
---
`
  );
  writeFileSync(
    join(contentDir, "docs", "probe.adoc"),
    `---
title: Probe
---

= Probe

== Overview

AsciiDoc paragraph content.

=== Details

Nested detail content.
`
  );

  try {
    execFileSync("hugo", ["--source", siteDir, "--themesDir", themesDir, "--destination", publishDir], {
      cwd: process.cwd(),
      env: { ...process.env, PATH: `${binDir}:${process.env.PATH}` },
      stdio: "pipe",
    });

    const html = readFileSync(join(publishDir, "docs", "probe", "index.html"), "utf8");
    expect(html).toContain("AsciiDoc paragraph content.");
    expect(html).toContain('href="#_overview"');
    expect(html).toContain('href="#_details"');

    const searchFile = findSearchDataFile(publishDir);
    const searchData = readFileSync(searchFile, "utf8");
    expect(searchData).toContain("_overview#Overview");
    expect(searchData).toContain("Overview AsciiDoc paragraph content.");
    expect(searchData).toContain("_details#Details");
    expect(searchData).toContain("Details Nested detail content.");
  } finally {
    rmSync(siteDir, { recursive: true, force: true });
  }
});

function findSearchDataFile(dir: string): string {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = findSearchDataFile(path);
      if (nested) return nested;
    } else if (entry.name.includes("search-data")) {
      return path;
    }
  }
  return "";
}
