import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

test("clicking mobile hamburger does not focus the sidebar search input", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/", { waitUntil: "load" });

  const menuButton = page.locator(".hextra-hamburger-menu");
  await expect(menuButton).toBeVisible();

  const sidebarSearchInput = page.locator(".hextra-sidebar-container .hextra-search-input").first();
  await expect(sidebarSearchInput).toBeVisible();

  await menuButton.click();

  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(sidebarSearchInput).not.toBeFocused();
});

test("mobile sidebar exposes main menu dropdown children", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "load" });

  await page.getByRole("button", { name: "Menu" }).click();

  const sidebar = page.locator("aside.hextra-sidebar-container");
  await expect(sidebar.getByRole("link", { name: "Development ↗" })).toBeVisible();
  await expect(sidebar.getByRole("link", { name: "v0.10 ↗" })).toBeVisible();
  await expect(sidebar.getByRole("link", { name: "v0.11 ↗" })).toBeVisible();
});

test("mobile sidebar uses localized page titles for zh-cn docs navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/zh-cn/", { waitUntil: "load" });

  await page.locator(".hextra-hamburger-menu").click();

  const sidebar = page.locator("aside.hextra-sidebar-container");
  const gettingStarted = sidebar.locator('a[href="/zh-cn/docs/getting-started/"]');
  const guide = sidebar.locator('a[href="/zh-cn/docs/guide/"]');
  const organizeFiles = sidebar.locator('a[href="/zh-cn/docs/guide/organize-files/"]');

  await expect(gettingStarted).toBeVisible();
  await expect(gettingStarted).toHaveText("快速开始");
  await expect(guide).toBeVisible();
  await expect(guide).toHaveText("指南");
  await expect(organizeFiles).toBeVisible();
  await expect(organizeFiles).toHaveText("文件组织");
  await expect(gettingStarted).not.toHaveText("Getting Started");
  await expect(guide).not.toHaveText("Guide");
});

test("mobile sidebar falls back to content tree when main menu has no eligible entries", async () => {
  const siteDir = mkdtempSync(join(tmpdir(), "hextra-mobile-menu-"));
  const contentDir = join(siteDir, "content");
  const publishDir = join(siteDir, "public");

  mkdirSync(join(contentDir, "docs"), { recursive: true });
  mkdirSync(join(contentDir, "donate"), { recursive: true });
  writeFileSync(
    join(siteDir, "hugo.yaml"),
    `title: Test
theme: hextra
menu:
  main:
    - name: Donate
      pageRef: /donate
      weight: 1
    - name: Search
      weight: 2
      params:
        type: search
    - name: GitHub
      weight: 3
      url: "https://github.com/imfing/hextra"
      params:
        icon: github
`,
  );
  writeFileSync(
    join(contentDir, "_index.md"),
    `---
title: Home
cascade:
  type: docs
---
`,
  );
  writeFileSync(
    join(contentDir, "docs", "_index.md"),
    `---
title: Docs
---
`,
  );
  writeFileSync(
    join(contentDir, "docs", "getting-started.md"),
    `---
title: Getting Started
---
`,
  );
  writeFileSync(
    join(contentDir, "donate", "index.md"),
    `---
title: Donate
sidebar:
  exclude: true
---
`,
  );

  try {
    execFileSync(
      "hugo",
      [
        "--source",
        siteDir,
        "--themesDir",
        dirname(process.cwd()),
        "--destination",
        publishDir,
      ],
      { cwd: process.cwd(), stdio: "pipe" },
    );

    const html = readFileSync(join(publishDir, "index.html"), "utf8");
    const mobileSidebar = html.match(
      /<ul class="hx:flex hx:flex-col hx:gap-1 hx:md:hidden">([\s\S]*?)<\/ul>/,
    )?.[1];

    expect(mobileSidebar).toBeTruthy();
    expect(mobileSidebar).toContain('href="/docs/"');
    expect(mobileSidebar).toContain('href="/docs/getting-started/"');
  } finally {
    rmSync(siteDir, { recursive: true, force: true });
  }
});
