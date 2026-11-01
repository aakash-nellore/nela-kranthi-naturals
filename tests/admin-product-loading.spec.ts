import { test, expect } from "@playwright/test";
import { getAllAdminProducts, AdminClientLike } from "../lib/products";
import { saveProductAction, uploadProductImageAction } from "../lib/product-actions";

// Sample mock data representing database rows
const mockActiveRow = {
  id: "mock-active-1",
  name: "Moringa Powder",
  slug: "moringa-powder",
  category: "Leaf Powders",
  description: "Farm-fresh drumstick leaves solar-dried to preserve chlorophyll.",
  image_url: "https://example.com/moringa.jpg",
  unit: "100g / 250g / 500g",
  is_active: true,
};

const mockDraftRow = {
  id: "mock-draft-1",
  name: "Guava Leaf Powder",
  slug: "guava-leaf-powder",
  category: "Leaf Powders",
  description: "Botanical powder prepared from dehydrated guava leaves.",
  image_url: null,
  unit: "100g / 250g / 500g",
  is_active: false,
};

test.describe("Unit Tests (Mocks): Admin Product Loading & DAL Security", () => {
  test("1. Admin with valid 'admin' role can retrieve active and draft records without filtering", async () => {
    // Generate 31 mock rows (8 active, 23 drafts)
    const mock31Rows = [
      ...Array.from({ length: 8 }, (_, i) => ({
        ...mockActiveRow,
        id: `mock-active-${i + 1}`,
        slug: `mock-active-slug-${i + 1}`,
        name: `Active Product ${i + 1}`,
      })),
      ...Array.from({ length: 23 }, (_, i) => ({
        ...mockDraftRow,
        id: `mock-draft-${i + 1}`,
        slug: `mock-draft-slug-${i + 1}`,
        name: `Draft Product ${i + 1}`,
      })),
    ];

    const mockAdminClient: AdminClientLike = {
      auth: {
        getUser: async () => ({
          data: {
            user: {
              id: "admin-uuid-1",
              email: "nelakranthinaturals@gmail.com",
              app_metadata: { role: "admin" },
            },
          },
          error: null,
        }),
      },
      from: (table: string) => {
        expect(table).toBe("products");
        return {
          select: (columns?: string) => {
            expect(columns).toBe("*");
            return {
              order: async (col: string, opts?: { ascending?: boolean }) => {
                expect(col).toBe("name");
                expect(opts?.ascending).toBe(true);
                return {
                  data: mock31Rows,
                  error: null,
                };
              },
            };
          },
        };
      },
    };

    const result = await getAllAdminProducts({ client: mockAdminClient });

    expect(result.error).toBeNull();
    expect(result.products).toHaveLength(31);
    expect(result.products.filter((p) => p.available)).toHaveLength(8);
    expect(result.products.filter((p) => !p.available)).toHaveLength(23);
  });

  test("2. Missing admin role produces explicit authorization error and never returns products", async () => {
    let databaseQueried = false;

    const mockNonAdminClient: AdminClientLike = {
      auth: {
        getUser: async () => ({
          data: {
            user: {
              id: "ordinary-user-uuid",
              email: "customer@example.com",
              app_metadata: { role: "authenticated_user" }, // Lacks 'admin' role
            },
          },
          error: null,
        }),
      },
      from: () => {
        databaseQueried = true;
        throw new Error("FAIL-CLOSED: Database query must NOT be invoked when admin role is missing!");
      },
    };

    const result = await getAllAdminProducts({ client: mockNonAdminClient });

    expect(result.products).toHaveLength(0);
    expect(result.errorCode).toBe("ROLE_REQUIRED");
    expect(result.error).toContain("Access Denied: Administrative privileges ('admin' role) are required");
    expect(databaseQueried).toBe(false);
  });

  test("3. Unauthenticated session produces explicit authentication error", async () => {
    const mockUnauthenticatedClient: AdminClientLike = {
      auth: {
        getUser: async () => ({
          data: null,
          error: { message: "Auth session missing or expired" },
        }),
      },
      from: () => {
        throw new Error("FAIL-CLOSED: Database query must not run without session!");
      },
    };

    const result = await getAllAdminProducts({ client: mockUnauthenticatedClient });

    expect(result.products).toHaveLength(0);
    expect(result.errorCode).toBe("AUTH_REQUIRED");
    expect(result.error).toContain("Authentication required");
  });

  test("4. Failed database query produces visible database error and never falls back to hardcoded data", async () => {
    const mockFailingDbClient: AdminClientLike = {
      auth: {
        getUser: async () => ({
          data: {
            user: {
              id: "admin-uuid-1",
              email: "nelakranthinaturals@gmail.com",
              app_metadata: { role: "admin" },
            },
          },
          error: null,
        }),
      },
      from: () => ({
        select: () => ({
          order: async () => ({
            data: null,
            error: { message: "database connection timeout (504 Gateway Timeout)" },
          }),
        }),
      }),
    };

    const result = await getAllAdminProducts({ client: mockFailingDbClient });

    // CRITICAL SECURITY ASSERTION: Must NOT return the 8 hardcoded fallbackProducts!
    expect(result.products).toHaveLength(0);
    expect(result.errorCode).toBe("DB_ERROR");
    expect(result.error).toContain("Database Error: Failed to fetch products from Supabase (database connection timeout (504 Gateway Timeout)).");
  });

  test("5. Unexpected database exception produces sanitized error and never returns fake fallback data", async () => {
    const mockCrashingClient: AdminClientLike = {
      auth: {
        getUser: async () => ({
          data: {
            user: {
              id: "admin-uuid-1",
              email: "nelakranthinaturals@gmail.com",
              app_metadata: { role: "admin" },
            },
          },
          error: null,
        }),
      },
      from: () => {
        throw new Error("Network socket destroyed unexpectedly");
      },
    };

    const result = await getAllAdminProducts({ client: mockCrashingClient });

    expect(result.products).toHaveLength(0);
    expect(result.errorCode).toBe("DB_ERROR");
    expect(result.error).toContain("Database Error: Network socket destroyed unexpectedly");
  });
});

