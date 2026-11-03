import { test, expect } from "@playwright/test";
import { PRODUCT_SEO_REGISTRY, getProductSeoData, getProductImageAlt } from "@/lib/seo";
import { COMPLIANCE_REVIEW_SLUGS } from "@/lib/compliance";

const ACTIVE_PRODUCT_SAMPLES = [
  {
    slug: "curry-leaves-powder",
    expectedName: "Curry Leaves Powder",
    expectedPrimaryKeyword: "Curry Leaves Powder",
  },
  {
    slug: "banana-powder",
    expectedName: "Banana Powder",
    expectedPrimaryKeyword: "Raw Green Banana Powder",
  },
  {
    slug: "beetroot-powder",
    expectedName: "Beetroot Powder",
    expectedPrimaryKeyword: "Beetroot Powder",
  },
  {
    slug: "moringa-powder",
    expectedName: "Moringa Powder",
    expectedPrimaryKeyword: "Moringa Powder",
  },
  {
    slug: "amla-powder",
    expectedName: "Amla Powder",
    expectedPrimaryKeyword: "Amla Powder",
  },
  {
    slug: "desi-gulabi-rose-petals-dried",
    expectedName: "Desi Gulabi Rose Petals (Dried)",
    expectedPrimaryKeyword: "Desi Gulabi Rose Petals",
  },
  {
    slug: "okra-powder",
    expectedName: "Ladyfinger / Okra Powder",
    expectedPrimaryKeyword: "Okra Powder",
  },
  {
    slug: "garlic-powder",
    expectedName: "Garlic Powder",
    expectedPrimaryKeyword: "Garlic Powder",
  },
];

test.describe("SEO Basics & Technical Metadata", () => {
  const pagesToCheck = [
    { path: "/", expectedTitlePart: "Nela Kranthi Naturals" },
    { path: "/products", expectedTitlePart: "Nela Kranthi Naturals" },
    { path: "/about", expectedTitlePart: "Nela Kranthi Naturals" },
    { path: "/solar-dehydration", expectedTitlePart: "Nela Kranthi Naturals" },
    { path: "/bulk-orders", expectedTitlePart: "Nela Kranthi Naturals" },
    { path: "/contact", expectedTitlePart: "Nela Kranthi Naturals" },
  ];

  for (const item of pagesToCheck) {
    test(`"${item.path}" contains a meaningful document title and meta description`, async ({
      page,
    }) => {
      await page.goto(item.path, { waitUntil: "domcontentloaded" });

      // Title check
      const title = await page.title();
      expect(title.trim().length, `Title on ${item.path} should not be empty`).toBeGreaterThan(0);
      expect(title, `Title on ${item.path} should include brand reference`).toContain(
        item.expectedTitlePart
      );

      // Meta description check
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(
        description,
        `Expected meta description on ${item.path}`
      ).toBeTruthy();
      expect(description!.trim().length).toBeGreaterThan(15);

      // Viewport meta check
      const viewport = await page
        .locator('meta[name="viewport"]')
        .getAttribute("content");
      expect(viewport).toBeTruthy();
    });
  }

  test("robots.txt is accessible, allows root, disallows administrative routes, and links sitemap", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt");
    expect(response.status(), "Expected HTTP 200 for /robots.txt").toBe(200);

    const body = await response.text();
    expect(body).toContain("User-Agent");
    expect(body).toContain("Disallow: /admin");
    expect(body).toContain("sitemap.xml");
  });

  test("sitemap.xml is accessible, contains core routes and active products, and strictly excludes inactive items", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status(), "Expected HTTP 200 for /sitemap.xml").toBe(200);

    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("/products");
    expect(body).toContain("/about");
    expect(body).toContain("/contact");

    // Must include active products
    expect(body).toContain("/products/curry-leaves-powder");
    expect(body).toContain("/products/banana-powder");
    expect(body).toContain("/products/moringa-powder");

    // Must strictly EXCLUDE all 5 regulatory review inactive products
    for (const inactiveSlug of COMPLIANCE_REVIEW_SLUGS) {
      expect(
        body,
        `Sitemap should not contain inactive regulatory review slug: ${inactiveSlug}`
      ).not.toContain(`/products/${inactiveSlug}`);
    }
  });
});

