import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// KaTeX renamed this class in 0.18 (sizing -> katex-sizing); accept either.
const SIZING_CLASS_NAMES = ["sizing", "katex-sizing"];

test("KaTeX stylesheet is compatible with Hugo's server-side renderer", () => {
  const siteDir = mkdtempSync(join(tmpdir(), "hextra-katex-"));

  try {
    const contentDir = join(siteDir, "content");
    const publishDir = join(siteDir, "public");
    const themesDir = join(siteDir, "themes");

    mkdirSync(contentDir);
    mkdirSync(themesDir);
    symlinkSync(process.cwd(), join(themesDir, "hextra"), "dir");

    writeFileSync(
      join(siteDir, "hugo.yaml"),
      `title: Test
baseURL: https://example.org/
theme: hextra
# Hugo keys its remote-resource cache by project dir basename; pin a stable
# name so the per-run temp dir doesn't defeat caching or orphan cache dirs.
caches:
  getresource:
    dir: :cacheDir/hextra-katex-test
markup:
  goldmark:
    extensions:
      passthrough:
        delimiters:
          inline: [['\\(', '\\)']]
        enable: true
`
    );
    writeFileSync(
      join(contentDir, "_index.md"),
      `---
title: Math
---

This \\(\\sigma(z) = \\frac{1}{1 + e^{-z}}\\) is an inline expression.
`
    );

    try {
      execFileSync("hugo", ["--source", siteDir, "--themesDir", themesDir, "--destination", publishDir], {
        cwd: process.cwd(),
        stdio: "pipe",
      });
    } catch (error: any) {
      throw new Error(`hugo build failed:\n${error.stderr?.toString() ?? error.message}`);
    }

    const html = readFileSync(join(publishDir, "index.html"), "utf8");
    const elementClasses = Array.from(html.matchAll(/class="([^"]*)"/g), (match) => match[1].split(/\s+/)).find(
      (classes) => classes.includes("reset-size6") && classes.includes("size3") && SIZING_CLASS_NAMES.some((name) => classes.includes(name))
    );
    const sizingClass = elementClasses?.find((name) => SIZING_CLASS_NAMES.includes(name));
    const stylesheetPath = html.match(/href="([^"]*\/katex(?:\.min)?\.[^"]+\.css)"/)?.[1];

    expect(sizingClass, "Hugo output should contain a KaTeX sizing class").toBeTruthy();
    expect(stylesheetPath, "Hextra should publish the KaTeX stylesheet").toBeTruthy();

    const css = readFileSync(join(publishDir, new URL(stylesheetPath!, "https://example.org").pathname), "utf8");
    expect(css).toContain(`.katex .${sizingClass}.reset-size6.size3`);
  } finally {
    rmSync(siteDir, { recursive: true, force: true });
  }
});
