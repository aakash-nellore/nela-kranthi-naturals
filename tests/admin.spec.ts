import { test, expect } from "@playwright/test";

test.describe("Admin Panel Portal & Content Management", () => {
  test("dashboard (/admin) loads with HTTP 200, renders admin navigation and KPI cards", async ({
    page,
  }) => {
    const response = await page.goto("/admin", {
      waitUntil: "domcontentloaded",
    });

    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);

    // Verify page main container and primary heading
    await expect(page.locator("main")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Overview & Content Management/i })
    ).toBeVisible();

    // Verify Admin Navigation links are visible
    const adminNav = page.getByRole("navigation", {
      name: "Admin Section Navigation",
    });
    await expect(adminNav).toBeVisible();
    await expect(adminNav.getByRole("link", { name: "Dashboard" })).toBeVisible();
    await expect(adminNav.getByRole("link", { name: "Products" })).toBeVisible();
    await expect(
      adminNav.getByRole("link", { name: "Website Content" })
    ).toBeVisible();
    await expect(adminNav.getByRole("link", { name: "Settings" })).toBeVisible();

    // Verify KPI summary metrics exist
    await expect(page.getByText("Total Products").first()).toBeVisible();
    await expect(page.getByText("Published Products").first()).toBeVisible();
    await expect(page.getByText("Draft Products").first()).toBeVisible();
    await expect(page.getByText("Active Categories").first()).toBeVisible();

    // Verify public Navbar and Footer remain visible as per user instruction
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("product management (/admin/products) renders table, search, and category filter", async ({
    page,
  }) => {
    const response = await page.goto("/admin/products", {
      waitUntil: "domcontentloaded",
    });

    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);

    // Verify page heading
    await expect(
      page.getByRole("heading", { name: /Product Management/i })
    ).toBeVisible();

    // Verify search input
    const searchInput = page.getByPlaceholder(
      /Search products by name or slug/i
    );
    await expect(searchInput).toBeVisible();

    // Verify category select filter
    const categorySelect = page.locator("select");
    await expect(categorySelect.first()).toBeVisible();

    // Verify Add Product button
    const addButton = page.getByRole("button", { name: /Add Product/i });
    await expect(addButton).toBeVisible();

    // Verify table rendered rows
    const tableRows = page.locator("tbody tr");
    expect(await tableRows.count()).toBeGreaterThan(0);
  });

  test("product modal opens, displays required product fields, and closes cleanly", async ({
    page,
  }) => {
    await page.goto("/admin/products", { waitUntil: "domcontentloaded" });

    // Click Add Product with polling to handle React hydration timing gracefully
    const addButton = page.getByRole("button", { name: /Add Product/i });
    const modal = page.getByRole("dialog");

    await expect
      .poll(async () => {
        if (!(await modal.isVisible())) {
          await addButton.click();
        }
        return await modal.isVisible();
      })
      .toBe(true);

    // Verify modal dialog appears
    await expect(modal).toBeVisible();
    await expect(
      modal.getByRole("heading", { name: /Add New Product/i })
    ).toBeVisible();

    // Verify core business fields are present in the form
    await expect(modal.locator("#product-name")).toBeVisible();
    await expect(modal.locator("#product-slug")).toBeVisible();
    await expect(modal.locator("#product-category")).toBeVisible();
    await expect(modal.locator("#product-unit")).toBeVisible();
    await expect(modal.locator("#product-image")).toBeVisible();
    await expect(modal.locator("#product-short-description")).toBeVisible();
    await expect(modal.locator("#product-description")).toBeVisible();
    await expect(modal.locator("#product-is-active")).toBeVisible();

    // Click Cancel to close modal
    const cancelButton = modal.getByRole("button", { name: /Cancel/i });
    await cancelButton.click();
    await expect(modal).not.toBeVisible();
  });

  test("website content overview (/admin/content) loads with content sections", async ({
    page,
  }) => {
    const response = await page.goto("/admin/content", {
      waitUntil: "domcontentloaded",
    });

    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);

    // Verify page heading
    await expect(
      page.getByRole("heading", { name: /Website Content Overview/i })
    ).toBeVisible();

    // Verify content sections are listed
    await expect(page.getByText(/Homepage Hero/i).first()).toBeVisible();
    await expect(page.getByText(/About Us & Sydapuram Heritage/i)).toBeVisible();
    await expect(page.getByText(/Solar Dehydration Process/i)).toBeVisible();
    await expect(page.getByText(/Business Contact & Official Channels/i)).toBeVisible();
  });

  test("settings page (/admin/settings) renders database, storage, and verified business contacts", async ({
    page,
  }) => {
    const response = await page.goto("/admin/settings", {
      waitUntil: "domcontentloaded",
    });

    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);

    // Verify page heading
    await expect(
      page.getByRole("heading", { name: /Portal & Integration Settings/i })
    ).toBeVisible();

    // Verify official business email is displayed
    await expect(
      page.getByText("nelakranthinaturals@gmail.com").first()
    ).toBeVisible();

    // Verify official phone is displayed
    await expect(
      page.getByText("+91 72077 17966", { exact: false }).first()
    ).toBeVisible();

    // Verify Supabase database and storage buckets are detailed
    await expect(
      page.getByRole("heading", { name: "Database Infrastructure" })
    ).toBeVisible();
    await expect(page.getByText(/product-images/i)).toBeVisible();
    await expect(page.getByText(/public-images/i)).toBeVisible();
  });

  test("admin pages adapt responsively without horizontal overflow", async ({
    page,
  }) => {
    const adminPages = ["/admin", "/admin/products", "/admin/content", "/admin/settings"];
    const viewports = [
      { name: "Mobile", width: 390, height: 844 },
      { name: "Tablet", width: 768, height: 1024 },
      { name: "Desktop", width: 1280, height: 800 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      for (const route of adminPages) {
        await page.goto(route, { waitUntil: "domcontentloaded" });

        const hasHorizontalOverflow = await page.evaluate(() => {
          const documentWidth = document.documentElement.scrollWidth;
          const windowWidth = window.innerWidth;
          return documentWidth > windowWidth + 1;
        });

        expect(
          hasHorizontalOverflow,
          `Detected horizontal overflow on "${route}" at viewport ${vp.width}px`
        ).toBeFalsy();
      }
    }
  });
});
