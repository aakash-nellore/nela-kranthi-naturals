/**
 * Nela Kranthi Naturals — Product-First SEO Registry & Metadata Helper
 *
 * Implements high-intent, product-first SEO titles, verified meta descriptions (140-160 chars),
 * Schema.org Product structured data, and BreadcrumbList structured data for all active catalogue items.
 *
 * Rules:
 * 1. Product keywords lead titles and headings; brand is the secondary identifier.
 * 2. Only verified botanical/culinary characteristics are used.
 * 3. No invented nutrition, organic certification, prices, availability, health benefits, or medicinal claims.
 * 4. Regulatory review items are explicitly flagged and marked noindex if rendered.
 */

import { Product } from "@/types";
import { SITE_CONTACT } from "@/lib/constants";
import { isComplianceRestricted } from "@/lib/compliance";

export interface ProductSeoEntry {
  slug: string;
  name: string;
  category: string;
  primaryKeyword: string;
  secondaryKeyword: string;
  seoTitle: string;
  metaDescription: string;
  searchIntent: string;
  imageAlt?: string;
  isRestricted?: boolean;
}

export const PRODUCT_SEO_REGISTRY: Record<string, ProductSeoEntry> = {
  // --------------------------------------------------------------------------
  // Fruit Powders (9 Active)
  // --------------------------------------------------------------------------
  "amla-powder": {
    slug: "amla-powder",
    name: "Amla Powder",
    category: "Fruit Powders",
    primaryKeyword: "Amla Powder",
    secondaryKeyword: "Pure Dehydrated Indian Gooseberry",
    seoTitle: "Amla Powder – Pure Dehydrated Indian Gooseberry | Nela Kranthi Naturals",
    metaDescription:
      "Pure dehydrated Indian gooseberry (amla) powder deseeded and hygienically processed with zero additives. Ideal for culinary recipes and daily dietary intake.",
    searchIntent: "Culinary & Dietary",
  },
  "apple-powder": {
    slug: "apple-powder",
    name: "Apple Powder",
    category: "Fruit Powders",
    primaryKeyword: "Apple Powder",
    secondaryKeyword: "Natural Dehydrated Apple Flour",
    seoTitle: "Apple Powder – Natural Dehydrated Apple Flour | Nela Kranthi Naturals",
    metaDescription:
      "Pure dehydrated apple powder made from cored apples with zero added sugar or preservatives. Perfect for baking, smoothies, breakfast cereals, and confectionery.",
    searchIntent: "Culinary & Food Formulation",
  },
  "banana-powder": {
    slug: "banana-powder",
    name: "Banana Powder",
    category: "Fruit Powders",
    primaryKeyword: "Raw Green Banana Powder",
    secondaryKeyword: "Natural Green Banana Flour",
    seoTitle: "Raw Green Banana Powder – Natural Banana Flour | Nela Kranthi Naturals",
    metaDescription:
      "Pure green banana powder prepared from mature green bananas using solar dehydration. Zero additives or added sugars. Ideal for porridge, baking, and smoothies.",
    searchIntent: "Culinary & Dietary",
    imageAlt: "Fine raw green banana powder in a wooden bowl with sliced bananas",
  },
  "dragon-fruit-powder": {
    slug: "dragon-fruit-powder",
    name: "Dragon Fruit Powder",
    category: "Fruit Powders",
    primaryKeyword: "Dragon Fruit Powder",
    secondaryKeyword: "Pure Pink Pitaya Powder",
    seoTitle: "Dragon Fruit Powder – Pure Pink Pitaya Powder | Nela Kranthi Naturals",
    metaDescription:
      "Vibrant pink dragon fruit powder prepared with gentle solar dehydration. Zero food dyes or fillers. Ideal for smoothie bowls, refreshing drinks, and baking.",
    searchIntent: "Culinary & Natural Colorant",
  },
  "lemon-powder": {
    slug: "lemon-powder",
    name: "Lemon Powder",
    category: "Fruit Powders",
    primaryKeyword: "Lemon Powder",
    secondaryKeyword: "Natural Dehydrated Whole Lemon",
    seoTitle: "Lemon Powder – Natural Dehydrated Whole Lemon | Nela Kranthi Naturals",
    metaDescription:
      "Zesty whole lemon powder made from dehydrated rind and pulp. High natural acidity with no artificial flavouring. Excellent for drinks, baking, rubs, and teas.",
    searchIntent: "Culinary & Beverage",
    imageAlt: "Fine dehydrated whole lemon powder in a bowl with fresh yellow lemons",
  },
  "mango-powder": {
    slug: "mango-powder",
    name: "Mango Powder",
    category: "Fruit Powders",
    primaryKeyword: "Mango Powder",
    secondaryKeyword: "Natural Dehydrated Mango",
    seoTitle: "Mango Powder – Natural Dehydrated Mango | Nela Kranthi Naturals",
    metaDescription:
      "Pure solar-dehydrated mango powder bursting with authentic sweet-tangy flavor. Zero artificial flavors or added sugar. Ideal for drinks, desserts, and curries.",
    searchIntent: "Culinary & Confectionery",
    imageAlt: "Golden solar-dehydrated mango powder in a bowl with fresh mango fruit slices",
  },
  "orange-powder": {
    slug: "orange-powder",
    name: "Orange Powder",
    category: "Fruit Powders",
    primaryKeyword: "Orange Powder",
    secondaryKeyword: "Natural Dehydrated Citrus",
    seoTitle: "Orange Powder – Natural Dehydrated Citrus | Nela Kranthi Naturals",
    metaDescription:
      "Zesty fruit powder prepared from dehydrated oranges with zero artificial additives. Retains natural citrus flavor. Ideal for bakery, drink mixes, and marinades.",
    searchIntent: "Culinary & Beverage",
  },
  "papaya-powder": {
    slug: "papaya-powder",
    name: "Papaya Powder",
    category: "Fruit Powders",
    primaryKeyword: "Papaya Powder",
    secondaryKeyword: "Solar Dehydrated Papaya Fruit",
    seoTitle: "Papaya Powder – Solar Dehydrated Papaya Fruit | Nela Kranthi Naturals",
    metaDescription:
      "Solar-dehydrated ripe papaya fruit powder retaining natural sweetness. Pure fruit with zero additives. Ideal for smoothie blends, seasonings, and desserts.",
    searchIntent: "Culinary & Beverage",
    imageAlt: "Solar-dehydrated papaya fruit powder in a bowl with fresh papaya slices",
  },
  "pineapple-powder": {
    slug: "pineapple-powder",
    name: "Pineapple Powder",
    category: "Fruit Powders",
    primaryKeyword: "Pineapple Powder",
    secondaryKeyword: "Solar Dehydrated Pineapple",
    seoTitle: "Pineapple Powder – Solar Dehydrated Pineapple | Nela Kranthi Naturals",
    metaDescription:
      "Tangy-sweet solar-dehydrated pineapple powder with zero added sugar or anti-caking chemicals. Ideal for tropical beverages, baking mixes, marinades, and glazes.",
    searchIntent: "Culinary & Beverage",
    imageAlt: "Golden solar-dehydrated pineapple fruit powder with dried pineapple pieces",
  },

  // --------------------------------------------------------------------------
  // Leaf Powders (5 Active)
  // --------------------------------------------------------------------------
  "curry-leaves-powder": {
    slug: "curry-leaves-powder",
    name: "Curry Leaves Powder",
    category: "Leaf Powders",
    primaryKeyword: "Curry Leaves Powder",
    secondaryKeyword: "Natural Dried Curry Leaf Powder",
    seoTitle: "Curry Leaves Powder – Natural Dried Curry Leaf Powder | Nela Kranthi Naturals",
    metaDescription:
      "Aromatic solar-dehydrated curry leaf powder retaining authentic aroma. Pure and chemical-free. Ideal for spiced rice, traditional podis, and daily seasoning.",
    searchIntent: "Culinary & Spice Seasoning",
    imageAlt: "Dehydrated green curry leaf powder in a bowl with fresh curry leaves",
  },
  "gongura-leaf-powder": {
    slug: "gongura-leaf-powder",
    name: "Gongura Leaf Powder",
    category: "Leaf Powders",
    primaryKeyword: "Gongura Leaf Powder",
    secondaryKeyword: "Dehydrated Sorrel Leaves",
    seoTitle: "Gongura Leaf Powder – Dehydrated Sorrel Leaves | Nela Kranthi Naturals",
    metaDescription:
      "Authentic tangy gongura leaf powder solar-dehydrated with zero preservatives. Brings regional flavor to traditional dal recipes, spice podis, and tangy chutneys.",
    searchIntent: "Culinary & Traditional Food",
  },
  "guava-leaf-powder": {
    slug: "guava-leaf-powder",
    name: "Guava Leaf Powder",
    category: "Leaf Powders",
    primaryKeyword: "Guava Leaf Powder",
    secondaryKeyword: "Natural Dehydrated Guava Leaves",
    seoTitle: "Guava Leaf Powder – Natural Dehydrated Guava Leaves | Nela Kranthi Naturals",
    metaDescription:
      "Botanical powder made from dehydrated guava tree leaves with zero additives. Ideal for herbal tea infusions, specialty wellness drinks, and natural extracts.",
    searchIntent: "Herbal Tea & Botanical Infusion",
  },
  "mint-leaf-powder": {
    slug: "mint-leaf-powder",
    name: "Mint Leaf Powder",
    category: "Leaf Powders",
    primaryKeyword: "Mint Leaf Powder",
    secondaryKeyword: "Dehydrated Pudina Leaves",
    seoTitle: "Mint Leaf Powder – Dehydrated Pudina Leaves | Nela Kranthi Naturals",
    metaDescription:
      "Aromatic dehydrated mint (pudina) leaf powder with zero additives. Perfect for raita blends, refreshing beverages, chutneys, marinades, and savory seasonings.",
    searchIntent: "Culinary & Beverage",
  },
  "moringa-powder": {
    slug: "moringa-powder",
    name: "Moringa Powder",
    category: "Leaf Powders",
    primaryKeyword: "Moringa Powder",
    secondaryKeyword: "Pure Moringa Leaf Powder",
    seoTitle: "Moringa Powder – Pure Moringa Leaf Powder | Nela Kranthi Naturals",
    metaDescription:
      "Nutrient-rich solar-dehydrated moringa leaf powder. Gently processed, finely ground, and 100% pure. Perfect for daily dietary smoothies, herbal teas, and soups.",
    searchIntent: "Dietary Wellness & Botanical",
    imageAlt: "Pure solar-dehydrated moringa leaf powder on a rustic wooden surface",
  },

  // --------------------------------------------------------------------------
  // Flower & Petal Products (1 Active)
  // --------------------------------------------------------------------------
  "desi-gulabi-rose-petals-dried": {
    slug: "desi-gulabi-rose-petals-dried",
    name: "Desi Gulabi Rose Petals (Dried)",
    category: "Flower & Petal Products",
    primaryKeyword: "Desi Gulabi Rose Petals",
    secondaryKeyword: "Natural Dried Rose Petals",
    seoTitle: "Desi Gulabi Rose Petals – Natural Dried Rose Petals | Nela Kranthi Naturals",
    metaDescription:
      "Whole dried Desi Gulabi rose petals with natural floral aroma. Whole non-powder petals. Ideal for herbal tea infusions, gulkand, confectionery, and garnish.",
    searchIntent: "Culinary, Herbal Tea & Confectionery",
  },

  // --------------------------------------------------------------------------
  // Vegetable Powders (9 Active)
  // --------------------------------------------------------------------------
  "beetroot-powder": {
    slug: "beetroot-powder",
    name: "Beetroot Powder",
    category: "Vegetable Powders",
    primaryKeyword: "Beetroot Powder",
    secondaryKeyword: "Natural Dehydrated Beetroot",
    seoTitle: "Beetroot Powder – Natural Dehydrated Beetroot | Nela Kranthi Naturals",
    metaDescription:
      "Pure solar-dehydrated beetroot powder made from red beets with zero artificial colors or fillers. Perfect for natural food coloring, smoothies, and baking mixes.",
    searchIntent: "Culinary & Natural Colorant",
  },
  "bitter-gourd-powder": {
    slug: "bitter-gourd-powder",
    name: "Bitter Gourd Powder",
    category: "Vegetable Powders",
    primaryKeyword: "Bitter Gourd Powder",
    secondaryKeyword: "Dehydrated Karela Powder",
    seoTitle: "Bitter Gourd Powder – Dehydrated Karela Powder | Nela Kranthi Naturals",
    metaDescription:
      "Pure solar-dehydrated bitter gourd (karela) powder with zero preservatives or fillers. Traditional vegetable powder for culinary recipes, seasonings, and soups.",
    searchIntent: "Culinary & Traditional Food",
  },
  "brinjal-eggplant-powder": {
    slug: "brinjal-eggplant-powder",
    name: "Brinjal (Eggplant) Powder",
    category: "Vegetable Powders",
    primaryKeyword: "Brinjal Powder",
    secondaryKeyword: "Dehydrated Eggplant Powder",
    seoTitle: "Brinjal Powder – Dehydrated Eggplant Powder | Nela Kranthi Naturals",
    metaDescription:
      "Pure dehydrated brinjal (eggplant) powder with zero additives. Ideal for culinary sauce thickening, instant curry bases, dry seasonings, and food formulations.",
    searchIntent: "Culinary & Food Processing",
  },
  "carrot-powder": {
    slug: "carrot-powder",
    name: "Carrot Powder",
    category: "Vegetable Powders",
    primaryKeyword: "Carrot Powder",
    secondaryKeyword: "Natural Dehydrated Carrot",
    seoTitle: "Carrot Powder – Natural Dehydrated Carrot | Nela Kranthi Naturals",
    metaDescription:
      "Pure dehydrated carrot powder retaining natural flavor and rich color. Zero added sugar or fillers. Ideal for soups, bakery mixes, pasta, and culinary blends.",
    searchIntent: "Culinary & Natural Ingredient",
  },
  "drumstick-pod-powder": {
    slug: "drumstick-pod-powder",
    name: "Drumstick Pod Powder",
    category: "Vegetable Powders",
    primaryKeyword: "Drumstick Pod Powder",
    secondaryKeyword: "Dehydrated Moringa Pod",
    seoTitle: "Drumstick Pod Powder – Dehydrated Moringa Pod | Nela Kranthi Naturals",
    metaDescription:
      "Pure dehydrated drumstick pod powder from tender vegetable pods. Distinct from leaf powder. Adds authentic regional flavor to sambar, curries, and soup bases.",
    searchIntent: "Culinary & Regional Spice",
  },
  "green-chilli-powder": {
    slug: "green-chilli-powder",
    name: "Green Chilli Powder",
    category: "Vegetable Powders",
    primaryKeyword: "Green Chilli Powder",
    secondaryKeyword: "Dehydrated Green Chilli",
    seoTitle: "Green Chilli Powder – Dehydrated Green Chilli | Nela Kranthi Naturals",
    metaDescription:
      "Sharp, pungent green chilli powder made from solar-dehydrated green chillies with zero additives. Perfect for snack seasonings, spice rubs, and savory curries.",
    searchIntent: "Culinary & Spice Seasoning",
  },
  "okra-powder": {
    slug: "okra-powder",
    name: "Ladyfinger / Okra Powder",
    category: "Vegetable Powders",
    primaryKeyword: "Okra Powder",
    secondaryKeyword: "Dehydrated Ladyfinger Powder",
    seoTitle: "Okra Powder – Dehydrated Ladyfinger Powder | Nela Kranthi Naturals",
    metaDescription:
      "Pure dehydrated okra (ladyfinger/bhendi) powder retaining natural dietary fiber and texture. Chemical-free vegetable powder for cooking, soups, and thickeners.",
    searchIntent: "Culinary & Thickening Agent",
    imageAlt: "Solar-dehydrated okra powder in a bowl alongside fresh ladyfinger slices",
  },
  "onion-powder": {
    slug: "onion-powder",
    name: "Onion Powder",
    category: "Vegetable Powders",
    primaryKeyword: "Onion Powder",
    secondaryKeyword: "Natural Dehydrated Onion Powder",
    seoTitle: "Onion Powder – Natural Dehydrated Onion Powder | Nela Kranthi Naturals",
    metaDescription:
      "Pure dehydrated onion powder with rich savory aroma and flavor. Free from anti-caking agents, salt, or fillers. Ideal for seasoning blends, gravies, and soups.",
    searchIntent: "Culinary & Savory Seasoning",
  },
  "tomato-powder": {
    slug: "tomato-powder",
    name: "Tomato Powder",
    category: "Vegetable Powders",
    primaryKeyword: "Tomato Powder",
    secondaryKeyword: "Natural Dehydrated Tomato",
    seoTitle: "Tomato Powder – Natural Dehydrated Tomato | Nela Kranthi Naturals",
    metaDescription:
      "Rich dehydrated tomato powder made from ripe tomatoes with zero added salt or preservatives. Delivers natural umami to soups, sauces, pasta, and dry seasonings.",
    searchIntent: "Culinary & Food Seasoning",
  },

  // --------------------------------------------------------------------------
  // Roots, Spices & Specialty Botanicals (2 Active)
  // --------------------------------------------------------------------------
  "garlic-powder": {
    slug: "garlic-powder",
    name: "Garlic Powder",
    category: "Roots, Spices & Specialty Botanicals",
    primaryKeyword: "Garlic Powder",
    secondaryKeyword: "Pure Dehydrated Garlic Clove Powder",
    seoTitle: "Garlic Powder – Pure Dehydrated Garlic Clove Powder | Nela Kranthi Naturals",
    metaDescription:
      "Pungent and flavorful garlic powder prepared from dehydrated garlic cloves without additives or anti-caking agents. Essential for dry rubs, sauces, and cooking.",
    searchIntent: "Culinary & Seasoning",
  },
  "ginger-powder": {
    slug: "ginger-powder",
    name: "Ginger Powder",
    category: "Roots, Spices & Specialty Botanicals",
    primaryKeyword: "Ginger Powder",
    secondaryKeyword: "Natural Dehydrated Ginger Rhizome",
    seoTitle: "Ginger Powder – Natural Dehydrated Ginger Rhizome | Nela Kranthi Naturals",
    metaDescription:
      "Unbleached dry ginger rhizome powder prepared from solar-dehydrated ginger roots. Free from chemical additives. Ideal for herbal chai, spice blends, and baking.",
    searchIntent: "Culinary & Beverage",
  },

  // --------------------------------------------------------------------------
  // Regulatory Review Products (5 Inactive — Explicitly Marked & Safe)
  // --------------------------------------------------------------------------
  "papaya-leaf-powder": {
    slug: "papaya-leaf-powder",
    name: "Papaya Leaf Powder",
    category: "Leaf Powders",
    primaryKeyword: "Papaya Leaf Powder",
    secondaryKeyword: "Botanical Foliage Powder",
    seoTitle: "Papaya Leaf Powder – Botanical Foliage Powder | Nela Kranthi Naturals",
    metaDescription:
      "Botanical powder prepared from Carica papaya foliage. Catalogued strictly for commercial inquiry and technical review. Not offered for retail food consumption.",
    searchIntent: "Commercial B2B / Formulation Inquiry",
    isRestricted: true,
  },
  "jamun-leaf-powder": {
    slug: "jamun-leaf-powder",
    name: "Jamun Leaf Powder",
    category: "Leaf Powders",
    primaryKeyword: "Jamun Leaf Powder",
    secondaryKeyword: "Dehydrated Foliage Powder",
    seoTitle: "Jamun Leaf Powder – Dehydrated Foliage Powder | Nela Kranthi Naturals",
    metaDescription:
      "Botanical powder prepared from Syzygium cumini foliage. Offered strictly for commercial inquiry and technical specification review. Zero medical claims are made.",
    searchIntent: "Commercial B2B / Formulation Inquiry",
    isRestricted: true,
  },
  "neem-leaf-powder": {
    slug: "neem-leaf-powder",
    name: "Neem Leaf Powder",
    category: "Leaf Powders",
    primaryKeyword: "Neem Leaf Powder",
    secondaryKeyword: "Dehydrated Neem Foliage",
    seoTitle: "Neem Leaf Powder – Dehydrated Neem Foliage | Nela Kranthi Naturals",
    metaDescription:
      "Botanical powder prepared from Azadirachta indica foliage. Catalogued for technical specification review and topical formulation. Not sold as retail food.",
    searchIntent: "Commercial B2B / Topical Inquiry",
    isRestricted: true,
  },
  "marigold-petals-dried": {
    slug: "marigold-petals-dried",
    name: "Marigold Petals (Dried)",
    category: "Flower & Petal Products",
    primaryKeyword: "Dried Marigold Petals",
    secondaryKeyword: "Whole Dried Floral Petals",
    seoTitle: "Marigold Petals (Dried) – Whole Dried Floral Petals | Nela Kranthi Naturals",
    metaDescription:
      "Whole dried Tagetes flower petals. Non-powder floral petals catalogued for natural color extraction and commercial inquiry. Zero medical claims are made.",
    searchIntent: "Commercial B2B / Extraction Inquiry",
    isRestricted: true,
  },
  "safed-musli-root-powder": {
    slug: "safed-musli-root-powder",
    name: "Safed Musli Root Powder",
    category: "Roots, Spices & Specialty Botanicals",
    primaryKeyword: "Safed Musli Root Powder",
    secondaryKeyword: "Botanical Root Powder",
    seoTitle: "Safed Musli Root Powder – Botanical Root Powder | Nela Kranthi Naturals",
    metaDescription:
      "Botanical powder prepared from Chlorophytum borivilianum roots. Specialty botanical catalogued strictly for commercial inquiry. Zero medical claims made.",
    searchIntent: "Commercial B2B / Botanical Inquiry",
    isRestricted: true,
  },
};

