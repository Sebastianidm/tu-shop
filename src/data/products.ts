import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Vestido Midi Seda",
    category: "Vestidos",
    price: 89990, // Precio premium acorde al material (Seda)
    description: "Elegancia pura en seda natural, ideal para eventos de noche.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    sizes: [
      { size: "S", stock: 2 }, // Stock bajo (debería salir alerta visual)
      { size: "M", stock: 5 }, // Stock normal
      { size: "L", stock: 0 }  // Talla agotada (debería estar deshabilitada)
    ],
    isNew: true
  },
  {
    id: "2",
    name: "Blusa Lino Beige",
    category: "Blusas",
    price: 24990, // Precio accesible (rango que mencionaste)
    description: "Frescura y estilo para el día a día.",
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=800&auto=format&fit=crop",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 10 },
      { size: "L", stock: 10 }
    ]
  },
  {
    id: "3",
    name: "Pantalón Palazzo",
    category: "Pantalones",
    price: 39990, // Precio medio
    description: "Corte amplio y sofisticado.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 } // Producto totalmente agotado (Label "Sin Stock" general)
    ]
  },
  {
    id: "4",
    name: "Chaqueta Tweed",
    category: "Abrigos",
    price: 59990, // Precio de prenda exterior
    description: "Un clásico renovado con botones dorados.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    sizes: [
      { size: "S", stock: 3 },
      { size: "M", stock: 1 } // Stock crítico (¡Solo 1!)
    ]
  },
  {
    id: "5",
    name: "Falda Plisada Oro",
    category: "Faldas",
    price: 29990, // Precio accesible
    description: "Movimiento y brillo sutil.",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop",
    sizes: [
      { size: "S", stock: 4 },
      { size: "M", stock: 2 },
      { size: "L", stock: 6 }
    ]
  }
];