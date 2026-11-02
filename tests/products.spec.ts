import { test, expect } from "@playwright/test";

test.describe("Products Catalogue & Detail Pages", () => {
  test("product catalogue renders active products and category filter works", async ({
    page,
  }) => {
    const response = await page.goto("/products");
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);

    // Verify main catalogue heading
    await expect(page.locator("h1")).toBeVisible();

    // Verify product cards are displayed (at least the 8 core products, up to 31 when migrated)
    const productCards = page.locator("article");
    const count = await productCards.count();
    expect(count, "Expected catalogue to render at least 8 active products").toBeGreaterThanOrEqual(8);

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

    // Verify fruit powders are rendered
    const visibleCards = page.locator("article");
    await expect(visibleCards.first()).toBeVisible();
    expect(await visibleCards.count()).toBeGreaterThan(0);
  });

  test("all active product detail routes load with valid content and images or branded placeholders", async ({
    page,
  }) => {
    // Accommodate all active routes
    test.setTimeout(120 * 1000);

    // 1. Visit product listing page to dynamically discover product routes
    await page.goto("/products", { waitUntil: "domcontentloaded" });

    // Collect all links pointing to /products/[slug]
    const links = await page
      .locator('a[href^="/products/"]')
      .evaluateAll((elements: HTMLAnchorElement[]) => {
        const hrefs = elements.map((el) => el.getAttribute("href") || "");
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
      "Expected to find at least 8 product detail links on /products"
    ).toBeGreaterThanOrEqual(8);

    // Verify core published slugs are discovered
    const coreSlugs = [
      "/products/banana-powder",
      "/products/moringa-powder",
      "/products/curry-leaves-powder",
      "/products/lemon-powder",
      "/products/mango-powder",
      "/products/okra-powder",
      "/products/papaya-powder",
      "/products/pineapple-powder",
    ];
    for (const expectedPath of coreSlugs) {
      expect(links, `Expected catalogue to include ${expectedPath}`).toContain(expectedPath);
    }

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

      // Verify "Available Unit" or "Inquiry Specification" is displayed
      await expect(
        page.getByText(/(Available Unit|Inquiry Specification)/i).first()
      ).toBeVisible();

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

  test("all six categories are rendered in filter bar and empty/upcoming states work as expected", async ({
    page,
  }) => {
    await page.goto("/products");

    const filterNav = page.getByRole("navigation", {
      name: "Filter products by category",
    });
    await expect(filterNav).toBeVisible();

    const expectedCategories = [
      "All",
      "Leaf Powders",
      "Flower & Petal Products",
      "Fruit Powders",
      "Vegetable Powders",
      "Roots, Spices & Specialty Botanicals",
      "Dehydrated Foods",
    ];

    for (const cat of expectedCategories) {
      await expect(
        filterNav.getByRole("button", { name: cat })
      ).toBeVisible();
    }

    // Verify Dehydrated Foods upcoming empty state is always preserved
    const dehydratedButton = filterNav.getByRole("button", {
      name: "Dehydrated Foods",
    });
    await dehydratedButton.click();
    await expect(
      page.getByRole("heading", { name: "Upcoming Specialty Harvest" })
    ).toBeVisible();
    await expect(
      page.getByText(/sun-cured prawns, dry mutton, and dehydrated fish/i)
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Inquire for Pre-orders/i })
    ).toHaveAttribute(
      "href",
      "/contact?inquiry=Upcoming%20Dehydrated%20Foods"
    );

    // Return to All Products
    const allButton = filterNav.getByRole("button", { name: "All" });
    await allButton.click();
    const productCards = page.locator("article");
    expect(await productCards.count()).toBeGreaterThanOrEqual(8);
  });

  test("database isolation: inactive draft products return 404 until published in Supabase", async ({
    page,
  }) => {
    // Check if the database has published the expansion items or if they remain unpublished
    const testSlug = "neem-leaf-powder";
    const response = await page.goto(`/products/${testSlug}`, {
      waitUntil: "domcontentloaded",
    });

    if (response?.status() === 200) {
      // Post-migration: verify compliance presentation
      await expect(
        page.getByText(/Regulatory & Commercial Enquiry Notice/i)
      ).toBeVisible();
      await expect(
        page.getByText(/Commercial Enquiry Only/i).first()
      ).toBeVisible();
    } else {
      // Pre-migration: confirm Supabase is_active = false is strictly respected and returns 404
      expect(response?.status()).toBe(404);
    }
  });

  test("non-existent product slugs strictly return 404", async ({ page }) => {
    const invalidSlugs = [
      "non-existent-product-123",
      "hacker-product-fake-route",
      "unknown-botanical-powder",
    ];

    for (const slug of invalidSlugs) {
      const response = await page.goto(`/products/${slug}`, {
        waitUntil: "domcontentloaded",
      });
      expect(
        response?.status(),
        `Expected HTTP 404 for invalid slug "${slug}", got ${response?.status()}`
      ).toBe(404);
    }
  });

  test("sitemap.xml is accessible and contains all active catalogue products", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const xml = await response.text();

    // Core active products must always be in sitemap
    const coreSlugs = [
      "banana-powder",
      "curry-leaves-powder",
      "lemon-powder",
      "mango-powder",
      "moringa-powder",
      "okra-powder",
      "papaya-powder",
      "pineapple-powder",
    ];

    for (const slug of coreSlugs) {
      expect(
        xml,
        `Expected sitemap to contain core product "${slug}"`
      ).toContain(`/products/${slug}`);
    }

    // Verify non-existent slug is NOT in sitemap
    expect(xml).not.toContain("/products/non-existent-slug");
  });
});
