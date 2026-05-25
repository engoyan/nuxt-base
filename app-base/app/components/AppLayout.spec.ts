import { test, expect } from "@playwright/test";

test.describe("AppLayout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders app bar with title", async ({ page }) => {
    const appBar = page.locator(".v-app-bar");
    await expect(appBar).toBeVisible();
    await expect(appBar).toContainText("Nuxt");
  });

  test("shows side navigation on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const drawer = page.locator(".v-navigation-drawer");
    await expect(drawer).toBeVisible();
  });

  test("shows bottom navigation on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    const bottomNav = page.locator(".v-bottom-navigation");
    await expect(bottomNav).toBeVisible();
  });

  test("hamburger toggles drawer on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    const hamburger = page.locator(".v-app-bar-nav-icon");
    await hamburger.click();
    const drawer = page.locator(".v-navigation-drawer");
    await expect(drawer).toBeVisible();
  });

  test("user menu is present in app bar", async ({ page }) => {
    const appBar = page.locator(".v-app-bar");
    const userArea = appBar.locator(".v-avatar, .v-btn:has-text('Login')");
    await expect(userArea.first()).toBeVisible();
  });
});
