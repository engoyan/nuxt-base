import { test, expect, type Page } from "@playwright/test";

async function waitForHydration(page: Page) {
  await page.waitForFunction(() => {
    const nuxtEl = document.querySelector("#__nuxt");
    return nuxtEl && (nuxtEl as any).__vue_app__;
  }, { timeout: 15_000 });
}

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await waitForHydration(page);
    await expect(page.getByLabel("Email")).toBeVisible();
  });

  test("renders email and password fields", async ({ page }) => {
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("renders login button", async ({ page }) => {
    const loginBtn = page.getByRole("button", { name: "Login" });
    await expect(loginBtn).toBeVisible();
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Email is required")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("shows password length validation", async ({ page }) => {
    await page.getByLabel("Email").fill("user@test.com");
    await page.getByLabel("Password").fill("short");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(
      page.getByText("Password must be at least 8 characters"),
    ).toBeVisible({ timeout: 10_000 });
  });

  test("shows error on invalid credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByLabel("Password").fill("wrongpassword123");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator(".v-snackbar")).toBeVisible({ timeout: 10_000 });
  });
});
