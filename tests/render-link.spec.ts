import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("render hook resolves Markdown page links to Hugo clean URLs", () => {
  const siteDir = mkdtempSync(join(tmpdir(), "hextra-render-link-"));
  const contentDir = join(siteDir, "content");
  const publishDir = join(siteDir, "public");
  const themesDir = join(siteDir, "themes");

  mkdirSync(join(contentDir, "docs", "guide", "bundle"), { recursive: true });
  mkdirSync(join(contentDir, "docs", "guide", "sub"), { recursive: true });
  mkdirSync(themesDir);
  symlinkSync(process.cwd(), join(themesDir, "hextra"), "dir");

  writeFileSync(
    join(siteDir, "hugo.yaml"),
    `title: Test
baseURL: https://example.org/base/
theme: hextra
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
    join(contentDir, "docs", "overview.md"),
    `---
title: Overview
---
`
  );
  writeFileSync(
    join(contentDir, "docs", "guide", "_index.md"),
    `---
title: Guide
---
`
  );
  writeFileSync(
    join(contentDir, "docs", "guide", "sibling.md"),
    `---
title: Sibling
---
`
  );
  writeFileSync(
    join(contentDir, "docs", "guide", "sub", "topic.md"),
    `---
title: Topic
---
`
  );
  writeFileSync(
    join(contentDir, "docs", "guide", "current.md"),
    `---
title: Current
---

[Sibling](./sibling.md)
[Parent](../overview.md)
[Nested](sub/topic.md?view=full#part)
[Absolute](/docs/overview.md#top)
[Missing](missing.md?x=1#frag)
[Remote](https://example.com/readme.md)
`
  );
  writeFileSync(
    join(contentDir, "docs", "guide", "bundle", "index.md"),
    `---
title: Bundle
---

[Bundle sibling](../sibling.md)
`
  );

  try {
    execFileSync("hugo", ["--source", siteDir, "--themesDir", themesDir, "--destination", publishDir], { cwd: process.cwd(), stdio: "pipe" });

    const html = readFileSync(join(publishDir, "docs", "guide", "current", "index.html"), "utf8");
    const contentStart = html.indexOf('<div class="content">');
    const contentEnd = html.indexOf('<div class="hx:mt-16"', contentStart);
    const contentHtml = html.slice(contentStart, contentEnd);

    expect(contentStart).toBeGreaterThanOrEqual(0);
    expect(contentEnd).toBeGreaterThan(contentStart);
    expect(contentHtml).toContain('href="/base/docs/guide/sibling/">Sibling');
    expect(contentHtml).toContain('href="/base/docs/overview/">Parent');
    expect(contentHtml).toContain('href="/base/docs/guide/sub/topic/?view=full#part">Nested');
    expect(contentHtml).toContain('href="/base/docs/overview/#top">Absolute');
    expect(contentHtml).toContain('href="missing.md?x=1#frag">Missing');
    expect(contentHtml).toContain('href="https://example.com/readme.md"target="_blank" rel="noopener">Remote');

    const bundleHtml = readFileSync(join(publishDir, "docs", "guide", "bundle", "index.html"), "utf8");
    expect(bundleHtml).toContain('href="/base/docs/guide/sibling/">Bundle sibling');
  } finally {
    rmSync(siteDir, { recursive: true, force: true });
  }
});
