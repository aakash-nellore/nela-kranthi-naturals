import { test, expect } from "@playwright/test";

// The real existing core routes in the application
const CORE_ROUTES = [
  { path: "/", name: "Home", headingPattern: /Nela Kranthi|Naturally Processed/i },
  { path: "/products", name: "Products", headingPattern: /Our Natural Products|Products/i },
  { path: "/about", name: "About Us", headingPattern: /About Nela Kranthi|Rooted in Nature/i },
  { path: "/solar-dehydration", name: "Solar Dehydration", headingPattern: /Solar Dehydration|Sun-Crafted/i },
  { path: "/bulk-orders", name: "Bulk Orders", headingPattern: /Bulk Orders|Wholesale/i },
  { path: "/contact", name: "Contact", headingPattern: /Contact|Get In Touch|Hear From You/i },
];

test.describe("Site Navigation & Core Routes", () => {
  for (const route of CORE_ROUTES) {
    test(`route "${route.path}" (${route.name}) responds with HTTP 200 and renders content`, async ({
      page,
    }) => {
      const response = await page.goto(route.path, {
        waitUntil: "domcontentloaded",
      });

      expect(
        response,
        `Expected valid response navigating to ${route.path}`
      ).not.toBeNull();
      expect(
        response!.status(),
        `Expected HTTP 200 for ${route.path}, got ${response!.status()}`
      ).toBe(200);

      // Verify page content has rendered
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("h1, h2").first()).toBeVisible();
    });
  }

  test("desktop navbar contains working links to all core destinations", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Desktop nav items
    const navItems = [
      { label: "Products", expectedPath: "/products" },
      { label: "About Us", expectedPath: "/about" },
      { label: "Solar Dehydration", expectedPath: "/solar-dehydration" },
      { label: "Bulk Orders", expectedPath: "/bulk-orders" },
      { label: "Contact", expectedPath: "/contact" },
    ];

    for (const item of navItems) {
      const link = page.locator("nav ul").getByRole("link", { name: item.label, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", item.expectedPath);
    }
  });

  test("footer contains working links to all core destinations", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const footer = page.locator("footer");

    const expectedLinks = [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "About Us", href: "/about" },
      { label: "Solar Dehydration", href: "/solar-dehydration" },
      { label: "Bulk Orders", href: "/bulk-orders" },
      { label: "Contact", href: "/contact" },
    ];

    for (const expected of expectedLinks) {
      const link = footer.getByRole("link", { name: expected.label, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", expected.href);
    }
  });

  test("accessing a nonexistent route gracefully responds with 404 without crashing", async ({
    page,
  }) => {
    const nonexistentPath = "/test-route-does-not-exist-404";
    const response = await page.goto(nonexistentPath);

    expect(response).not.toBeNull();
    // Next.js standard 404 response status code
    expect(response!.status()).toBe(404);

    // Verify page rendered a not-found container or fallback message
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).toMatch(/404|not found|page could not be found/i);
  });
});
