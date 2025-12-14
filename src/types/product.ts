// src/types/product.ts

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  sizes: {
    size: string;
    stock: number;
  }[];
  isNew?: boolean;
}

// AGREGA ESTO AL FINAL DEL ARCHIVO:
export interface CartItem extends Product {
  quantity: number;
  selectedSize: string; // Necesario para saber qué talla eligió
}