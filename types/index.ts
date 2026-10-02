export type ProductCategory =
  | "Fruit Powders"
  | "Leaf Powders"
  | "Vegetable Powders"
  | "Dehydrated Foods";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  image: string;
  unit: string;
  available: boolean;
}
