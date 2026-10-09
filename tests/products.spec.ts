import { test, expect } from "@playwright/test";

test.describe("Products Catalogue & Detail Pages", () => {
  test("product catalogue renders products and category filter works", async ({
    page,
  }) => {
    const response = await page.goto("/products");
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);

    // Verify main catalogue heading
    await expect(page.locator("h1")).toBeVisible();

    // Verify product cards are displayed
    const productCards = page.locator("article");
    const count = await productCards.count();
    expect(count, "Expected catalogue to render at least one product").toBeGreaterThan(0);

    // Verify category filter tabs
    const filterNav = page.getByRole("navigation", {
      name: "Filter products by category",
    });
    await expect(filterNav).toBeVisible();

    // Click "Fruit Powders" filter and verify results update
    const fruitButton = filterNav.getByRole("button", { name: "Fruit Powders" });
    await expect(fruitButton).toBeVisible();

    // Click Fruit Powders and verify aria-pressed="true" (handles hydration timing gracefully)
    await expect
      .poll(async () => {
        if ((await fruitButton.getAttribute("aria-pressed")) !== "true") {
          await fruitButton.click();
        }
        return await fruitButton.getAttribute("aria-pressed");
      })
      .toBe("true");

    // Verify the result summary containing "Showing" and "Fruit Powders" is visible
    const resultSummary = page
      .locator("p")
      .filter({ hasText: "Showing" })
      .filter({ hasText: "Fruit Powders" });
    await expect(resultSummary).toBeVisible();

    // Verify at least one product article remains visible
    const visibleCards = page.locator("article");
    await expect(visibleCards.first()).toBeVisible();
    expect(await visibleCards.count()).toBeGreaterThan(0);
  });

  test("all discovered product detail routes load with valid content and images", async ({
    page,
  }) => {
    // Increase test timeout to accommodate all dynamic product routes
    test.setTimeout(90 * 1000);

    // 1. Visit product listing page to dynamically discover product routes
    await page.goto("/products", { waitUntil: "domcontentloaded" });

    // Collect all links pointing to /products/[slug]
    const links = await page
      .locator('a[href^="/products/"]')
      .evaluateAll((elements: HTMLAnchorElement[]) => {
        const hrefs = elements.map((el) => el.getAttribute("href") || "");
        // Filter unique, non-empty paths that are sub-paths of /products/
        return Array.from(
          new Set(
            hrefs.filter(
              (href) =>
                href.startsWith("/products/") &&
                href.length > "/products/".length &&
                !href.includes("?")
            )
          )
        );
      });

    expect(
      links.length,
      "Expected to find product detail links on /products"
    ).toBeGreaterThan(0);

    // 2. Test each discovered product detail route
    for (const productPath of links) {
      const detailResponse = await page.goto(productPath, {
        waitUntil: "domcontentloaded",
      });

      expect(
        detailResponse,
        `Expected valid response for product at ${productPath}`
      ).not.toBeNull();
      expect(
        detailResponse!.status(),
        `Expected HTTP 200 for ${productPath}, got ${detailResponse!.status()}`
      ).toBe(200);

      // Verify product title heading (h1)
      const heading = page.locator("h1");
      await expect(heading).toBeVisible();
      const headingText = await heading.innerText();
      expect(headingText.trim().length).toBeGreaterThan(0);

      // Verify "Available Unit" is displayed with proper packaging size
      await expect(page.getByText(/Available Unit/i).first()).toBeVisible();

      // Verify product visual exists (either rendered <img> or fallback SVG container)
      const hasImage = await page.locator("main img").count();
      const hasFallback = await page.locator("main svg").count();
      expect(
        hasImage > 0 || hasFallback > 0,
        `Expected image or botanical graphic on ${productPath}`
      ).toBeTruthy();

      // If an <img> tag is present, verify it finishes loading without a broken image state
      if (hasImage > 0) {
        const imgLocator = page.locator("main img").first();
        await expect
          .poll(
            async () => {
              return await imgLocator.evaluate((img: HTMLImageElement) => {
                return img.complete && img.naturalWidth > 0;
              });
            },
            {
              message: `Product image on ${productPath} failed to load (naturalWidth = 0)`,
              timeout: 10000,
            }
          )
          .toBe(true);
      }

      // Verify direct inquiry actions are present (WhatsApp and Enquiry links)
      const whatsappButton = page.locator('a[href*="wa.me"]');
      await expect(whatsappButton.first()).toBeVisible();

      const enquiryButton = page.locator('a[href*="/contact?inquiry="]');
      await expect(enquiryButton.first()).toBeVisible();
    }
  });
});
