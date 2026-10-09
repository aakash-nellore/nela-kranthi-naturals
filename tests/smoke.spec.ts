import { test, expect } from "@playwright/test";

test.describe("Homepage Smoke & Browser Health", () => {
  test("homepage loads successfully with HTTP 200 and no critical JS errors", async ({
    page,
    baseURL,
  }) => {
    const pageErrors: Error[] = [];
    const failedCriticalRequests: string[] = [];

    // Capture uncaught JavaScript runtime exceptions
    page.on("pageerror", (error) => {
      pageErrors.push(error);
    });

    // Capture critical network request failures (documents, scripts, stylesheets, same-origin assets)
    page.on("requestfailed", (request) => {
      const url = request.url();
      const failure = request.failure()?.errorText || "unknown error";
      const resourceType = request.resourceType();

      if (
        ["document", "script", "stylesheet"].includes(resourceType) ||
        (resourceType === "image" && baseURL && url.startsWith(baseURL))
      ) {
        failedCriticalRequests.push(
          `${resourceType.toUpperCase()} ${url} (${failure})`
        );
      }
    });

    // Navigate to homepage
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response, "Expected a valid HTTP response").not.toBeNull();
    expect(
      response!.status(),
      `Expected HTTP 200 on homepage, got ${response!.status()}`
    ).toBe(200);

    // Verify main content container and primary heading render
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();

    // Verify brand logo and visible brand name render in navigation header
    const headerLogo = page
      .locator("header")
      .getByRole("link", { name: /Nela Kranthi Naturals Home/i });
    await expect(headerLogo).toBeVisible();

    // Verify brand typography renders
    await expect(
      page.locator("header").getByText("Nela Kranthi", { exact: false }).first()
    ).toBeVisible();

    // Assert zero uncaught JavaScript errors
    expect(
      pageErrors,
      `Uncaught JavaScript errors on homepage:\n${pageErrors
        .map((e) => e.message)
        .join("\n")}`
    ).toHaveLength(0);

    // Assert zero critical network request failures
    expect(
      failedCriticalRequests,
      `Failed critical network requests:\n${failedCriticalRequests.join("\n")}`
    ).toHaveLength(0);
  });

  test("footer renders brand identity and Sydapuram origin info", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer.getByText(/Nela Kranthi/i).first()).toBeVisible();
    await expect(footer.getByText(/Sydapuram/i).first()).toBeVisible();
  });
});
