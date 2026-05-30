import { test, expect } from "@playwright/test";

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