test.describe("Product-First SEO & Structured Data Validation", () => {
  test("PRODUCT_SEO_REGISTRY covers all 26 active products with verified constraints", () => {
    const registryKeys = Object.keys(PRODUCT_SEO_REGISTRY);

    // Filter to active keys (not restricted)
    const activeKeys = registryKeys.filter(
      (slug) => !PRODUCT_SEO_REGISTRY[slug].isRestricted
    );

    expect(activeKeys.length).toBe(26);

    for (const slug of activeKeys) {
      const entry = PRODUCT_SEO_REGISTRY[slug];

      // 1. Title starts with product primary keyword / name
      expect(
        entry.seoTitle.startsWith(entry.primaryKeyword) ||
          entry.seoTitle.startsWith(entry.name),
        `Title for ${slug} should start with product keyword`
      ).toBe(true);

      // 2. Title ends with brand identifier
      expect(entry.seoTitle).toContain("| Nela Kranthi Naturals");

      // 3. Title length is optimal for Google SERPs (under 80 chars total)
      expect(entry.seoTitle.length).toBeLessThanOrEqual(80);

      // 4. Meta description is 140–165 characters
      expect(
        entry.metaDescription.length,
        `Meta description for ${slug} should be 140-165 chars (was ${entry.metaDescription.length})`
      ).toBeGreaterThanOrEqual(140);
      expect(
        entry.metaDescription.length,
        `Meta description for ${slug} should be <= 165 chars (was ${entry.metaDescription.length})`
      ).toBeLessThanOrEqual(165);

      // 5. Search intent is specified
      expect(entry.searchIntent.length).toBeGreaterThan(0);
    }
  });

  for (const sample of ACTIVE_PRODUCT_SAMPLES) {
    test(`Product page for "${sample.slug}" has product-first title, meta, canonical, and Schema.org JSON-LD`, async ({
      page,
    }) => {
      const response = await page.goto(`/products/${sample.slug}`, {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status()).toBe(200);

      const expectedSeo = getProductSeoData(sample.slug);

      // 1. Document Title: Product keyword comes first, brand at the end
      const docTitle = await page.title();
      expect(
        docTitle.startsWith(sample.expectedPrimaryKeyword) ||
          docTitle.startsWith(sample.expectedName),
        `Document title on /products/${sample.slug} should start with product name/keyword`
      ).toBe(true);
      expect(docTitle).toContain("Nela Kranthi Naturals");

      // 2. Meta Description
      const metaDesc = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(metaDesc).toBeTruthy();
      expect(metaDesc!.length).toBeGreaterThanOrEqual(120);

      // 3. Canonical Link tag
      const canonicalHref = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonicalHref).toBe(
        `https://nelakranthinaturals.com/products/${sample.slug}`
      );

      // 4. OpenGraph Tags
      const ogTitle = await page
        .locator('meta[property="og:title"]')
        .getAttribute("content");
      expect(ogTitle).toBe(expectedSeo.seoTitle);

      const ogDesc = await page
        .locator('meta[property="og:description"]')
        .getAttribute("content");
      expect(ogDesc).toBe(expectedSeo.metaDescription);

      const ogUrl = await page
        .locator('meta[property="og:url"]')
        .getAttribute("content");
      expect(ogUrl).toBe(
        `https://nelakranthinaturals.com/products/${sample.slug}`
      );

      // 5. Twitter Card Tags
      const twitterCard = await page
        .locator('meta[name="twitter:card"]')
        .getAttribute("content");
      expect(twitterCard).toBe("summary_large_image");

      const twitterTitle = await page
        .locator('meta[name="twitter:title"]')
        .getAttribute("content");
      expect(twitterTitle).toBe(expectedSeo.seoTitle);

      // 6. Heading structure: Single H1 with product name
      const h1Elements = page.locator("h1");
      await expect(h1Elements).toHaveCount(1);
      const h1Text = await h1Elements.first().innerText();
      expect(h1Text).toContain(sample.expectedName);

      // 7. Visible Breadcrumb navigation
      const breadcrumbNav = page.locator('nav[aria-label="Breadcrumb"]');
      await expect(breadcrumbNav).toBeVisible();
      await expect(breadcrumbNav).toContainText("Home");
      await expect(breadcrumbNav).toContainText("Products");
      await expect(breadcrumbNav).toContainText(sample.expectedName);

      // 8. Schema.org Product Structured Data (Verified attributes only, zero fake prices/ratings)
      const scripts = await page
        .locator('script[type="application/ld+json"]')
        .allInnerTexts();

      let productSchema: Record<string, unknown> | null = null;
      let breadcrumbSchema: Record<string, unknown> | null = null;

      for (const text of scripts) {
        try {
          const parsed = JSON.parse(text);
          if (parsed["@type"] === "Product") {
            productSchema = parsed;
          } else if (parsed["@type"] === "BreadcrumbList") {
            breadcrumbSchema = parsed;
          }
        } catch {
          // Ignore non-JSON or other scripts
        }
      }

      // Verify Product Schema
      expect(
        productSchema,
        `Expected schema.org/Product script on /products/${sample.slug}`
      ).toBeTruthy();
      expect(productSchema?.name).toBe(sample.expectedName);
      expect((productSchema?.brand as { name: string })?.name).toBe(
        "Nela Kranthi Naturals"
      );
      expect(productSchema?.sku).toBe(sample.slug);

      // CRITICAL: Ensure NO fabricated offers (fake price: 0) or fake reviews/ratings
      expect(
        productSchema?.offers,
        "Should not include fake offers markup"
      ).toBeUndefined();
      expect(
        productSchema?.aggregateRating,
        "Should not include fake aggregate rating"
      ).toBeUndefined();
      expect(
        productSchema?.review,
        "Should not include fake review markup"
      ).toBeUndefined();

      // Verify BreadcrumbList Schema
      expect(
        breadcrumbSchema,
        `Expected schema.org/BreadcrumbList script on /products/${sample.slug}`
      ).toBeTruthy();
      const items = (breadcrumbSchema?.itemListElement as Array<{
        position: number;
        name: string;
      }>) || [];
      expect(items.length).toBe(3);
      expect(items[0].name).toBe("Home");
      expect(items[1].name).toBe("Products");
      expect(items[2].name).toBe(sample.expectedName);

      // 9. Product Image Alt Text Verification
      // If an actual photo exists, verify alt text is descriptive, non-empty, and avoids repetitive patterns
      const renderedImg = page.locator("main img");
      if ((await renderedImg.count()) > 0) {
        const altText = await renderedImg.first().getAttribute("alt");
        expect(altText).toBeTruthy();
        expect(altText).not.toContain("Powder - Solar Dehydrated Powder");
        expect(altText?.length).toBeGreaterThanOrEqual(10);
      }
    });
  }

  test("getProductImageAlt generates verified, category-aware, and non-repetitive alt text", () => {
    // 1. Verified photographed products have exact visual descriptions
    expect(getProductImageAlt({ slug: "banana-powder", name: "Banana Powder" })).toBe(
      "Fine raw green banana powder in a wooden bowl with sliced bananas"
    );
    expect(getProductImageAlt({ slug: "moringa-powder", name: "Moringa Powder" })).toBe(
      "Pure solar-dehydrated moringa leaf powder on a rustic wooden surface"
    );
    expect(getProductImageAlt({ slug: "curry-leaves-powder", name: "Curry Leaves Powder" })).toBe(
      "Dehydrated green curry leaf powder in a bowl with fresh curry leaves"
    );

    // 2. Flower and petal products use botanical petals wording, not powder
    expect(
      getProductImageAlt({
        slug: "desi-gulabi-rose-petals-dried",
        name: "Desi Gulabi Rose Petals (Dried)",
        category: "Flower & Petal Products",
      })
    ).toBe("Desi Gulabi Rose Petals (Dried) - Solar-Dried Botanical Petals");

    // 3. Fallback for unphotographed items containing "powder" avoids repetitive suffix
    expect(getProductImageAlt({ slug: "amla-powder", name: "Amla Powder" })).toBe(
      "Amla Powder - Natural Solar Dehydrated"
    );
    expect(getProductImageAlt({ slug: "beetroot-powder", name: "Beetroot Powder" })).toBe(
      "Beetroot Powder - Natural Solar Dehydrated"
    );
    expect(getProductImageAlt({ name: "Tomato Powder" })).not.toContain(
      "Powder - Solar Dehydrated Powder"
    );
  });

  test("Inactive / regulatory review products strictly return HTTP 404 when visited directly", async ({
    page,
  }) => {
    for (const inactiveSlug of COMPLIANCE_REVIEW_SLUGS) {
      const response = await page.goto(`/products/${inactiveSlug}`);
      expect(
        response?.status(),
        `Expected inactive regulatory review product /products/${inactiveSlug} to return HTTP 404`
      ).toBe(404);
    }
  });
});
