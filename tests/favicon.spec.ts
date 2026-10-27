import { test, expect } from "@playwright/test";

test.describe("Brand Favicon & Icon Metadata", () => {
  const routes = ["/", "/products", "/about", "/contact"];

  for (const route of routes) {
    test(`route "${route}" includes official brand favicon and apple-touch-icon links`, async ({
      page,
    }) => {
      await page.goto(route, { waitUntil: "domcontentloaded" });

      // Check title contains brand name
      const title = await page.title();
      expect(title).toContain("Nela Kranthi Naturals");

      // Check for icon links
      const iconLinks = await page.locator('link[rel="icon"]').all();
      expect(iconLinks.length, `Expected at least one icon link on ${route}`).toBeGreaterThanOrEqual(1);

      // Check that none of the icon links point to default Vercel assets
      for (const link of iconLinks) {
        const href = await link.getAttribute("href");
        expect(href).not.toBeNull();
        expect(href).not.toContain("vercel");
      }

      // Check for apple-touch-icon link
      const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]');
      await expect(appleTouchIcon).toHaveCount(1);
      const appleHref = await appleTouchIcon.getAttribute("href");
      expect(appleHref).toContain("apple-icon");
    });
  }

  test("direct requests to /favicon.ico return HTTP 200 with valid icon content-type", async ({
    request,
  }) => {
    const res = await request.get("/favicon.ico");
    expect(res.status()).toBe(200);
    const contentType = res.headers()["content-type"];
    expect(contentType).toContain("image");
  });

  test("direct requests to /icon.png return HTTP 200 with image/png content-type", async ({
    request,
  }) => {
    const res = await request.get("/icon.png");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  });

  test("direct requests to /apple-icon.png return HTTP 200 with image/png content-type", async ({
    request,
  }) => {
    const res = await request.get("/apple-icon.png");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  });
});
