import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("production custom.css is fingerprinted without minifying quoted font names", () => {
  const siteDir = mkdtempSync(join(tmpdir(), "hextra-custom-css-"));
  const contentDir = join(siteDir, "content");
  const assetsCssDir = join(siteDir, "assets", "css");
  const publishDir = join(siteDir, "public");
  const themesDir = join(siteDir, "themes");

  mkdirSync(contentDir);
  mkdirSync(assetsCssDir, { recursive: true });
  mkdirSync(themesDir);
  symlinkSync(process.cwd(), join(themesDir, "hextra"), "dir");

  writeFileSync(
    join(siteDir, "hugo.yaml"),
    `title: Test
baseURL: https://example.org/
theme: hextra
params:
  search:
    enable: false
`
  );
  writeFileSync(
    join(contentDir, "_index.md"),
    `---
title: Home
---

Home content.
`
  );
  writeFileSync(
    join(assetsCssDir, "custom.css"),
    `.content {
  font-family: "Times New Roman", Times, serif;
}
`
  );

  try {
    execFileSync("hugo", ["--source", siteDir, "--themesDir", themesDir, "--destination", publishDir, "--environment", "production"], { cwd: process.cwd(), stdio: "pipe" });

    const cssDir = join(publishDir, "css");
    const cssFiles = readdirSync(cssDir);
    const customCssFiles = cssFiles.filter((file) => /^custom\.[a-f0-9]{64}\.css$/.test(file));
    const compiledCssFiles = cssFiles.filter((file) => file.startsWith("compiled") || file.includes("main"));

    expect(customCssFiles).toHaveLength(1);
    expect(cssFiles.some((file) => file.includes("custom") && file.includes(".min."))).toBe(false);

    const customCss = readFileSync(join(cssDir, customCssFiles[0]), "utf8");
    expect(customCss).toContain('"Times New Roman"');

    const html = readFileSync(join(publishDir, "index.html"), "utf8");
    expect(html).toContain(`/css/${customCssFiles[0]}`);
    // Theme bundle remains a separate minified stylesheet.
    expect(html).toMatch(/css\/compiled\/main\.min\.[a-f0-9]{64}\.css/);
    expect(compiledCssFiles.length).toBeGreaterThan(0);
  } finally {
    rmSync(siteDir, { recursive: true, force: true });
  }
});
