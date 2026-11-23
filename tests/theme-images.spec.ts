import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("Markdown image fragments select the visible image, caption and link by theme", async ({ page }) => {
  const siteDir = mkdtempSync(join(tmpdir(), "hextra-theme-images-"));
  const themesDir = join(siteDir, "themes");
  mkdirSync(join(siteDir, "content"));
  mkdirSync(themesDir);
  symlinkSync(process.cwd(), join(themesDir, "hextra"), "dir");
  writeFileSync(join(siteDir, "hugo.yaml"), "title: Test\nbaseURL: https://example.org/\ntheme: hextra\n");
  writeFileSync(
    join(siteDir, "content", "_index.md"),
    `---
title: Home
---

![Light](light.png#gh-light-mode-only)
![Dark](dark.png#gh-dark-mode-only)

![Light caption](light.png#gh-light-mode-only "Light caption")
![Dark caption](dark.png#gh-dark-mode-only "Dark caption")

[![Linked light](light.png#gh-light-mode-only)](https://example.org/light)
[![Linked dark](dark.png#gh-dark-mode-only)](https://example.org/dark)
`
  );

  try {
    execFileSync("hugo", ["--source", siteDir, "--themesDir", themesDir], { cwd: process.cwd(), stdio: "pipe" });
    const html = readFileSync(join(siteDir, "public", "index.html"), "utf8");
    const css = readFileSync(join(process.cwd(), "assets/css/compiled/main.css"), "utf8");
    await page.setContent(html);
    await page.addStyleTag({ content: css });

    for (const dark of [false, true]) {
      await page.locator("html").evaluate((element, enabled) => element.classList.toggle("dark", enabled), dark);
      const visible = dark ? "dark" : "light";
      const hidden = dark ? "light" : "dark";
      await expect(page.locator(`img[alt="${visible === "dark" ? "Dark" : "Light"}"]`)).toBeVisible();
      await expect(page.locator(`img[alt="${hidden === "dark" ? "Dark" : "Light"}"]`)).toBeHidden();
      await expect(page.locator(`figure:has(> img[alt="${visible === "dark" ? "Dark caption" : "Light caption"}"])`)).toBeVisible();
      await expect(page.locator(`figure:has(> img[alt="${hidden === "dark" ? "Dark caption" : "Light caption"}"])`)).toBeHidden();
      await expect(page.locator(`a[href="https://example.org/${visible}"]:has(> img)`)).toBeVisible();
      await expect(page.locator(`a[href="https://example.org/${hidden}"]:has(> img)`)).toBeHidden();
    }
  } finally {
    rmSync(siteDir, { recursive: true, force: true });
  }
});
