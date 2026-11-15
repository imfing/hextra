import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("sidebar renders a section with sidebar.link false as a toggle without a link", () => {
  const siteDir = mkdtempSync(join(tmpdir(), "hextra-sidebar-link-"));
  const contentDir = join(siteDir, "content");
  const publishDir = join(siteDir, "public");
  const themesDir = join(siteDir, "themes");

  mkdirSync(join(contentDir, "docs", "guide"), { recursive: true });
  mkdirSync(themesDir);
  symlinkSync(process.cwd(), join(themesDir, "hextra"), "dir");

  writeFileSync(
    join(siteDir, "hugo.yaml"),
    `title: Test
baseURL: https://example.org/
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
    join(contentDir, "docs", "guide", "_index.md"),
    `---
title: Guide
sidebar:
  link: false
---
`
  );
  writeFileSync(
    join(contentDir, "docs", "guide", "topic.md"),
    `---
title: Topic
---
`
  );

  try {
    execFileSync("hugo", ["--source", siteDir, "--themesDir", themesDir, "--destination", publishDir], { cwd: process.cwd(), stdio: "pipe" });

    const html = readFileSync(join(publishDir, "docs", "guide", "topic", "index.html"), "utf8");
    const sidebarStart = html.indexOf("<aside");
    const sidebarEnd = html.indexOf("</aside>", sidebarStart);
    const sidebarHtml = html.slice(sidebarStart, sidebarEnd);

    expect(sidebarStart).toBeGreaterThanOrEqual(0);
    expect(sidebarEnd).toBeGreaterThan(sidebarStart);
    expect(sidebarHtml).not.toContain('href="/docs/guide/"');
    expect(sidebarHtml).toMatch(/<button type="button"[^>]*aria-expanded="true"[^>]*>\s*<span[^>]*>Guide<\/span>/);
    expect(sidebarHtml).toContain('href="/docs/guide/topic/"');
  } finally {
    rmSync(siteDir, { recursive: true, force: true });
  }
});
