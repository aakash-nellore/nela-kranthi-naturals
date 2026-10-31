import { ProductCategory } from "@/types";

export interface DraftProduct {
  name: string;
  slug: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  image: string;
  unit: string;
  available: boolean;
  isRegulatoryFlagged: boolean;
  regulatoryNotes?: string;
}

/**
 * 23 Proposed Catalogue Expansion Products
 * Prepared as unpublished drafts (available: false).
 * These records are isolated from the public storefront and public fallback arrays.
 * All descriptions are kept strictly neutral and factual pending laboratory
 * verification, technical specifications, and regulatory compliance review.
 */
export const DRAFT_PRODUCTS: DraftProduct[] = [
  // --------------------------------------------------------------------------
  // Category 1: Leaf Powders (6 New Drafts)
  // --------------------------------------------------------------------------
  {
    name: "Guava Leaf Powder",
    slug: "guava-leaf-powder",
    category: "Leaf Powders",
    shortDescription:
      "Botanical powder prepared from dehydrated guava leaves (Psidium guajava). Specifications under review.",
    description:
      "Botanical powder prepared from the leaves of the guava tree (Psidium guajava). Dehydrated and milled for botanical and culinary applications. Technical specifications, sourcing origins, and composition testing are currently under review prior to commercial release.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Papaya Leaf Powder",
    slug: "papaya-leaf-powder",
    category: "Leaf Powders",
    shortDescription:
      "Dehydrated Carica papaya leaf powder. Intended-use and regulatory review pending.",
    description:
      "Botanical powder prepared from the leaves of the Carica papaya plant. Distinct from ripe papaya fruit powder. Product grade, intended use, and regulatory classification are under review prior to commercial release. No medicinal, therapeutic, or health claims are made.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: true,
    regulatoryNotes:
      "Flagged for intended-use, safety and regulatory review. Distinct from Papaya Fruit Powder. Must not claim treatment of dengue or platelet disorders.",
  },
  {
    name: "Jamun Leaf Powder",
    slug: "jamun-leaf-powder",
    category: "Leaf Powders",
    shortDescription:
      "Dehydrated Syzygium cumini foliage powder. Intended-use and regulatory review pending.",
    description:
      "Botanical powder prepared from the leaves of the Java plum tree (Syzygium cumini). Distinct from jamun fruit or seed products. Permitted usage, product specifications, and regulatory classification are undergoing evaluation prior to commercial release.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: true,
    regulatoryNotes:
      "Flagged for intended-use and regulatory review. Distinct from Jamun fruit. Must omit anti-diabetic or blood-sugar curing claims.",
  },
  {
    name: "Neem Leaf Powder",
    slug: "neem-leaf-powder",
    category: "Leaf Powders",
    shortDescription:
      "Dehydrated Azadirachta indica leaf powder. Classification and compliance review pending.",
    description:
      "Botanical powder prepared from the leaves of the Indian neem tree (Azadirachta indica). Intended classification (topical, cosmetic, or food-grade) and applicable standards are undergoing formal review prior to commercial listing. No therapeutic claims are made.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: true,
    regulatoryNotes:
      "Flagged for intended-use, safety and regulatory review. Must clarify food-grade vs cosmetic/external use before internal consumption promotion.",
  },
  {
    name: "Gongura Leaf Powder",
    slug: "gongura-leaf-powder",
    category: "Leaf Powders",
    shortDescription:
      "Dehydrated gongura (Hibiscus sabdariffa) leaf powder for culinary formulations.",
    description:
      "Dehydrated powder prepared from gongura leaves (Hibiscus sabdariffa / Hibiscus cannabinus). Intended for culinary and seasoning formulations. Final sourcing details, moisture specifications, and packaging grades are under review.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Mint Leaf Powder",
    slug: "mint-leaf-powder",
    category: "Leaf Powders",
    shortDescription:
      "Milled powder prepared from dehydrated mint leaves (Mentha). Specifications under review.",
    description:
      "Milled powder prepared from dehydrated mint leaves (Mentha). Intended for culinary seasoning and beverage formulation. Processing parameters, volatile content specifications, and sourcing verification are currently under review.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },

  // --------------------------------------------------------------------------
  // Category 2: Flower & Petal Products (2 New Drafts — strictly non-powder)
  // --------------------------------------------------------------------------
  {
    name: "Desi Gulabi Rose Petals (Dried)",
    slug: "desi-gulabi-rose-petals-dried",
    category: "Flower & Petal Products",
    shortDescription:
      "Whole dried Desi Gulabi rose petals (Rosa). Non-powder botanical petal product.",
    description:
      "Whole dried flower petals of the Desi Gulabi rose (Rosa). These are whole dried petals, not a milled powder. Food-grade versus decorative/cosmetic grading, processing standards, and packaging requirements are undergoing review.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Marigold Petals (Dried)",
    slug: "marigold-petals-dried",
    category: "Flower & Petal Products",
    shortDescription:
      "Whole dried marigold flower petals (Tagetes). Intended-use review pending.",
    description:
      "Whole dried flower petals of marigold (Tagetes). These are whole dried petals, not a powder. Product classification (external, cosmetic, decorative, or food-grade infusion) and technical specifications are undergoing review prior to commercial release.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: true,
    regulatoryNotes:
      "Flagged for intended-use review. Must distinguish food-grade culinary/infusion petals from decorative/cosmetic cultivars before promoting as edible.",
  },

  // --------------------------------------------------------------------------
  // Category 3: Fruit Powders (4 New Drafts)
  // --------------------------------------------------------------------------
  {
    name: "Dragon Fruit Powder",
    slug: "dragon-fruit-powder",
    category: "Fruit Powders",
    shortDescription:
      "Powder prepared from dehydrated dragon fruit (pitaya). Purity and moisture testing pending.",
    description:
      "Powder prepared from dehydrated dragon fruit (pitaya / Hylocereus). Intended as a food ingredient and culinary colorant. Ingredient purity verification, moisture parameters, and carrier/anti-caking status are pending final lab confirmation.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Orange Powder",
    slug: "orange-powder",
    category: "Fruit Powders",
    shortDescription:
      "Powder prepared from dehydrated oranges (Citrus sinensis). Composition testing pending.",
    description:
      "Powder prepared from dehydrated oranges (Citrus sinensis). Intended for culinary and beverage formulations. Fruit part composition (pulp, juice, peel ratio), processing method, and additive-free verification are under review.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Amla Powder",
    slug: "amla-powder",
    category: "Fruit Powders",
    shortDescription:
      "Dehydrated Indian gooseberry fruit powder (Phyllanthus emblica). Specifications pending.",
    description:
      "Powder prepared from dehydrated Indian gooseberry fruit (Phyllanthus emblica). Intended for culinary and dietary formulations. Deseeding verification, sulfite-free certification, and technical specifications are pending confirmation.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Apple Powder",
    slug: "apple-powder",
    category: "Fruit Powders",
    shortDescription:
      "Dehydrated apple powder (Malus domestica). Processing parameters pending confirmation.",
    description:
      "Powder prepared from dehydrated apples (Malus domestica). Intended for culinary, bakery, and confectionery applications. Cultivar composition, coring standards, and sulfur dioxide testing are pending confirmation.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },

  // --------------------------------------------------------------------------
  // Category 4: Vegetable Powders (8 New Drafts)
  // --------------------------------------------------------------------------
  {
    name: "Tomato Powder",
    slug: "tomato-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Dehydrated tomato powder (Solanum lycopersicum). Moisture and additive limits under review.",
    description:
      "Powder prepared from dehydrated ripe tomatoes (Solanum lycopersicum). Intended for culinary seasonings, soups, and food manufacturing. Moisture limits, flowability specifications, and additive status are under review.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Onion Powder",
    slug: "onion-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Dehydrated onion powder (Allium cepa). Sourcing and pungency specifications pending.",
    description:
      "Powder prepared from dehydrated onions (Allium cepa). Intended for culinary seasonings and food preparation. Sourcing origin, pungency grade, and anti-caking agent status are pending final specification.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Carrot Powder",
    slug: "carrot-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Dehydrated carrot powder (Daucus carota). Microbial testing and standards under review.",
    description:
      "Powder prepared from dehydrated carrots (Daucus carota). Intended for general culinary seasonings and food processing. Sourcing origin, microbial testing, and application standards are under review prior to commercial release.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Beetroot Powder",
    slug: "beetroot-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Dehydrated beetroot powder (Beta vulgaris). Betalain and moisture testing pending.",
    description:
      "Powder prepared from dehydrated beetroots (Beta vulgaris). Intended for culinary formulations and natural food coloring. Betalain standardization, moisture content, and additive verification are undergoing review.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Bitter Gourd Powder",
    slug: "bitter-gourd-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Dehydrated bitter gourd powder (Momordica charantia). Solely for culinary use; no health claims.",
    description:
      "Powder prepared from dehydrated bitter gourd (Momordica charantia). Intended solely as a traditional culinary vegetable ingredient. No medicinal, hypoglycemic, or therapeutic claims are made. Technical specifications are under review.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Drumstick Pod Powder",
    slug: "drumstick-pod-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Dehydrated drumstick pod powder (Moringa oleifera fruit pods). Distinct from leaf powder.",
    description:
      "Powder prepared from dehydrated drumstick pods (Moringa oleifera fruit pods). Distinct from Moringa leaf powder. Intended for culinary seasonings and soup bases. Regional sourcing verification and fiber specifications are under review.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Brinjal (Eggplant) Powder",
    slug: "brinjal-eggplant-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Dehydrated brinjal powder (Solanum melongena). Processing specifications under review.",
    description:
      "Powder prepared from dehydrated brinjal/eggplant (Solanum melongena). Intended for food processing and culinary formulations. Varietal selection, processing methods, and additive-free verification are undergoing confirmation.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Green Chilli Powder",
    slug: "green-chilli-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Dehydrated green chilli powder (Capsicum annuum). Pungency and additive testing pending.",
    description:
      "Powder prepared from dehydrated green chillies (Capsicum annuum). Intended for culinary seasoning and spice blends. Capsaicin heat rating, salt/additive content verification, and sourcing origin are pending laboratory confirmation.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },

  // --------------------------------------------------------------------------
  // Category 5: Roots, Spices & Specialty Botanicals (3 New Drafts)
  // --------------------------------------------------------------------------
  {
    name: "Ginger Powder",
    slug: "ginger-powder",
    category: "Roots, Spices & Specialty Botanicals",
    shortDescription:
      "Dehydrated ginger rhizome powder (Zingiber officinale). Gingerol testing pending.",
    description:
      "Spice powder prepared from dehydrated ginger rhizomes (Zingiber officinale). Intended for culinary and spice blending applications. Gingerol content, anti-caking status, and starch testing are pending laboratory verification.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Garlic Powder",
    slug: "garlic-powder",
    category: "Roots, Spices & Specialty Botanicals",
    shortDescription:
      "Dehydrated garlic clove powder (Allium sativum). Allicin and additive testing pending.",
    description:
      "Spice powder prepared from dehydrated garlic cloves (Allium sativum). Intended for culinary seasonings and savoury blends. Moisture limits, allicin retention specifications, and additive-free confirmation are under review.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: false,
  },
  {
    name: "Safed Musli Root Powder",
    slug: "safed-musli-root-powder",
    category: "Roots, Spices & Specialty Botanicals",
    shortDescription:
      "Chlorophytum borivilianum root powder. Specialty botanical; regulatory classification pending.",
    description:
      "Botanical powder prepared from the roots of Chlorophytum borivilianum. Specialty traditional botanical, distinct from general food spices. Regulatory classification, permitted usage guidelines, and purity specifications are undergoing review prior to commercial release. No health or therapeutic claims are made.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isRegulatoryFlagged: true,
    regulatoryNotes:
      "Flagged for intended-use and regulatory review. Must not be marketed as a general food spice. Requires FSSAI Ayush/Nutraceutical compliance review.",
  },
];

/**
 * Returns all 23 draft products.
 */
export function getDraftProducts(): DraftProduct[] {
  return DRAFT_PRODUCTS;
}

/**
 * Returns draft product by slug.
 */
export function getDraftProductBySlug(slug: string): DraftProduct | undefined {
  return DRAFT_PRODUCTS.find((p) => p.slug === slug);
}
