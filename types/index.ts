export type ProductCategory =
  | "Leaf Powders"
  | "Flower & Petal Products"
  | "Fruit Powders"
  | "Vegetable Powders"
  | "Roots, Spices & Specialty Botanicals"
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
