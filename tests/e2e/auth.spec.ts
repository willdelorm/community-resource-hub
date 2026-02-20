import { expect, test } from "@playwright/test";

test.describe("Auth flow", () => {
  test("redirects unauthenticated users from /dashboard to /signin", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL("/signin");
  });

  test("shows the sign-in form on /signin", async ({ page }) => {
    await page.goto("/signin");

    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Log In" })).toBeVisible();
  });

  test("shows an error for invalid credentials", async ({ page }) => {
    await page.goto("/signin");

    await page.getByLabel("Email").fill("notreal@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Log In" }).click();

    await expect(page.getByText(/invalid/i)).toBeVisible();
  });

  test("navigates to forgot password view", async ({ page }) => {
    await page.goto("/signin");

    await page.getByText("Forgot Password?").click();

    await expect(
      page.getByRole("button", { name: "Send Recovery Link" }),
    ).toBeVisible();
  });
});

test.describe("Update password page", () => {
  test("renders the update password form", async ({ page }) => {
    await page.goto("/update-password");

    await expect(page.getByLabel("New password")).toBeVisible();
    await expect(page.getByLabel("Confirm new password")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Update Password" }),
    ).toBeVisible();
  });

  test("shows a mismatch error when passwords do not match", async ({ page }) => {
    await page.goto("/update-password");

    await page.getByLabel("New password").fill("password123");
    await page.getByLabel("Confirm new password").fill("different456");
    await page.getByRole("button", { name: "Update Password" }).click();

    await expect(page.getByText("Passwords do not match.")).toBeVisible();
  });
});
