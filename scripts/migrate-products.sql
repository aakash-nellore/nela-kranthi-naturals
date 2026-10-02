-- Migration: Insert existing 8 products into public.products
-- Avoids duplicates using ON CONFLICT (slug) DO NOTHING

INSERT INTO public.products (name, slug, category, description, image_url, unit, is_active)
VALUES
  (
    'Banana Powder',
    'banana-powder',
    'Fruit Powders',
    'Our Banana Powder is prepared from handpicked, mature green bananas harvested around Sydapuram and processed under hygienic solar dehydration units. Completely free of added sugars, preservatives, or artificial colors. Perfect for baby foods, health smoothies, porridge, and baking.',
    '/images/products/banana-powder.jpg',
    '100g / 250g / 500g',
    true
  ),
  (
    'Papaya Powder',
    'papaya-powder',
    'Fruit Powders',
    'Produced from farm-fresh ripe papayas solar-dehydrated at controlled temperatures to preserve delicate phytonutrients and natural enzymes. Excellent for digestive wellness drinks, natural seasonings, smoothies, and herbal cosmetic formulations.',
    '/images/products/papaya-powder.jpg',
    '100g / 250g / 500g',
    true
  ),
  (
    'Mango Powder',
    'mango-powder',
    'Fruit Powders',
    'Capturing the rich flavor of regional Nellore mangoes, our pure solar-dehydrated mango powder offers concentrated tropical taste and aroma. Widely used for culinary dishes, curries, mocktails, desserts, and confectionery.',
    '/images/products/mango-powder.jpg',
    '100g / 250g / 500g',
    true
  ),
  (
    'Pineapple Powder',
    'pineapple-powder',
    'Fruit Powders',
    'Fresh pineapples are sliced, hygienically dried in solar dehydrators, and micro-milled into a fine, aromatic powder. Contains no anti-caking agents or chemicals. Ideal for beverages, seasonings, marinades, and health blends.',
    '/images/products/pineapple-powder.jpg',
    '100g / 250g / 500g',
    true
  ),
  (
    'Lemon Powder',
    'lemon-powder',
    'Fruit Powders',
    'Processed from wholesome whole lemons including the nutrient-dense rind and pulp. Provides an instant burst of natural acidity, bioflavonoids, and vitamin C. Great for instant lemonades, teas, dry rubs, and baking.',
    '/images/products/lemon-powder.jpg',
    '100g / 250g / 500g',
    true
  ),
  (
    'Moringa Powder',
    'moringa-powder',
    'Leaf Powders',
    'Regarded as the ''Miracle Tree'', our Moringa leaf powder is sourced from organically grown trees in Sydapuram. The tender leaves are washed with pure water, solar-dehydrated to preserve the rich chlorophyll, and stone-ground. Ideal for daily immunity, morning herbal tea, or mixing with warm water and soups.',
    '/images/products/moringa-powder.jpg',
    '100g / 250g / 500g',
    true
  ),
  (
    'Curry Leaves Powder',
    'curry-leaves-powder',
    'Leaf Powders',
    'Freshly plucked aromatic curry leaves gently dehydrated to maintain their potent essential oils and deep color. A traditional South Indian staple known for promoting healthy hair, digestion, and iron intake. Perfect for mixing with rice, ghee, podis, and daily cooking.',
    '/images/products/curry-leaves-powder.jpg',
    '100g / 250g / 500g',
    true
  ),
  (
    'Ladyfinger / Okra Powder',
    'okra-powder',
    'Vegetable Powders',
    'Selected tender ladyfingers (bhendi) are thoroughly cleaned, sliced, and solar-dehydrated under strict hygiene. Rich in natural polyphenols, folate, and soluble fibers. Widely consumed as a wellness supplement and culinary thickening agent.',
    '/images/products/okra-powder.jpg',
    '100g / 250g / 500g',
    true
  )
ON CONFLICT (slug) DO NOTHING;
