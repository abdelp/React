import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test("mocked text is visible", async ({ page }) => {
    await page.route(
      "https://api.github.com/repos/TanStack/query",
      async (route) => {
        const originalResponse = await route.fetch();

        await route.fulfill({
          status: originalResponse.status(),
          headers: originalResponse.headers(),
          contentType: "application/json", // Ensure content type matches
          body: JSON.stringify({ description: "Hello Mr. Potatoe" }),
        });
      }
    );

    await page.goto("http://localhost:5173");

    const responsePromise = page.waitForResponse(
      (response) =>
        response
          .url()
          .includes("https://api.github.com/repos/TanStack/query") &&
        response.status() === 200
    );
    // Expect a title "to contain" a substring.
    const text = await page.getByText("Hello Mr. Potatoe");

    await responsePromise;
    await expect(text).toBeVisible();
  });

  test.skip("get started link", async ({ page }) => {
    // Click the get started link.
    await page.getByRole("link", { name: "Get started" }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(
      page.getByRole("heading", { name: "Installation" })
    ).toBeVisible();
  });
});
