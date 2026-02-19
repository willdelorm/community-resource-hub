import { expect, test } from "@playwright/test";

/**
 * Dashboard CRUD E2E tests.
 *
 * Required environment variables:
 *   TEST_ADMIN_EMAIL    – admin account email
 *   TEST_ADMIN_PASSWORD – admin account password
 *
 * Each test creates its own data with a unique timestamp suffix and deletes it
 * at the end, so the tests are safe to run against a shared dev database.
 */

const email = process.env.TEST_ADMIN_EMAIL ?? "";
const password = process.env.TEST_ADMIN_PASSWORD ?? "";

test.beforeEach(async ({ page }) => {
  if (!email || !password) {
    test.skip();
    return;
  }

  await page.goto("/signin");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page).toHaveURL("/dashboard");
});

// ---------------------------------------------------------------------------
// Dashboard overview
// ---------------------------------------------------------------------------

test.describe("Dashboard overview", () => {
  test("shows resource, announcement, and event section headings", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Resources" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Announcements" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Events" })).toBeVisible();
  });

  test("shows View all links for each section", async ({ page }) => {
    await expect(page.getByRole("link", { name: "View all resources" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "View all announcements" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "View all events" })).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Resource CRUD
// ---------------------------------------------------------------------------

test.describe("Resource management", () => {
  test("create, verify, and delete a resource", async ({ page }) => {
    const name = `E2E Resource ${Date.now()}`;

    await page.goto("/dashboard/resources");

    // Create
    await page.getByRole("button", { name: "New" }).click();
    await page.getByLabel("Name *").fill(name);
    await page.getByRole("combobox").click();
    await page.getByRole("option", { name: "Food" }).click();
    await page.getByRole("button", { name: "Save" }).click();

    // Verify appears in table
    await expect(page.getByRole("cell", { name })).toBeVisible();

    // Delete
    const row = page.getByRole("row", { name: new RegExp(name) });
    await row.getByRole("button", { name: "Delete" }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: "Delete" }).click();

    // Verify removed
    await expect(page.getByRole("cell", { name })).not.toBeVisible();
  });

  test("edit a resource and verify the updated name", async ({ page }) => {
    const original = `E2E Edit Resource ${Date.now()}`;
    const updated = `${original} – Updated`;

    await page.goto("/dashboard/resources");

    // Create
    await page.getByRole("button", { name: "New" }).click();
    await page.getByLabel("Name *").fill(original);
    await page.getByRole("combobox").click();
    await page.getByRole("option", { name: "Housing" }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByRole("cell", { name: original })).toBeVisible();

    // Edit
    const row = page.getByRole("row", { name: new RegExp(original) });
    await row.getByRole("button", { name: "Edit" }).click();
    const nameInput = page.getByLabel("Name *");
    await nameInput.clear();
    await nameInput.fill(updated);
    await page.getByRole("button", { name: "Save" }).click();

    // Verify updated name
    await expect(page.getByRole("cell", { name: updated })).toBeVisible();
    await expect(page.getByRole("cell", { name: original })).not.toBeVisible();

    // Cleanup
    const updatedRow = page.getByRole("row", { name: new RegExp(updated) });
    await updatedRow.getByRole("button", { name: "Delete" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Delete" }).click();
  });
});

// ---------------------------------------------------------------------------
// Announcement CRUD
// ---------------------------------------------------------------------------

test.describe("Announcement management", () => {
  test("create, verify, and delete an announcement", async ({ page }) => {
    const title = `E2E Announcement ${Date.now()}`;

    await page.goto("/dashboard/announcements");

    // Create
    await page.getByRole("button", { name: "New" }).click();
    await page.getByLabel("Title *").fill(title);
    await page.getByLabel("Content *").fill("This is an automated test announcement.");
    await page.getByRole("button", { name: "Save" }).click();

    // Verify appears
    await expect(page.getByRole("cell", { name: title })).toBeVisible();

    // Delete
    const row = page.getByRole("row", { name: new RegExp(title) });
    await row.getByRole("button", { name: "Delete" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Delete" }).click();

    // Verify removed
    await expect(page.getByRole("cell", { name: title })).not.toBeVisible();
  });

  test("edit an announcement and verify the updated title", async ({ page }) => {
    const original = `E2E Edit Announcement ${Date.now()}`;
    const updated = `${original} – Updated`;

    await page.goto("/dashboard/announcements");

    // Create
    await page.getByRole("button", { name: "New" }).click();
    await page.getByLabel("Title *").fill(original);
    await page.getByLabel("Content *").fill("Original content.");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByRole("cell", { name: original })).toBeVisible();

    // Edit
    const row = page.getByRole("row", { name: new RegExp(original) });
    await row.getByRole("button", { name: "Edit" }).click();
    const titleInput = page.getByLabel("Title *");
    await titleInput.clear();
    await titleInput.fill(updated);
    await page.getByRole("button", { name: "Save" }).click();

    // Verify updated
    await expect(page.getByRole("cell", { name: updated })).toBeVisible();

    // Cleanup
    const updatedRow = page.getByRole("row", { name: new RegExp(updated) });
    await updatedRow.getByRole("button", { name: "Delete" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Delete" }).click();
  });
});

// ---------------------------------------------------------------------------
// Event CRUD
// ---------------------------------------------------------------------------

test.describe("Event management", () => {
  test("create, verify, and delete an event", async ({ page }) => {
    const title = `E2E Event ${Date.now()}`;

    await page.goto("/dashboard/events");

    // Create
    await page.getByRole("button", { name: "New" }).click();
    await page.getByLabel("Title *").fill(title);
    await page.getByLabel("Start *").fill("2026-06-15T10:00");
    await page.getByLabel("Location").fill("Community Center");
    await page.getByRole("button", { name: "Save" }).click();

    // Verify appears
    await expect(page.getByRole("cell", { name: title })).toBeVisible();

    // Delete
    const row = page.getByRole("row", { name: new RegExp(title) });
    await row.getByRole("button", { name: "Delete" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Delete" }).click();

    // Verify removed
    await expect(page.getByRole("cell", { name: title })).not.toBeVisible();
  });

  test("edit an event and verify the updated title", async ({ page }) => {
    const original = `E2E Edit Event ${Date.now()}`;
    const updated = `${original} – Updated`;

    await page.goto("/dashboard/events");

    // Create
    await page.getByRole("button", { name: "New" }).click();
    await page.getByLabel("Title *").fill(original);
    await page.getByLabel("Start *").fill("2026-06-15T10:00");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByRole("cell", { name: original })).toBeVisible();

    // Edit
    const row = page.getByRole("row", { name: new RegExp(original) });
    await row.getByRole("button", { name: "Edit" }).click();
    const titleInput = page.getByLabel("Title *");
    await titleInput.clear();
    await titleInput.fill(updated);
    await page.getByRole("button", { name: "Save" }).click();

    // Verify updated
    await expect(page.getByRole("cell", { name: updated })).toBeVisible();

    // Cleanup
    const updatedRow = page.getByRole("row", { name: new RegExp(updated) });
    await updatedRow.getByRole("button", { name: "Delete" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Delete" }).click();
  });
});
