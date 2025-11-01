export interface Product {
  id: number;
  name: string;
  pricePerUnit: number;
  unit: string;
  color: string;
  image?: string;
  categoryId: number;
  categoryName: string;
}
