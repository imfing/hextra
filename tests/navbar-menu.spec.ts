import { test, expect } from "@playwright/test";

test("desktop navbar dropdown supports pointer and keyboard interactions", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "load" });

  const versionsToggle = page.getByRole("button", { name: "Versions" });
  const versionsMenu = versionsToggle.locator("xpath=following-sibling::ul[1]");
  const developmentLink = versionsMenu.getByRole("menuitem", {
    name: "Development ↗",
  });

  await expect(versionsToggle).toBeVisible();

  await versionsToggle.click();
  await expect(versionsToggle).toHaveAttribute("aria-expanded", "true");
  await expect(versionsMenu).toBeVisible();
  await expect(developmentLink).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(versionsToggle).toHaveAttribute("aria-expanded", "false");
  await expect(versionsMenu).toBeHidden();
  await expect(versionsToggle).toBeFocused();

  await versionsToggle.focus();
  await page.keyboard.press("ArrowDown");
  await expect(versionsToggle).toHaveAttribute("aria-expanded", "true");
  await expect(developmentLink).toBeFocused();
});
