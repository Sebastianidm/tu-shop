export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  sizes: string[];
  inStock: boolean;
  category: string;
  stockPerSize?: Record<string, number>;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}