/**
 * Returns product-first SEO metadata for a given slug.
 * If the product is not in the predefined registry, safely falls back to a clean,
 * product-first title and sanitized description.
 */
export function getProductSeoData(
  slug: string,
  productName?: string,
  defaultDesc?: string
): ProductSeoEntry {
  const normalizedSlug = slug.trim().toLowerCase();
  const entry = PRODUCT_SEO_REGISTRY[normalizedSlug];

  if (entry) {
    return entry;
  }

  const name = productName || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const cleanDesc =
    defaultDesc && defaultDesc.trim().length > 20
      ? defaultDesc.length > 157
        ? `${defaultDesc.slice(0, 154)}...`
        : defaultDesc
      : `Pure solar-dehydrated ${name.toLowerCase()} prepared with care by Nela Kranthi Naturals. Free from artificial colors, flavors, and preservatives.`;

  return {
    slug: normalizedSlug,
    name,
    category: "Natural Foods",
    primaryKeyword: name,
    secondaryKeyword: "Natural Dehydrated Powder",
    seoTitle: `${name} – Natural Solar Dehydrated Powder | Nela Kranthi Naturals`,
    metaDescription: cleanDesc,
    searchIntent: "Culinary & Dietary",
    isRestricted: isComplianceRestricted(normalizedSlug),
  };
}

