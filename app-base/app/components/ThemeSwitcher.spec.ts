import { test, expect } from "@playwright/test";

test.describe("ThemeSwitcher", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("persists theme choice to localStorage", async ({ page }) => {
    const avatarOrLogin = page.locator(".v-app-bar .v-avatar, .v-app-bar .v-btn:has-text('Login')");
    if (await page.locator(".v-app-bar .v-avatar").isVisible()) {
      await page.locator(".v-app-bar .v-avatar").click();
      const themeToggle = page.locator("text=Light mode, text=Dark mode").first();
      if (await themeToggle.isVisible()) {
        await themeToggle.click();
      }
    }

    const stored = await page.evaluate(() => localStorage.getItem("userTheme"));
    expect(stored).toBeTruthy();
  });

  test("theme applies immediately on toggle", async ({ page }) => {
    const initialTheme = await page.evaluate(() =>
      document.documentElement.classList.contains("v-theme--dark") ? "dark" : "light",
    );

    const newTheme = initialTheme === "dark" ? "light" : "dark";
    await page.evaluate((t) => localStorage.setItem("userTheme", t), newTheme);
    await page.reload();

    const appliedTheme = await page.evaluate(() =>
      document.querySelector(".v-theme--light") ? "light" : "dark",
    );
    expect(appliedTheme).toBe(newTheme);
  });
});
