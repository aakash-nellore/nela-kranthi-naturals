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

    // Verify all 8 core published products are discovered
    const expectedPublishedSlugs = [
      "/products/banana-powder",
      "/products/curry-leaves-powder",
      "/products/lemon-powder",
      "/products/mango-powder",
      "/products/moringa-powder",
      "/products/okra-powder",
      "/products/papaya-powder",
      "/products/pineapple-powder",
    ];
    for (const expectedPath of expectedPublishedSlugs) {
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

    // Verify Dehydrated Foods upcoming empty state is preserved
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

    // Verify Flower & Petal Products upcoming empty state
    const flowerButton = filterNav.getByRole("button", {
      name: "Flower & Petal Products",
    });
    await flowerButton.click();
    await expect(
      page.getByRole("heading", { name: "Upcoming Flower & Petal Products" })
    ).toBeVisible();
    await expect(
      page.getByText(/solar-dehydrated flower & petal products/i)
    ).toBeVisible();

    // Verify Roots, Spices & Specialty Botanicals upcoming empty state
    const rootsButton = filterNav.getByRole("button", {
      name: "Roots, Spices & Specialty Botanicals",
    });
    await rootsButton.click();
    await expect(
      page.getByRole("heading", {
        name: "Upcoming Roots, Spices & Specialty Botanicals",
      })
    ).toBeVisible();

    // Return to All Products
    const allButton = filterNav.getByRole("button", { name: "All" });
    await allButton.click();
    const productCards = page.locator("article");
    expect(await productCards.count()).toBeGreaterThan(0);
  });

  test("all 23 prepared draft products are strictly excluded from the public storefront and return 404", async ({
    page,
  }) => {
    const draftSlugs = [
      "guava-leaf-powder",
      "papaya-leaf-powder",
      "jamun-leaf-powder",
      "neem-leaf-powder",
      "gongura-leaf-powder",
      "mint-leaf-powder",
      "desi-gulabi-rose-petals-dried",
      "marigold-petals-dried",
      "dragon-fruit-powder",
      "orange-powder",
      "amla-powder",
      "apple-powder",
      "tomato-powder",
      "onion-powder",
      "carrot-powder",
      "beetroot-powder",
      "bitter-gourd-powder",
      "drumstick-pod-powder",
      "brinjal-eggplant-powder",
      "green-chilli-powder",
      "ginger-powder",
      "garlic-powder",
      "safed-musli-root-powder",
    ];

    // 1. Verify none of the draft slugs appear in the public /products catalogue links
    await page.goto("/products", { waitUntil: "domcontentloaded" });
    for (const slug of draftSlugs) {
      const link = page.locator(`a[href="/products/${slug}"]`);
      await expect(link).toHaveCount(0);
    }

    // 2. Verify that direct navigation to sample draft routes returns 404
    const sampleDrafts = [
      "neem-leaf-powder",
      "safed-musli-root-powder",
      "marigold-petals-dried",
      "drumstick-pod-powder",
    ];
    for (const slug of sampleDrafts) {
      const response = await page.goto(`/products/${slug}`, {
        waitUntil: "domcontentloaded",
      });
      expect(
        response?.status(),
        `Expected HTTP 404 for draft product "${slug}", got ${response?.status()}`
      ).toBe(404);
    }
  });

  test("sitemap.xml includes all eight published products and excludes all 23 draft products", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const xml = await response.text();

    const publishedSlugs = [
      "banana-powder",
      "curry-leaves-powder",
      "lemon-powder",
      "mango-powder",
      "moringa-powder",
      "okra-powder",
      "papaya-powder",
      "pineapple-powder",
    ];

    for (const slug of publishedSlugs) {
      expect(
        xml,
        `Expected sitemap to contain published product "${slug}"`
      ).toContain(`/products/${slug}`);
    }

    const draftSlugs = [
      "guava-leaf-powder",
      "papaya-leaf-powder",
      "jamun-leaf-powder",
      "neem-leaf-powder",
      "gongura-leaf-powder",
      "mint-leaf-powder",
      "desi-gulabi-rose-petals-dried",
      "marigold-petals-dried",
      "dragon-fruit-powder",
      "orange-powder",
      "amla-powder",
      "apple-powder",
      "tomato-powder",
      "onion-powder",
      "carrot-powder",
      "beetroot-powder",
      "bitter-gourd-powder",
      "drumstick-pod-powder",
      "brinjal-eggplant-powder",
      "green-chilli-powder",
      "ginger-powder",
      "garlic-powder",
      "safed-musli-root-powder",
    ];

    for (const slug of draftSlugs) {
      expect(
        xml,
        `Expected sitemap to EXCLUDE draft product "${slug}"`
      ).not.toContain(`/products/${slug}`);
    }
  });
});