/**
 * Resolves accurate, accessible, and SEO-friendly image alt text for a product.
 *
 * Rules:
 * 1. If an explicit verified image description exists in the SEO registry, return it.
 * 2. If no verified image description is registered, construct a non-repetitive, category-aware description:
 *    - Flower & Petal items (e.g. dried petals): "${product.name} - Solar-Dried Botanical Petals"
 *    - Items with "powder" already in the name: "${product.name} - Natural Solar Dehydrated"
 *    - Flakes or dehydrated culinary food forms: "${product.name} - Natural Solar-Dehydrated Food"
 *    - General items: "${product.name} - Solar-Dehydrated Natural Food"
 * 3. Eliminates repetitive patterns like "Banana Powder - Solar Dehydrated Powder".
 * 4. Strictly avoids unverified medical, therapeutic, organic, or chemical claims.
 */
export function getProductImageAlt(product: {
  slug?: string;
  name: string;
  category?: string;
}): string {
  const normalizedSlug = product.slug?.toLowerCase().trim();

  // 1. Check verified photography registry
  if (normalizedSlug && PRODUCT_SEO_REGISTRY[normalizedSlug]?.imageAlt) {
    return PRODUCT_SEO_REGISTRY[normalizedSlug].imageAlt!;
  }

  const name = product.name.trim();
  const lowerName = name.toLowerCase();
  const category =
    product.category ||
    (normalizedSlug ? PRODUCT_SEO_REGISTRY[normalizedSlug]?.category : "");

  // 2. Category-aware handling for flower & petal products (dried petals, whole petals)
  if (
    category === "Flower & Petal Products" ||
    lowerName.includes("petal") ||
    lowerName.includes("flower")
  ) {
    return `${name} - Solar-Dried Botanical Petals`;
  }

  // 3. Dehydrated food flakes or non-powder culinary forms
  if (lowerName.includes("flakes") || category === "Dehydrated Foods") {
    return `${name} - Natural Solar-Dehydrated Food`;
  }

  // 4. Products already containing "powder" in name (avoid repetitive "Powder ... Powder")
  if (lowerName.includes("powder")) {
    return `${name} - Natural Solar Dehydrated`;
  }

  // 5. Default natural food fallback
  return `${name} - Solar-Dehydrated Natural Food`;
}

