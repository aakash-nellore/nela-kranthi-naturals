import { Product, ProductCategory } from "@/types";

export const CATEGORIES: (ProductCategory | "All")[] = [
  "All",
  "Leaf Powders",
  "Flower & Petal Products",
  "Fruit Powders",
  "Vegetable Powders",
  "Roots, Spices & Specialty Botanicals",
  "Dehydrated Foods",
];

export const products: Product[] = [
  // --------------------------------------------------------------------------
  // Core Initial Catalogue (8 Products with Photography)
  // --------------------------------------------------------------------------
  {
    id: "prod-001",
    name: "Banana Powder",
    slug: "banana-powder",
    category: "Fruit Powders",
    shortDescription:
      "Pure raw banana powder made from carefully selected farm bananas. Rich in dietary fiber.",
    description:
      "Our Banana Powder is prepared from handpicked, mature green bananas and processed under hygienic solar dehydration units. Prepared without added sugars, artificial colors, or artificial additives. Perfect for baby foods, health smoothies, porridge, and baking.",
    image: "https://xtrrbslwndowgwuzxghf.supabase.co/storage/v1/object/public/product-images/Banana-Flour-550x550.webp",
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
    image: "https://xtrrbslwndowgwuzxghf.supabase.co/storage/v1/object/public/product-images/Pappaya.jpg",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-003",
    name: "Mango Powder",
    slug: "mango-powder",
    category: "Fruit Powders",
    shortDescription:
      "Pure solar-dehydrated mango powder bursting with authentic sweet and tangy regional mango notes. Zero artificial flavouring.",
    description:
      "Capturing the rich flavor of regional mangoes, our pure solar-dehydrated mango powder offers concentrated tropical taste and aroma. Widely used for culinary dishes, curries, mocktails, desserts, and confectionery.",
    image: "https://xtrrbslwndowgwuzxghf.supabase.co/storage/v1/object/public/product-images/Mango.jpg",
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
    image: "https://xtrrbslwndowgwuzxghf.supabase.co/storage/v1/object/public/product-images/Pineapple.jpg",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-005",
    name: "Lemon Powder",
    slug: "lemon-powder",
    category: "Fruit Powders",
    shortDescription:
      "Zesty, vitamin C-packed whole lemon powder made from renowned citrus groves.",
    description:
      "Processed from wholesome whole lemons including the nutrient-dense rind and pulp. Provides an instant burst of natural acidity, bioflavonoids, and vitamin C. Great for instant lemonades, teas, dry rubs, and baking.",
    image: "https://xtrrbslwndowgwuzxghf.supabase.co/storage/v1/object/public/product-images/Lemon.jpg",
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
      "Regarded as the 'Miracle Tree', our Moringa leaf powder is sourced from regional trees. The tender leaves are washed with pure water, solar-dehydrated to preserve the rich chlorophyll, and stone-ground. Ideal for daily wellness, morning herbal tea, or mixing with warm water and soups.",
    image: "https://xtrrbslwndowgwuzxghf.supabase.co/storage/v1/object/public/product-images/WhatsApp%20Image%202026-10-03%20at%201.56.22%20AM.jpeg",
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
      "Freshly plucked aromatic curry leaves gently dehydrated to maintain their potent essential oils and deep color. A traditional staple known for authentic aroma and flavor. Perfect for mixing with rice, ghee, podis, and daily cooking.",
    image: "https://xtrrbslwndowgwuzxghf.supabase.co/storage/v1/object/public/product-images/Curry%20leaf.jpg",
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
    image: "https://xtrrbslwndowgwuzxghf.supabase.co/storage/v1/object/public/product-images/Ladysfinger.jpg",
    unit: "100g / 250g / 500g",
    available: true,
  },

  // --------------------------------------------------------------------------
  // Category 1: Leaf Powders (6 Products)
  // --------------------------------------------------------------------------
  {
    id: "prod-009",
    name: "Guava Leaf Powder",
    slug: "guava-leaf-powder",
    category: "Leaf Powders",
    shortDescription:
      "Botanical powder prepared from dehydrated guava leaves (Psidium guajava) for infusions and extracts.",
    description:
      "Botanical powder prepared from the leaves of the guava tree (Psidium guajava). Dehydrated and milled for botanical, herbal infusion, and culinary applications. Contains zero additives or preservatives.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-010",
    name: "Papaya Leaf Powder",
    slug: "papaya-leaf-powder",
    category: "Leaf Powders",
    shortDescription:
      "Botanical powder prepared from dehydrated Carica papaya foliage. Commercial inquiry only.",
    description:
      "Botanical powder prepared from the leaves of the Carica papaya plant. Distinct from ripe papaya fruit powder. Offered for technical specification review, commercial inquiry, and formulation research. No therapeutic or medicinal claims are made.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isComplianceRestricted: true,
    complianceStatus: "under_review",
  },
  {
    id: "prod-011",
    name: "Jamun Leaf Powder",
    slug: "jamun-leaf-powder",
    category: "Leaf Powders",
    shortDescription:
      "Dehydrated Syzygium cumini foliage powder. Commercial botanical inquiry only.",
    description:
      "Botanical powder prepared from the foliage of the Java plum tree (Syzygium cumini). Distinct from jamun fruit or seed products. Catalogued for technical specification review and commercial inquiry. No medicinal or therapeutic claims are made.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isComplianceRestricted: true,
    complianceStatus: "under_review",
  },
  {
    id: "prod-012",
    name: "Neem Leaf Powder",
    slug: "neem-leaf-powder",
    category: "Leaf Powders",
    shortDescription:
      "Dehydrated Azadirachta indica foliage powder. Commercial botanical inquiry only.",
    description:
      "Botanical powder prepared from the leaves of the Indian neem tree (Azadirachta indica). Intended for technical review, topical formulation, and commercial inquiry. Not offered for retail food consumption. Zero therapeutic claims are made.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isComplianceRestricted: true,
    complianceStatus: "under_review",
  },
  {
    id: "prod-013",
    name: "Gongura Leaf Powder",
    slug: "gongura-leaf-powder",
    category: "Leaf Powders",
    shortDescription:
      "Dehydrated gongura (Hibiscus sabdariffa) leaf powder for traditional culinary formulations.",
    description:
      "Dehydrated powder prepared from gongura leaves (Hibiscus sabdariffa). A traditional culinary staple known for its distinctive tangy taste. Excellent for dal preparations, spice powders, and seasoning blends.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-014",
    name: "Mint Leaf Powder",
    slug: "mint-leaf-powder",
    category: "Leaf Powders",
    shortDescription:
      "Milled powder prepared from dehydrated mint leaves (Mentha) for beverages and seasonings.",
    description:
      "Milled powder prepared from dehydrated mint leaves (Mentha). Retains refreshing natural aroma. Intended for culinary seasoning, raita blends, chutneys, and beverage formulations.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },

  // --------------------------------------------------------------------------
  // Category 2: Flower & Petal Products (2 Products — strictly non-powder)
  // --------------------------------------------------------------------------
  {
    id: "prod-015",
    name: "Desi Gulabi Rose Petals (Dried)",
    slug: "desi-gulabi-rose-petals-dried",
    category: "Flower & Petal Products",
    shortDescription:
      "Whole dried Desi Gulabi rose petals (Rosa). Non-powder whole dried floral petals.",
    description:
      "Whole dried flower petals of the Desi Gulabi rose (Rosa). These are whole dried petals, not a milled powder. Retains natural fragrance and color. Ideal for traditional gulkand, herbal tea infusions, confectionery, and culinary garnish.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-016",
    name: "Marigold Petals (Dried)",
    slug: "marigold-petals-dried",
    category: "Flower & Petal Products",
    shortDescription:
      "Whole dried marigold flower petals (Tagetes). Commercial inquiry and technical review.",
    description:
      "Whole dried flower petals of marigold (Tagetes). These are whole dried petals, not a powder. Catalogued for technical specification review, natural color extraction, and commercial inquiry. No medical claims are made.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isComplianceRestricted: true,
    complianceStatus: "under_review",
  },

  // --------------------------------------------------------------------------
  // Category 3: Fruit Powders (4 Products)
  // --------------------------------------------------------------------------
  {
    id: "prod-017",
    name: "Dragon Fruit Powder",
    slug: "dragon-fruit-powder",
    category: "Fruit Powders",
    shortDescription:
      "Pure powder prepared from dehydrated red dragon fruit (pitaya). Vibrant natural colorant.",
    description:
      "Powder prepared from dehydrated dragon fruit (pitaya / Hylocereus). Free from synthetic dyes, carriers, and additives. Perfect as a natural food colorant, smoothie booster, and dessert ingredient.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-018",
    name: "Orange Powder",
    slug: "orange-powder",
    category: "Fruit Powders",
    shortDescription:
      "Zesty fruit powder prepared from dehydrated oranges (Citrus sinensis) for baking and beverages.",
    description:
      "Powder prepared from dehydrated oranges (Citrus sinensis). Offers authentic citrus aroma and sweet-tangy flavor. Widely used for bakery items, confectionery, drink mixes, and marinades.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-019",
    name: "Amla Powder",
    slug: "amla-powder",
    category: "Fruit Powders",
    shortDescription:
      "Dehydrated Indian gooseberry fruit powder (Phyllanthus emblica). Pure and deseeded.",
    description:
      "Powder prepared from dehydrated Indian gooseberries (Phyllanthus emblica). Deseeded and milled under strict hygienic controls. Ideal for daily dietary intake, herbal teas, and traditional preparations.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-020",
    name: "Apple Powder",
    slug: "apple-powder",
    category: "Fruit Powders",
    shortDescription:
      "Pure dehydrated apple powder (Malus domestica) for bakery, cereal, and confectionery.",
    description:
      "Powder prepared from carefully cored and dehydrated apples (Malus domestica). Free from sulfur dioxide and artificial sweeteners. Ideal for baby cereals, baking mixes, granola, and oatmeal flavoring.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },

  // --------------------------------------------------------------------------
  // Category 4: Vegetable Powders (8 Products)
  // --------------------------------------------------------------------------
  {
    id: "prod-021",
    name: "Tomato Powder",
    slug: "tomato-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Dehydrated tomato powder (Solanum lycopersicum) for seasonings, soups, and culinary bases.",
    description:
      "Powder prepared from dehydrated ripe tomatoes (Solanum lycopersicum). Retains natural umami and acidity without added salts or artificial preservatives. Excellent for instant soups, pasta sauces, snack seasonings, and marinades.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-022",
    name: "Onion Powder",
    slug: "onion-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Pure dehydrated onion powder (Allium cepa) providing rich savory aroma and flavor.",
    description:
      "Powder prepared from dehydrated onions (Allium cepa). Contains no anti-caking additives or fillers. A versatile culinary seasoning for gravies, spice rubs, soups, and dry snack coatings.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-023",
    name: "Carrot Powder",
    slug: "carrot-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Dehydrated carrot powder (Daucus carota) rich in natural color and sweetness.",
    description:
      "Powder prepared from dehydrated fresh carrots (Daucus carota). Retains natural beta-carotene and gentle sweet vegetable notes. Ideal for baked goods, soups, baby foods, and natural pasta coloring.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-024",
    name: "Beetroot Powder",
    slug: "beetroot-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Dehydrated beetroot powder (Beta vulgaris) for natural coloring and culinary nutrition.",
    description:
      "Powder prepared from dehydrated red beetroots (Beta vulgaris). Highly prized as a vibrant natural red/magenta colorant and nutrient-rich addition for smoothies, red velvet bakery items, and seasonings.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-025",
    name: "Bitter Gourd Powder",
    slug: "bitter-gourd-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Dehydrated bitter gourd powder (Momordica charantia) for traditional culinary use.",
    description:
      "Powder prepared from dehydrated bitter gourd (karela / Momordica charantia). Intended solely as a traditional culinary vegetable ingredient and soup seasoning. No medicinal or blood sugar claims are made.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-026",
    name: "Drumstick Pod Powder",
    slug: "drumstick-pod-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Dehydrated drumstick pod powder (Moringa oleifera fruit pods). Distinct from leaf powder.",
    description:
      "Powder prepared from dehydrated tender drumstick vegetable pods (Moringa oleifera fruit pods). Distinct from Moringa leaf powder. Imparts authentic regional flavor to sambar, curries, and vegetable soup bases.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-027",
    name: "Brinjal (Eggplant) Powder",
    slug: "brinjal-eggplant-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Dehydrated brinjal powder (Solanum melongena) for culinary thickening and food formulations.",
    description:
      "Powder prepared from dehydrated tender brinjal/eggplant (Solanum melongena). Used in food processing, instant gravy bases, and regional vegetable seasoning formulations.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-028",
    name: "Green Chilli Powder",
    slug: "green-chilli-powder",
    category: "Vegetable Powders",
    shortDescription:
      "Pungent dehydrated green chilli powder (Capsicum annuum) for spice blends and seasonings.",
    description:
      "Powder prepared from solar-dehydrated green chillies (Capsicum annuum). Delivers authentic sharp green chilli heat without artificial additives. Perfect for dry rubs, snack seasonings, and spice blends.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },

  // --------------------------------------------------------------------------
  // Category 5: Roots, Spices & Specialty Botanicals (3 Products)
  // --------------------------------------------------------------------------
  {
    id: "prod-029",
    name: "Ginger Powder",
    slug: "ginger-powder",
    category: "Roots, Spices & Specialty Botanicals",
    shortDescription:
      "Aromatic dehydrated ginger rhizome powder (Zingiber officinale) for culinary and beverage use.",
    description:
      "Spice powder prepared from dehydrated ginger rhizomes (Zingiber officinale). Unbleached and free from synthetic anti-caking agents. Essential for tea masalas, baked gingerbread, curries, and confectionery.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-030",
    name: "Garlic Powder",
    slug: "garlic-powder",
    category: "Roots, Spices & Specialty Botanicals",
    shortDescription:
      "Pungent dehydrated garlic clove powder (Allium sativum) for savory seasonings and cooking.",
    description:
      "Spice powder prepared from dehydrated garlic cloves (Allium sativum). Free from artificial flavors and fillers. Excellent for spice rubs, sauces, garlic breads, and instant culinary mixes.",
    image: "",
    unit: "100g / 250g / 500g",
    available: true,
  },
  {
    id: "prod-031",
    name: "Safed Musli Root Powder",
    slug: "safed-musli-root-powder",
    category: "Roots, Spices & Specialty Botanicals",
    shortDescription:
      "Dehydrated Chlorophytum borivilianum root powder. Specialty botanical; commercial enquiry only.",
    description:
      "Botanical powder prepared from the roots of Chlorophytum borivilianum. Specialty traditional botanical, distinct from general food spices. Offered strictly for technical specification review and commercial inquiry. No therapeutic or health claims are made.",
    image: "",
    unit: "100g / 250g / 500g",
    available: false,
    isComplianceRestricted: true,
    complianceStatus: "under_review",
  },
];

/**
 * Helper to fetch all available products
 */
export function getAllProducts(): Product[] {
  return products.filter((p) => p.available && !p.isComplianceRestricted);
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
