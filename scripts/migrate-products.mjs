import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Read environment variables from .env.local
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, "utf-8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...values] = trimmed.split("=");
    env[key.trim()] = values.join("=").trim();
  }
  return env;
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
// Prefer service-role key for administrative migration if provided, otherwise fallback to anon key
const supabaseKey =
  env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Exact 8 products from data/products.ts mapped to Supabase columns
const productsToMigrate = [
  {
    name: "Banana Powder",
    slug: "banana-powder",
    category: "Fruit Powders",
    description:
      "Our Banana Powder is prepared from handpicked, mature green bananas harvested around Sydapuram and processed under hygienic solar dehydration units. Completely free of added sugars, preservatives, or artificial colors. Perfect for baby foods, health smoothies, porridge, and baking.",
    image_url: "/images/products/banana-powder.jpg",
    unit: "100g / 250g / 500g",
    is_active: true,
  },
  {
    name: "Papaya Powder",
    slug: "papaya-powder",
    category: "Fruit Powders",
    description:
      "Produced from farm-fresh ripe papayas solar-dehydrated at controlled temperatures to preserve delicate phytonutrients and natural enzymes. Excellent for digestive wellness drinks, natural seasonings, smoothies, and herbal cosmetic formulations.",
    image_url: "/images/products/papaya-powder.jpg",
    unit: "100g / 250g / 500g",
    is_active: true,
  },
  {
    name: "Mango Powder",
    slug: "mango-powder",
    category: "Fruit Powders",
    description:
      "Capturing the rich flavor of regional Nellore mangoes, our pure solar-dehydrated mango powder offers concentrated tropical taste and aroma. Widely used for culinary dishes, curries, mocktails, desserts, and confectionery.",
    image_url: "/images/products/mango-powder.jpg",
    unit: "100g / 250g / 500g",
    is_active: true,
  },
  {
    name: "Pineapple Powder",
    slug: "pineapple-powder",
    category: "Fruit Powders",
    description:
      "Fresh pineapples are sliced, hygienically dried in solar dehydrators, and micro-milled into a fine, aromatic powder. Contains no anti-caking agents or chemicals. Ideal for beverages, seasonings, marinades, and health blends.",
    image_url: "/images/products/pineapple-powder.jpg",
    unit: "100g / 250g / 500g",
    is_active: true,
  },
  {
    name: "Lemon Powder",
    slug: "lemon-powder",
    category: "Fruit Powders",
    description:
      "Processed from wholesome whole lemons including the nutrient-dense rind and pulp. Provides an instant burst of natural acidity, bioflavonoids, and vitamin C. Great for instant lemonades, teas, dry rubs, and baking.",
    image_url: "/images/products/lemon-powder.jpg",
    unit: "100g / 250g / 500g",
    is_active: true,
  },
  {
    name: "Moringa Powder",
    slug: "moringa-powder",
    category: "Leaf Powders",
    description:
      "Regarded as the 'Miracle Tree', our Moringa leaf powder is sourced from organically grown trees in Sydapuram. The tender leaves are washed with pure water, solar-dehydrated to preserve the rich chlorophyll, and stone-ground. Ideal for daily immunity, morning herbal tea, or mixing with warm water and soups.",
    image_url: "/images/products/moringa-powder.jpg",
    unit: "100g / 250g / 500g",
    is_active: true,
  },
  {
    name: "Curry Leaves Powder",
    slug: "curry-leaves-powder",
    category: "Leaf Powders",
    description:
      "Freshly plucked aromatic curry leaves gently dehydrated to maintain their potent essential oils and deep color. A traditional South Indian staple known for promoting healthy hair, digestion, and iron intake. Perfect for mixing with rice, ghee, podis, and daily cooking.",
    image_url: "/images/products/curry-leaves-powder.jpg",
    unit: "100g / 250g / 500g",
    is_active: true,
  },
  {
    name: "Ladyfinger / Okra Powder",
    slug: "okra-powder",
    category: "Vegetable Powders",
    description:
      "Selected tender ladyfingers (bhendi) are thoroughly cleaned, sliced, and solar-dehydrated under strict hygiene. Rich in natural polyphenols, folate, and soluble fibers. Widely consumed as a wellness supplement and culinary thickening agent.",
    image_url: "/images/products/okra-powder.jpg",
    unit: "100g / 250g / 500g",
    is_active: true,
  },
];

async function migrate() {
  console.log("Starting product migration...");
  console.log(`Local products count: ${productsToMigrate.length}`);

  // 1. Check existing records in Supabase
  const { data: existingRows, error: fetchError } = await supabase
    .from("products")
    .select("id, name, slug");

  if (fetchError) {
    console.error("Error querying public.products:", fetchError);
    return;
  }

  const existingSlugs = new Set((existingRows || []).map((r) => r.slug));
  console.log(`Existing products in Supabase: ${existingSlugs.size}`);

  const toInsert = productsToMigrate.filter((p) => !existingSlugs.has(p.slug));

  if (toInsert.length === 0) {
    console.log("All products already exist in Supabase. No duplicates inserted.");
    return;
  }

  console.log(`Inserting ${toInsert.length} new products into Supabase...`);
  const { data: inserted, error: insertError } = await supabase
    .from("products")
    .insert(toInsert)
    .select();

  if (insertError) {
    console.error("Migration failed:", insertError);
    return;
  }

  console.log(`Successfully migrated ${inserted.length} products to Supabase.`);
}

migrate();
