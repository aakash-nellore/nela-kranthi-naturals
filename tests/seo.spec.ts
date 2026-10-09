import { test, expect } from "@playwright/test";

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

  test("robots.txt is accessible and disallows administrative routes", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt");
    expect(response.status(), "Expected HTTP 200 for /robots.txt").toBe(200);

    const body = await response.text();
    expect(body).toContain("User-Agent");
    expect(body).toContain("Disallow: /admin");
    expect(body).toContain("sitemap.xml");
  });

  test("sitemap.xml is accessible and contains core routes", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status(), "Expected HTTP 200 for /sitemap.xml").toBe(200);

    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("/products");
    expect(body).toContain("/about");
    expect(body).toContain("/contact");
  });
});