/**
 * Builds Schema.org Product structured data for an active catalogue item.
 *
 * GOOGLE SEARCH GUIDELINE COMPLIANCE:
 * - Includes verified @context, @type, name, description, brand, category, sku, and url.
 * - Image URL included if valid remote or absolute URL is available.
 * - Does NOT include fabricated offers (prices, currency) or fabricated review/rating scores.
 */
export function buildProductJsonLd(product: Product, siteUrl?: string) {
  const baseUrl = (siteUrl || SITE_CONTACT.siteUrl).replace(/\/$/, "");
  const seoData = getProductSeoData(product.slug, product.name, product.shortDescription);

  const productUrl = `${baseUrl}/products/${product.slug}`;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: seoData.metaDescription || product.shortDescription || product.description,
    url: productUrl,
    sku: product.slug,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: SITE_CONTACT.brandName,
    },
  };

  // Add image only if a valid resolved image URL is present
  if (product.image && typeof product.image === "string" && product.image.trim()) {
    const img = product.image.trim();
    if (img.startsWith("http://") || img.startsWith("https://")) {
      jsonLd.image = img;
    } else if (img.startsWith("/")) {
      jsonLd.image = `${baseUrl}${img}`;
    }
  }

  return jsonLd;
}

/**
 * Builds Schema.org BreadcrumbList structured data for product detail page.
 */
export function buildProductBreadcrumbJsonLd(product: Product, siteUrl?: string) {
  const baseUrl = (siteUrl || SITE_CONTACT.siteUrl).replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${baseUrl}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${baseUrl}/products/${product.slug}`,
      },
    ],
  };
}

