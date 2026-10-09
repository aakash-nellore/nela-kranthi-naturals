import { test, expect } from "@playwright/test";

const BUSINESS_PHONE_DIGITS = "7207717966";

test.describe("Contact Channels & Business Numbers", () => {
  test("contact page displays verified telephone and WhatsApp channels with correct number", async ({
    page,
  }) => {
    const response = await page.goto("/contact", {
      waitUntil: "domcontentloaded",
    });
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);

    // 1. Telephone link check
    const phoneLinks = page.locator('a[href^="tel:"]');
    const phoneCount = await phoneLinks.count();
    expect(phoneCount, "Expected at least one telephone link on contact page").toBeGreaterThan(0);

    for (let i = 0; i < phoneCount; i++) {
      const href = await phoneLinks.nth(i).getAttribute("href");
      expect(
        href,
        `Telephone link href must contain the business phone ${BUSINESS_PHONE_DIGITS}`
      ).toContain(BUSINESS_PHONE_DIGITS);
    }

    // 2. WhatsApp channel check
    const whatsappLinks = page.locator('a[href*="wa.me"]');
    const whatsappCount = await whatsappLinks.count();
    expect(
      whatsappCount,
      "Expected at least one WhatsApp link on contact page"
    ).toBeGreaterThan(0);

    for (let i = 0; i < whatsappCount; i++) {
      const href = await whatsappLinks.nth(i).getAttribute("href");
      expect(
        href,
        `WhatsApp link href must target business phone number ${BUSINESS_PHONE_DIGITS}`
      ).toContain(BUSINESS_PHONE_DIGITS);
    }
  });

  test("header announcement bar and footer link to correct business phone number", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Header phone link
    const headerPhone = page.locator('header a[href^="tel:"]');
    await expect(headerPhone).toBeVisible();
    const headerHref = await headerPhone.getAttribute("href");
    expect(headerHref).toContain(BUSINESS_PHONE_DIGITS);

    // Footer phone link
    const footerPhone = page.locator('footer a[href^="tel:"]');
    await expect(footerPhone).toBeVisible();
    const footerPhoneHref = await footerPhone.getAttribute("href");
    expect(footerPhoneHref).toContain(BUSINESS_PHONE_DIGITS);

    // Footer WhatsApp link
    const footerWhatsapp = page.locator('footer a[href*="wa.me"]');
    await expect(footerWhatsapp).toBeVisible();
    const footerWhatsappHref = await footerWhatsapp.getAttribute("href");
    expect(footerWhatsappHref).toContain(BUSINESS_PHONE_DIGITS);
  });

  test("contact form renders required fields without submitting network payload", async ({
    page,
  }) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded" });

    // Verify form element and fields
    const form = page.locator("form");
    await expect(form).toBeVisible();

    const nameInput = form.locator('input[name="fullName"]');
    const phoneInput = form.locator('input[name="phoneNumber"]');
    const submitButton = form.locator('button[type="submit"]');

    await expect(nameInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    // Verify inputs are marked as required
    await expect(nameInput).toHaveAttribute("required", "");
    await expect(phoneInput).toHaveAttribute("required", "");
  });
});
