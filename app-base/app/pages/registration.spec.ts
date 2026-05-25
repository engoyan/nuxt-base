import { test, expect, type Page } from "@playwright/test";

async function waitForHydration(page: Page) {
  await page.waitForFunction(() => {
    const nuxtEl = document.querySelector("#__nuxt");
    return nuxtEl && (nuxtEl as any).__vue_app__;
  }, { timeout: 15_000 });
}

test.describe("Registration", () => {
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = "TestPassword123!";

  test.afterAll(async () => {
    const pbBase = `${process.env.NUXT_PUBLIC_POCKETBASE_HOST || "http://127.0.0.1"}:${process.env.NUXT_PUBLIC_POCKETBASE_PORT || "8030"}`;

    const authRes = await fetch(`${pbBase}/api/collections/_superusers/auth-with-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identity: process.env.NUXT_POCKETBASE_ADMIN_EMAIL,
        password: process.env.NUXT_POCKETBASE_ADMIN_PASSWORD,
      }),
    });
    const { token } = await authRes.json();

    const listRes = await fetch(
      `${pbBase}/api/collections/users/records?filter=${encodeURIComponent(`email="${testEmail}"`)}`,
      { headers: { Authorization: token } },
    );
    const { items } = await listRes.json();

    for (const user of items ?? []) {
      await fetch(`${pbBase}/api/collections/users/records/${user.id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
    }
  });

  test("registers a new user and redirects to home", async ({ page }) => {
    await page.goto("/login");
    await waitForHydration(page);
    await expect(page.getByLabel("Email")).toBeVisible();

    await page.getByRole("button", { name: "Sign Up" }).click();

    await expect(page.getByRole("button", { name: "Sign Up" }).first()).toBeVisible();

    await page.getByLabel("Email").fill(testEmail);
    await page.getByLabel("Password").fill(testPassword);

    await page.getByRole("button", { name: "Sign Up" }).first().click();

    await page.waitForURL("**/", { timeout: 15_000 });
    await expect(page).toHaveURL("/");
  });
});
