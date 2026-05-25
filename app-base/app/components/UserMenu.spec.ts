import { test, expect } from "@playwright/test";

test.describe("UserMenu", () => {
  test("shows login button when not authenticated", async ({ page }) => {
    await page.goto("/");
    const loginBtn = page.locator(".v-app-bar .v-btn:has-text('Login')");
    await expect(loginBtn).toBeVisible();
  });

  test("login button navigates to /login", async ({ page }) => {
    await page.goto("/");
    const loginBtn = page.locator(".v-app-bar .v-btn:has-text('Login')");
    await loginBtn.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test("shows avatar when authenticated", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      const fakeAuth = JSON.stringify({
        token: "fake-jwt-token",
        record: { id: "test123", email: "user@example.com", collectionName: "users" },
      });
      localStorage.setItem("pocketbase_auth", fakeAuth);
    });
    await page.reload();
    const avatar = page.locator(".v-app-bar .v-avatar");
    await expect(avatar).toBeVisible();
  });

  test("dropdown shows profile and logout options", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      const fakeAuth = JSON.stringify({
        token: "fake-jwt-token",
        record: { id: "test123", email: "user@example.com", collectionName: "users" },
      });
      localStorage.setItem("pocketbase_auth", fakeAuth);
    });
    await page.reload();
    const avatarBtn = page.locator(".v-app-bar .v-avatar").first();
    await avatarBtn.click();
    await expect(page.locator("text=Profile")).toBeVisible();
    await expect(page.locator("text=Logout")).toBeVisible();
  });
});
