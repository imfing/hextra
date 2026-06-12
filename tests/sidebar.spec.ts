import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test, expect } from "@playwright/test";

test.describe("root data sidebar", () => {
  test("uses top-level sidebar data for doc-like root content", () => {
    const siteDir = mkdtempSync(join(tmpdir(), "hextra-root-sidebar-"));

    try {
      mkdirSync(join(siteDir, "content"), { recursive: true });
      mkdirSync(join(siteDir, "content", "reference"), { recursive: true });
      mkdirSync(join(siteDir, "data"), { recursive: true });
      mkdirSync(join(siteDir, "themes"), { recursive: true });
      symlinkSync(process.cwd(), join(siteDir, "themes", "hextra"), "dir");

      writeFileSync(
        join(siteDir, "hugo.yaml"),
        `baseURL: "https://example.org/"
title: "Root Docs"
theme: "hextra"
disableKinds: ["taxonomy", "term"]
`
      );
      writeFileSync(
        join(siteDir, "content", "_index.md"),
        `---
title: Root Docs
type: docs
cascade:
  type: docs
---
`
      );
      writeFileSync(
        join(siteDir, "content", "intro.md"),
        `---
title: Intro
---

Intro page.
`
      );
      writeFileSync(
        join(siteDir, "content", "manual.md"),
        `---
title: Manual
---

Manual page.
`
      );
      writeFileSync(
        join(siteDir, "content", "reference", "_index.md"),
        `---
title: Reference
---

Reference section.
`
      );
      writeFileSync(
        join(siteDir, "content", "reference", "concepts.md"),
        `---
title: Concepts
---

Concepts page.
`
      );
      writeFileSync(
        join(siteDir, "content", "reference", "api.md"),
        `---
title: API
---

API page.
`
      );
      writeFileSync(
        join(siteDir, "data", "sidebar.yaml"),
        `- link: /intro/
  title: Intro from root data
- link: /manual/
  title: Manual from root data
- link: /reference/
  title: Reference section from root data
  merge: deep
  items:
    - link: /reference/concepts/
      title: Concepts pinned from root data
`
      );

      execFileSync("hugo", ["--source", siteDir, "--destination", join(siteDir, "public")], { cwd: process.cwd() });

      const html = readFileSync(join(siteDir, "public", "intro", "index.html"), "utf8");
      expect(html).toContain("Intro from root data");
      expect(html).toContain("Manual from root data");

      const sectionHtml = readFileSync(join(siteDir, "public", "reference", "index.html"), "utf8");
      expect(sectionHtml).toContain("Reference section from root data");
      expect(sectionHtml).toContain("Concepts pinned from root data");
      expect(sectionHtml).toContain("API");
    } finally {
      rmSync(siteDir, { recursive: true, force: true });
    }
  });
});

test.describe("data-first sidebar", () => {
  test("renders data nodes and auto-fallback nodes via merge: deep", async ({ page }) => {
    await page.goto("/docs/sidebar-lab/");
    const desktop = page.locator("ul.hextra-sidebar-desktop-list");
    await expect(desktop.locator('a[href="/docs/sidebar-lab/manual-only/"]')).toBeVisible();
    await expect(desktop.locator('a[href="/docs/sidebar-lab/auto-fallback/"]')).toBeVisible();
  });

  test("falls back to page title when data node omits title", async ({ page }) => {
    await page.goto("/docs/sidebar-lab/");
    const link = page.locator('ul.hextra-sidebar-desktop-list a[href="/docs/sidebar-lab/manual-only/"]');
    await expect(link).toBeVisible();
    await expect(link).toContainText("Manual Only Page");
  });

  test("renders type: separator data nodes as labels", async ({ page }) => {
    await page.goto("/docs/sidebar-lab/");
    const desktop = page.locator("ul.hextra-sidebar-desktop-list");
    const separator = desktop.locator("li.hextra-sidebar-separator", { hasText: "Deep Dive" });

    await expect(separator).toBeVisible();
    await expect(separator.locator("a")).toHaveCount(0);
  });

  test("respects sidebar.exclude on auto-generated children", async ({ page }) => {
    await page.goto("/docs/sidebar-lab/");
    const desktop = page.locator("ul.hextra-sidebar-desktop-list");
    await expect(desktop.locator('a[href="/docs/sidebar-lab/excluded-page/"]')).toHaveCount(0);
  });

  test("merge: none replaces children with explicit list only", async ({ page }) => {
    await page.goto("/docs/sidebar-lab/");
    const desktop = page.locator("ul.hextra-sidebar-desktop-list");
    await expect(desktop.locator('a[href="/docs/sidebar-lab/manual-parent/manual-node/"]')).toBeVisible();
    await expect(desktop.locator('a[href="/docs/sidebar-lab/manual-parent/auto-child-under-manual-parent/"]')).toHaveCount(0);
  });

  test("merge: deep appends unmatched auto children", async ({ page }) => {
    await page.goto("/docs/sidebar-lab/");
    const desktop = page.locator("ul.hextra-sidebar-desktop-list");
    await expect(desktop.locator('a[href="/docs/sidebar-lab/deep-parent/deep-manual-node/"]')).toBeVisible();
    await expect(desktop.locator('a[href="/docs/sidebar-lab/deep-parent/deep-auto-child/"]')).toBeVisible();
  });

  test("auto-tree fallback works for sections without data", async ({ page }) => {
    await page.goto("/docs/getting-started/");
    const desktop = page.locator("ul.hextra-sidebar-desktop-list");
    await expect(desktop.locator('a[href="/docs/getting-started/"]')).toBeVisible();
  });

  test("data nodes inherit sidebar.open from linked pages", async ({ page }) => {
    await page.goto("/docs/getting-started/");
    const guide = page.locator('ul.hextra-sidebar-desktop-list a[href="/docs/guide/"]');
    const guideItem = guide.locator("xpath=ancestor::li[1]");

    await expect(guide).toBeVisible();
    await expect(guideItem).toHaveClass(/open/);
    await expect(guideItem.locator(":scope > .hextra-sidebar-item > button")).toHaveAttribute("aria-expanded", "true");
  });
});