test.describe("Integration Tests (Live RLS & Server Protections)", () => {
  test("6. Anonymous users cannot retrieve draft products (404 and exclusion verified)", async ({
    page,
  }) => {
    // 1. Direct navigation to unpublished draft slugs must return HTTP 404
    const sampleDraftSlugs = [
      "guava-leaf-powder",
      "papaya-leaf-powder",
      "neem-leaf-powder",
      "marigold-petals-dried",
      "safed-musli-root-powder",
    ];

    for (const slug of sampleDraftSlugs) {
      const response = await page.goto(`/products/${slug}`, {
        waitUntil: "domcontentloaded",
      });
      expect(
        response?.status(),
        `Expected HTTP 404 for draft slug "${slug}" when requested anonymously`
      ).toBe(404);
    }
  });

  test("7. Public catalogue continues showing only active products and excludes all drafts", async ({
    page,
  }) => {
    await page.goto("/products", { waitUntil: "domcontentloaded" });

    // Collect all links pointing to /products/[slug]
    const links = await page
      .locator('a[href^="/products/"]')
      .evaluateAll((elements: HTMLAnchorElement[]) => {
        return elements.map((el) => el.getAttribute("href") || "");
      });

    // Verify all 8 core active products exist
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
      expect(links).toContain(expectedPath);
    }

    // Verify draft slugs are strictly excluded
    const sampleDraftSlugs = [
      "/products/guava-leaf-powder",
      "/products/papaya-leaf-powder",
      "/products/neem-leaf-powder",
      "/products/marigold-petals-dried",
      "/products/safed-musli-root-powder",
    ];

    for (const draftPath of sampleDraftSlugs) {
      expect(links).not.toContain(draftPath);
    }
  });

  test("8. Server-side mutations retain strict authorization guards (requireAdminSession)", async () => {
    // Calling saveProductAction without admin credentials must fail closed
    const unauthSaveResult = await saveProductAction({
      name: "Unauthorized Hacker Product",
      slug: "unauthorized-product",
      category: "Leaf Powders",
      unit: "100g",
      description: "Malicious attempt to create product without admin session",
      isActive: false,
    });

    expect(unauthSaveResult.success).toBe(false);
    expect(unauthSaveResult.error).toContain("Access Denied");

    // Calling uploadProductImageAction without admin credentials must fail closed
    const formData = new FormData();
    formData.append("slug", "hacker-image");
    const unauthUploadResult = await uploadProductImageAction(formData);

    expect(unauthUploadResult.success).toBe(false);
    expect(unauthUploadResult.error).toContain("Access Denied");
  });
});

