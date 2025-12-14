import { useState } from "react";
import { Product, CartItem } from "@/types/product";
import { Address } from "@/types/address";
import { products } from "@/data/products";
import { Header } from "@/components/Header";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { ShoppingCart } from "@/components/ShoppingCart";
import { OrderSummary } from "@/components/OrderSummary";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  const { toast } = useToast();

  const featuredProducts = products.slice(0, 3);

  const categories = ["Todas", ...new Set(products.map((product) => product.category))];

  const filteredProducts = selectedCategory === "Todas"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: Product, size: string) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.selectedSize === size
    );
    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1, selectedSize: size },
      ]);
    }
    toast({
      title: "Producto agregado",
      description: `${product.name} (Talla ${size}) se agregó a tu carrito.`,
    });
  };

  const handleUpdateQuantity = (id: string, size: string, delta: number) => {
    setCartItems((items) =>
      items
        .map((item) => {
          if (item.id === id && item.selectedSize === size) {
            return { ...item, quantity: Math.max(0, item.quantity + delta) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleGoToConfirmation = () => {
    setIsCartOpen(false);
    const element = document.getElementById("confirmation");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleEditCart = () => setIsCartOpen(true);

  const handleAddAddress = (address: Address) => {
    setAddresses([...addresses, address]);
    if (addresses.length === 0) {
      setSelectedAddressId(address.id);
    }
    toast({
      title: "Dirección guardada",
      description: "Tu dirección ha sido agregada correctamente.",
    });
  };

  const handleSelectAddress = (addressId: string) => setSelectedAddressId(addressId);

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemsCount={cartItemsCount} />

      <section id="hero" className="pt-8 pb-16 px-4 md:px-8">
        <div className="container mx-auto">
          <ProductCarousel products={featuredProducts} onProductClick={handleProductClick} />
        </div>
      </section>

      <section id="catalog" className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Nuestra Colección
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre piezas atemporales diseñadas para mujeres que buscan elegancia
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 border ${selectedCategory === category
                  ? "bg-[rgb(157,125,72)] text-white border-[rgb(157,125,72)]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-black"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-500">
                No hay productos disponibles en esta categoría.
              </div>
            )}
          </div>
        </div>
      </section>

      <OrderSummary
        items={cartItems}
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onEditCart={handleEditCart}
        onSelectAddress={handleSelectAddress}
        onAddAddress={handleAddAddress}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onGoToConfirmation={handleGoToConfirmation}
      />
    </div>
  );
};

export default Index;