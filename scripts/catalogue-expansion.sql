-- ==============================================================================
-- NELA KRANTHI NATURALS — CATALOGUE EXPANSION: 23 UNPUBLISHED DRAFTS
-- ==============================================================================
-- Migration Identifier: catalogue-expansion-23-drafts
-- Description: Inserts 23 newly proposed products as unpublished drafts (is_active = false).
--
-- Safety Guarantees:
-- 1. Idempotent: Uses ON CONFLICT (slug) DO NOTHING. Safe to re-run.
-- 2. Non-destructive: Does NOT update, rename, or overwrite any existing records.
-- 3. Inactive by default: is_active = false ensures zero exposure on the public site
--    or sitemap under PostgreSQL Row Level Security (RLS).
-- 4. Clean Database Footprint: Does NOT create unnecessary tracking tables in public.
-- 5. Audit Logging: Uses RETURNING id, slug, name, category, is_active, created_at
--    so the Supabase SQL Editor immediately displays the exact generated UUIDs.
--    Copy these UUIDs for records or for rollback verification.
--
-- DO NOT RUN AGAINST PRODUCTION WITHOUT EXPLICIT ADMINISTRATIVE APPROVAL.
-- ==============================================================================

INSERT INTO public.products (
  name,
  slug,
  category,
  description,
  image_url,
  unit,
  is_active
)
VALUES
  -- --------------------------------------------------------------------------
  -- Category 1: Leaf Powders (6 New Drafts)
  -- --------------------------------------------------------------------------
  (
    'Guava Leaf Powder',
    'guava-leaf-powder',
    'Leaf Powders',
    'Botanical powder prepared from the leaves of the guava tree (Psidium guajava). Dehydrated and milled for botanical and culinary applications. Technical specifications, sourcing origins, and composition testing are currently under review prior to commercial release.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Papaya Leaf Powder',
    'papaya-leaf-powder',
    'Leaf Powders',
    'Botanical powder prepared from the leaves of the Carica papaya plant. Distinct from ripe papaya fruit powder. Product grade, intended use, and regulatory classification are under review prior to commercial release. No medicinal, therapeutic, or health claims are made.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Jamun Leaf Powder',
    'jamun-leaf-powder',
    'Leaf Powders',
    'Botanical powder prepared from the leaves of the Java plum tree (Syzygium cumini). Distinct from jamun fruit or seed products. Permitted usage, product specifications, and regulatory classification are undergoing evaluation prior to commercial release.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Neem Leaf Powder',
    'neem-leaf-powder',
    'Leaf Powders',
    'Botanical powder prepared from the leaves of the Indian neem tree (Azadirachta indica). Intended classification (topical, cosmetic, or food-grade) and applicable standards are undergoing formal review prior to commercial listing. No therapeutic claims are made.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Gongura Leaf Powder',
    'gongura-leaf-powder',
    'Leaf Powders',
    'Dehydrated powder prepared from gongura leaves (Hibiscus sabdariffa / Hibiscus cannabinus). Intended for culinary and seasoning formulations. Final sourcing details, moisture specifications, and packaging grades are under review.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Mint Leaf Powder',
    'mint-leaf-powder',
    'Leaf Powders',
    'Milled powder prepared from dehydrated mint leaves (Mentha). Intended for culinary seasoning and beverage formulation. Processing parameters, volatile content specifications, and sourcing verification are currently under review.',
    NULL,
    '100g / 250g / 500g',
    false
  ),

  -- --------------------------------------------------------------------------
  -- Category 2: Flower & Petal Products (2 New Drafts — strictly non-powder)
  -- --------------------------------------------------------------------------
  (
    'Desi Gulabi Rose Petals (Dried)',
    'desi-gulabi-rose-petals-dried',
    'Flower & Petal Products',
    'Whole dried flower petals of the Desi Gulabi rose (Rosa). These are whole dried petals, not a milled powder. Food-grade versus decorative/cosmetic grading, processing standards, and packaging requirements are undergoing review.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Marigold Petals (Dried)',
    'marigold-petals-dried',
    'Flower & Petal Products',
    'Whole dried flower petals of marigold (Tagetes). These are whole dried petals, not a powder. Product classification (external, cosmetic, decorative, or food-grade infusion) and technical specifications are undergoing review prior to commercial release.',
    NULL,
    '100g / 250g / 500g',
    false
  ),

  -- --------------------------------------------------------------------------
  -- Category 3: Fruit Powders (4 New Drafts)
  -- --------------------------------------------------------------------------
  (
    'Dragon Fruit Powder',
    'dragon-fruit-powder',
    'Fruit Powders',
    'Powder prepared from dehydrated dragon fruit (pitaya / Hylocereus). Intended as a food ingredient and culinary colorant. Ingredient purity verification, moisture parameters, and carrier/anti-caking status are pending final lab confirmation.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Orange Powder',
    'orange-powder',
    'Fruit Powders',
    'Powder prepared from dehydrated oranges (Citrus sinensis). Intended for culinary and beverage formulations. Fruit part composition (pulp, juice, peel ratio), processing method, and additive-free verification are under review.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Amla Powder',
    'amla-powder',
    'Fruit Powders',
    'Powder prepared from dehydrated Indian gooseberry fruit (Phyllanthus emblica). Intended for culinary and dietary formulations. Deseeding verification, sulfite-free certification, and technical specifications are pending confirmation.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Apple Powder',
    'apple-powder',
    'Fruit Powders',
    'Powder prepared from dehydrated apples (Malus domestica). Intended for culinary, bakery, and confectionery applications. Cultivar composition, coring standards, and sulfur dioxide testing are pending confirmation.',
    NULL,
    '100g / 250g / 500g',
    false
  ),

  -- --------------------------------------------------------------------------
  -- Category 4: Vegetable Powders (8 New Drafts)
  -- --------------------------------------------------------------------------
  (
    'Tomato Powder',
    'tomato-powder',
    'Vegetable Powders',
    'Powder prepared from dehydrated ripe tomatoes (Solanum lycopersicum). Intended for culinary seasonings, soups, and food manufacturing. Moisture limits, flowability specifications, and additive status are under review.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Onion Powder',
    'onion-powder',
    'Vegetable Powders',
    'Powder prepared from dehydrated onions (Allium cepa). Intended for culinary seasonings and food preparation. Sourcing origin, pungency grade, and anti-caking agent status are pending final specification.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Carrot Powder',
    'carrot-powder',
    'Vegetable Powders',
    'Powder prepared from dehydrated carrots (Daucus carota). Intended for general culinary seasonings and food processing. Sourcing origin, microbial testing, and application standards are under review prior to commercial release.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Beetroot Powder',
    'beetroot-powder',
    'Vegetable Powders',
    'Powder prepared from dehydrated beetroots (Beta vulgaris). Intended for culinary formulations and natural food coloring. Betalain standardization, moisture content, and additive verification are undergoing review.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Bitter Gourd Powder',
    'bitter-gourd-powder',
    'Vegetable Powders',
    'Powder prepared from dehydrated bitter gourd (Momordica charantia). Intended solely as a traditional culinary vegetable ingredient. No medicinal, hypoglycemic, or therapeutic claims are made. Technical specifications are under review.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Drumstick Pod Powder',
    'drumstick-pod-powder',
    'Vegetable Powders',
    'Powder prepared from dehydrated drumstick pods (Moringa oleifera fruit pods). Distinct from Moringa leaf powder. Intended for culinary seasonings and soup bases. Regional sourcing verification and fiber specifications are under review.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Brinjal (Eggplant) Powder',
    'brinjal-eggplant-powder',
    'Vegetable Powders',
    'Powder prepared from dehydrated brinjal/eggplant (Solanum melongena). Intended for food processing and culinary formulations. Varietal selection, processing methods, and additive-free verification are undergoing confirmation.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Green Chilli Powder',
    'green-chilli-powder',
    'Vegetable Powders',
    'Powder prepared from dehydrated green chillies (Capsicum annuum). Intended for culinary seasoning and spice blends. Capsaicin heat rating, salt/additive content verification, and sourcing origin are pending laboratory confirmation.',
    NULL,
    '100g / 250g / 500g',
    false
  ),

  -- --------------------------------------------------------------------------
  -- Category 5: Roots, Spices & Specialty Botanicals (3 New Drafts)
  -- --------------------------------------------------------------------------
  (
    'Ginger Powder',
    'ginger-powder',
    'Roots, Spices & Specialty Botanicals',
    'Spice powder prepared from dehydrated ginger rhizomes (Zingiber officinale). Intended for culinary and spice blending applications. Gingerol content, anti-caking status, and starch testing are pending laboratory verification.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Garlic Powder',
    'garlic-powder',
    'Roots, Spices & Specialty Botanicals',
    'Spice powder prepared from dehydrated garlic cloves (Allium sativum). Intended for culinary seasonings and savoury blends. Moisture limits, allicin retention specifications, and additive-free confirmation are under review.',
    NULL,
    '100g / 250g / 500g',
    false
  ),
  (
    'Safed Musli Root Powder',
    'safed-musli-root-powder',
    'Roots, Spices & Specialty Botanicals',
    'Botanical powder prepared from the roots of Chlorophytum borivilianum. Specialty traditional botanical, distinct from general food spices. Regulatory classification, permitted usage guidelines, and purity specifications are undergoing review prior to commercial release. No health or therapeutic claims are made.',
    NULL,
    '100g / 250g / 500g',
    false
  )
ON CONFLICT (slug) DO NOTHING
RETURNING id, slug, name, category, is_active, created_at;
