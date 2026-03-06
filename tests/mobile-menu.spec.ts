import { test, expect } from "@playwright/test";

test("clicking mobile hamburger does not focus the sidebar search input", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/", { waitUntil: "load" });

  const menuButton = page.locator(".hextra-hamburger-menu");
  await expect(menuButton).toBeVisible();

  const sidebarSearchInput = page
    .locator(".hextra-sidebar-container .hextra-search-input")
    .first();
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
