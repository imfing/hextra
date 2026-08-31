import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("KaTeX stylesheet is compatible with Hugo's server-side renderer", () => {
  const siteDir = mkdtempSync(join(tmpdir(), "hextra-katex-"));
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

    const html = readFileSync(join(publishDir, "index.html"), "utf8");
    const sizingClasses = Array.from(html.matchAll(/class="([^"]*)"/g), (match) => match[1].split(/\s+/)).find(
      (classes) => classes.includes("reset-size6") && classes.includes("size3") && (classes.includes("sizing") || classes.includes("katex-sizing"))
    );
    const sizingClass = sizingClasses?.find((name) => name === "sizing" || name === "katex-sizing");
    const stylesheetPath = html.match(/href="([^"]*\/katex(?:\.min)?\.[^"]+\.css)"/)?.[1];

    expect(sizingClass, "Hugo output should contain a KaTeX sizing class").toBeTruthy();
    expect(stylesheetPath, "Hextra should publish the KaTeX stylesheet").toBeTruthy();

    const css = readFileSync(join(publishDir, new URL(stylesheetPath!, "https://example.org").pathname), "utf8");
    expect(css).toContain(`.katex .${sizingClass}.reset-size6.size3`);
  } finally {
    rmSync(siteDir, { recursive: true, force: true });
  }
});
