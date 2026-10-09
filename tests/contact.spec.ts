import { test, expect } from "@playwright/test";

const BUSINESS_PHONE_DIGITS = "7207717966";
const BUSINESS_EMAIL = "nelakranthinaturals@gmail.com";

test.describe("Contact Channels & Business Numbers", () => {
  test("contact page displays verified telephone, WhatsApp, and official email channels", async ({
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

    // 3. Official Email channel check
    const emailLinks = page.locator('a[href^="mailto:"]');
    const emailCount = await emailLinks.count();
    expect(
      emailCount,
      "Expected at least one mailto link on contact page"
    ).toBeGreaterThan(0);

    for (let i = 0; i < emailCount; i++) {
      const href = await emailLinks.nth(i).getAttribute("href");
      expect(
        href,
        `Email link href must target official business email ${BUSINESS_EMAIL}`
      ).toBe(`mailto:${BUSINESS_EMAIL}`);
      expect(
        await emailLinks.nth(i).innerText(),
        `Email link visible text must include ${BUSINESS_EMAIL}`
      ).toContain(BUSINESS_EMAIL);
    }
  });

  test("header announcement bar and footer link to correct business phone and email", async ({
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

    // Footer Email link
    const footerEmail = page.locator('footer a[href^="mailto:"]');
    await expect(footerEmail).toBeVisible();
    const footerEmailHref = await footerEmail.getAttribute("href");
    expect(footerEmailHref).toBe(`mailto:${BUSINESS_EMAIL}`);
    expect(await footerEmail.innerText()).toContain(BUSINESS_EMAIL);
  });

  test("bulk orders page provides official business email", async ({
    page,
  }) => {
    await page.goto("/bulk-orders", { waitUntil: "domcontentloaded" });

    const bulkEmail = page.locator('main a[href^="mailto:"]');
    await expect(bulkEmail.first()).toBeVisible();
    expect(await bulkEmail.first().getAttribute("href")).toBe(
      `mailto:${BUSINESS_EMAIL}`
    );
    expect(await bulkEmail.first().innerText()).toContain(BUSINESS_EMAIL);
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