test.describe("mobile sidebar", () => {
  test("uses menu.main entries at top level", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto("/docs/sidebar-lab/");
    const mobile = page.locator("ul.hextra-sidebar-mobile-list");
    await expect(mobile.locator('a[href="/docs/"]').first()).toBeVisible();
  });

  test("shows data-driven children within mobile tree", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto("/docs/sidebar-lab/");
    const mobile = page.locator("ul.hextra-sidebar-mobile-list");
    await expect(mobile.locator('a[href="/docs/sidebar-lab/manual-only/"]').first()).toBeVisible();
  });

  test("marks external links from their href", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto("/docs/sidebar-lab/");
    const external = page.locator('ul.hextra-sidebar-mobile-list a[href="https://imfing.github.io/hextra/versions/latest/"]');

    await expect(external).toHaveAttribute("target", "_blank");
    await expect(external).toHaveAttribute("rel", /noreferrer/);
  });

  test("injects mobile TOC when only desktop active item is available", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto("/docs/guide/configuration/");

    const mobile = page.locator("ul.hextra-sidebar-mobile-list");
    await expect(mobile.locator(".hextra-sidebar-toc-link").first()).toBeVisible();

    await page.evaluate(() => {
      const container = document.querySelector(".hextra-sidebar-container");
      if (!container) throw new Error("Missing sidebar container");

      container.querySelectorAll(".hextra-sidebar-mobile-list .hextra-sidebar-toc-link").forEach((link) => {
        link.closest("ul")?.remove();
      });
      container.querySelectorAll(".hextra-sidebar-mobile-list .hextra-sidebar-active-item").forEach((link) => {
        link.classList.remove("hextra-sidebar-active-item", "hextra-sidebar-link-active");
        link.classList.add("hextra-sidebar-link-inactive");
      });

      const sidebar = window as unknown as { injectMobileTOC: (container: Element) => void };
      sidebar.injectMobileTOC(container);
    });

    await expect(mobile.locator(".hextra-sidebar-toc-link").first()).toBeVisible();
  });
});

test.describe("semantic classes and legacy hooks", () => {
  test("hextra-sidebar-container exists", async ({ page }) => {
    await page.goto("/docs/sidebar-lab/");
    await expect(page.locator(".hextra-sidebar-container")).toHaveCount(1);
  });

  test("active item has semantic and legacy classes", async ({ page }) => {
    await page.goto("/docs/sidebar-lab/");
    const activeLink = page.locator("ul.hextra-sidebar-desktop-list a.hextra-sidebar-active-item");
    await expect(activeLink.first()).toBeVisible();
    await expect(activeLink.first()).toHaveClass(/hextra-sidebar-link-active/);
  });

  test("hextra-sidebar-link class is present on links", async ({ page }) => {
    await page.goto("/docs/sidebar-lab/");
    const link = page.locator("ul.hextra-sidebar-desktop-list a.hextra-sidebar-link").first();
    await expect(link).toBeVisible();
  });

  test("collapsible button has aria-expanded", async ({ page }) => {
    await page.goto("/docs/sidebar-lab/");
    const button = page.locator("ul.hextra-sidebar-desktop-list button.hextra-sidebar-collapsible-button").first();
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("aria-expanded", /(true|false)/);
    await expect(button).toHaveAttribute("aria-label", /.+/);
  });
});
