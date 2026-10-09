import { test, expect } from "@playwright/test";

// Required breakpoints from specification
const VIEWPORTS = [
  { name: "Mobile Small (360px)", width: 360, height: 740, isMobile: true },
  { name: "Mobile Medium (390px)", width: 390, height: 844, isMobile: true },
  { name: "Mobile Large (412px)", width: 412, height: 915, isMobile: true },
  { name: "Tablet (768px)", width: 768, height: 1024, isMobile: false },
  { name: "Desktop (1280px)", width: 1280, height: 800, isMobile: false },
];

const PAGES_TO_CHECK = ["/", "/products", "/about", "/contact"];

test.describe("Responsive Layout & Viewport Adaptability", () => {
  for (const viewport of VIEWPORTS) {
    test.describe(`${viewport.name}`, () => {
      for (const pagePath of PAGES_TO_CHECK) {
        test(`"${pagePath}" has no horizontal overflow at ${viewport.width}px width`, async ({
          page,
        }) => {
          await page.setViewportSize({
            width: viewport.width,
            height: viewport.height,
          });

          await page.goto(pagePath, { waitUntil: "domcontentloaded" });

          // Measure horizontal overflow: scrollWidth should not exceed clientWidth + 1px subpixel margin
          const hasHorizontalOverflow = await page.evaluate(() => {
            const documentWidth = document.documentElement.scrollWidth;
            const windowWidth = window.innerWidth;
            return documentWidth > windowWidth + 1;
          });

          expect(
            hasHorizontalOverflow,
            `Detected horizontal page overflow on "${pagePath}" at viewport ${viewport.width}px`
          ).toBeFalsy();
        });
      }
    });
  }

  test("mobile hamburger navigation opens and closes correctly on mobile viewport", async ({
    page,
  }) => {
    // Set to mobile viewport (390px)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Mobile toggle button should be visible
    const hamburgerButton = page.getByRole("button", {
      name: /open main menu|close main menu/i,
    });
    await expect(hamburgerButton).toBeVisible();

    // Open mobile menu
    await hamburgerButton.click();
    const mobileMenu = page.locator("#mobile-menu");
    await expect(mobileMenu).toBeVisible();

    // Verify nav links inside mobile drawer
    await expect(mobileMenu.getByRole("link", { name: "Products" })).toBeVisible();
    await expect(mobileMenu.getByRole("link", { name: "Contact" }).first()).toBeVisible();

    // Close mobile menu
    await hamburgerButton.click();
    await expect(mobileMenu).not.toBeVisible();
  });

  test("desktop navbar links render and hamburger is hidden at 1280px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Desktop nav items list should be visible
    await expect(page.locator("nav ul").first()).toBeVisible();

    // Hamburger button should be hidden on desktop
    const hamburgerButton = page.getByRole("button", {
      name: /open main menu|close main menu/i,
    });
    await expect(hamburgerButton).toBeHidden();
  });
});
