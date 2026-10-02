import { Product, ProductCategory } from "@/types";

export const CATEGORIES: (ProductCategory | "All")[] = [
  "All",
  "Fruit Powders",
  "Leaf Powders",
  "Vegetable Powders",
  "Dehydrated Foods",
];

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Banana Powder",
    slug: "banana-powder",
    category: "Fruit Powders",
    shortDescription:
      "Pure raw banana powder made from carefully selected farm bananas. Rich in dietary fiber.",
    description:
      "Our Banana Powder is prepared from handpicked, mature green bananas harvested around Sydapuram and processed under hygienic solar dehydration units. Prepared without added sugars, artificial colors, or artificial additives. Perfect for baby foods, health smoothies, porridge, and baking.",
    image: "/images/products/banana-powder.jpg",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-002",
    name: "Papaya Powder",
    slug: "papaya-powder",
    category: "Fruit Powders",
    shortDescription:
      "Sun-crafted pure papaya powder retaining active digestive enzymes (papain), vitamin A, and vibrant natural flavor.",
    description:
      "Produced from farm-fresh ripe papayas solar-dehydrated at controlled temperatures to preserve delicate phytonutrients and natural enzymes. Excellent for digestive wellness drinks, natural seasonings, smoothies, and herbal cosmetic formulations.",
    image: "/images/products/papaya-powder.jpg",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-003",
    name: "Mango Powder",
    slug: "mango-powder",
    category: "Fruit Powders",
    shortDescription:
      "Pure solar-dehydrated mango powder bursting with authentic sweet and tangy Andhra mango notes. Zero artificial flavouring.",
    description:
      "Capturing the rich flavor of regional Nellore mangoes, our pure solar-dehydrated mango powder offers concentrated tropical taste and aroma. Widely used for culinary dishes, curries, mocktails, desserts, and confectionery.",
    image: "/images/products/mango-powder.jpg",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-004",
    name: "Pineapple Powder",
    slug: "pineapple-powder",
    category: "Fruit Powders",
    shortDescription:
      "Tangy, sweet solar-dehydrated pineapple powder packed with natural bromelain and refreshing tropical taste.",
    description:
      "Fresh pineapples are sliced, hygienically dried in solar dehydrators, and micro-milled into a fine, aromatic powder. Contains no anti-caking agents or chemicals. Ideal for beverages, seasonings, marinades, and health blends.",
    image: "/images/products/pineapple-powder.jpg",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-005",
    name: "Lemon Powder",
    slug: "lemon-powder",
    category: "Fruit Powders",
    shortDescription:
      "Zesty, vitamin C-packed whole lemon powder made from Nellore's renowned citrus groves.",
    description:
      "Processed from wholesome whole lemons including the nutrient-dense rind and pulp. Provides an instant burst of natural acidity, bioflavonoids, and vitamin C. Great for instant lemonades, teas, dry rubs, and baking.",
    image: "/images/products/lemon-powder.jpg",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-006",
    name: "Moringa Powder",
    slug: "moringa-powder",
    category: "Leaf Powders",
    shortDescription:
      "Farm-fresh drumstick leaves shade- and solar-dried to retain natural nutrients, color, and aroma.",
    description:
      "Regarded as the 'Miracle Tree', our Moringa leaf powder is sourced from trees in Sydapuram. The tender leaves are washed with pure water, solar-dehydrated to preserve the rich chlorophyll, and stone-ground. Ideal for daily wellness, morning herbal tea, or mixing with warm water and soups.",
    image: "/images/products/moringa-powder.jpg",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-007",
    name: "Curry Leaves Powder",
    slug: "curry-leaves-powder",
    category: "Leaf Powders",
    shortDescription:
      "Aromatic solar-dehydrated curry leaf powder with retained essential oils and deep green freshness.",
    description:
      "Freshly plucked aromatic curry leaves gently dehydrated to maintain their potent essential oils and deep color. A traditional South Indian staple known for authentic aroma and flavor. Perfect for mixing with rice, ghee, podis, and daily cooking.",
    image: "/images/products/curry-leaves-powder.jpg",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-008",
    name: "Ladyfinger / Okra Powder",
    slug: "okra-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Nutrient-dense dehydrated okra powder retaining natural mucilage, dietary fiber, and authentic vegetable texture.",
    description:
      "Selected tender ladyfingers (bhendi) are thoroughly cleaned, sliced, and solar-dehydrated under strict hygiene. Rich in natural polyphenols, folate, and soluble fibers. Widely used as a traditional dietary addition and culinary thickening agent.",
    image: "/images/products/okra-powder.jpg",
    unit: "100g / 250g / 500g",
    available: true,
  },
];

/**
 * Helper to fetch all available products (mirrors future Supabase table select)
 */
export function getAllProducts(): Product[] {
  return products;
}

/**
 * Helper to fetch product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * Helper to filter products by category
 */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}
