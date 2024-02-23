export interface Product {
  id?: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  inStock: number;
  minStock: number;
  maxStock: number;
}
