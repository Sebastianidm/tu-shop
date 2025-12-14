import type { Product } from "../types/product";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Suéter Cashmere",
    price: 89900,
    description: "Suéter de cashmere premium en tono beige. Perfecta para cualquier ocasión, combina elegancia y comodidad.",
    image: product1,
    sizes: ["S", "M", "L"],
    inStock: true,
    category: "Sweaters",
  },
  {
    id: "2",
    name: "Vestido Seda Olive",
    price: 129900,
    description: "Vestido fluido de seda en tono olive green. Diseño atemporal con corte favorecedor.",
    image: product2,
    sizes: ["S", "M", "L"],
    inStock: true,
    category: "Vestidos",
  },
  {
    id: "3",
    name: "Abrigo Lana Copper",
    price: 189900,
    description: "Abrigo de lana en tono copper. Confección italiana, corte estructurado y elegante.",
    image: product3,
    sizes: ["S", "M", "L"],
    inStock: true,
    category: "Abrigos",
  },
  {
    id: "4",
    name: "Blazer Lino Cream",
    price: 119900,
    description: "Blazer de lino en tono cream. Perfecto para look casual-chic, corte relajado.",
    image: product4,
    sizes: ["S", "M", "L"],
    inStock: true,
    category: "Blazers",
  },
  {
    id: "5",
    name: "Blusa Seda Sage",
    price: 79900,
    description: "Blusa de seda en tono sage green. Diseño versátil y sofisticado.",
    image: product5,
    sizes: ["S", "M", "L"],
    inStock: false,
    category: "Blusas",
  },
  {
    id: "6",
    name: "Pantalón Wide Leg Taupe",
    price: 94900,
    description: "Pantalón wide leg en tono taupe. Tela fluida, tiro alto, silueta favorecedora.",
    image: product6,
    sizes: ["S", "M", "L"],
    inStock: true,
    category: "Pantalones",
    stockPerSize: {
      S: 5,
      M: 0,
      L: 10
    }
  },
];