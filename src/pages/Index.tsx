import { useState, useMemo } from "react";
import { Product, CartItem } from "@/types/product";
import { Address } from "@/types/address";
import { products as initialProducts } from "@/data/products";
import { Header } from "@/components/Header";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { ShoppingCart } from "@/components/ShoppingCart";
import { OrderSummary } from "@/components/OrderSummary";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Heart, Search } from "lucide-react";

// --- MOCK AUTH ---
const MOCK_USER = { name: "Usuario Demo", email: "demo@tushop.cl" };

const Index = () => {
  // --- ESTADOS DE DATOS ---
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<{ name: string, email: string } | null>(null);

  // --- ESTADOS DE UI & FILTROS ---
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  // Filtros Avanzados
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  // CORRECCIÓN: Rango de precios ajustado a CLP (0 a 200.000)
  const [priceRange, setPriceRange] = useState<number[]>([0, 200000]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const { toast } = useToast();

  // --- LOGICA DE FILTRADO ---
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Categoría
      const matchCategory = selectedCategory === "Todas" || product.category === selectedCategory;
      // 2. Buscador
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      // 3. Precio (Lógica corregida)
      const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      // 4. Disponibilidad (Calculada sumando stock de tallas)
      const totalStock = product.sizes.reduce((acc, curr) => acc + curr.stock, 0);
      const matchStock = showInStockOnly ? totalStock > 0 : true;

      return matchCategory && matchSearch && matchPrice && matchStock;
    });
  }, [products, selectedCategory, searchQuery, priceRange, showInStockOnly]);

  const categories = ["Todas", ...new Set(initialProducts.map((p) => p.category))];

  // --- HANDLERS ---
  const handleLogin = () => {
    setUser(MOCK_USER);
    toast({ title: "Bienvenido", description: `Hola de nuevo, ${MOCK_USER.name}` });
  };

  const handleLogout = () => {
    setUser(null);
    toast({ title: "Sesión cerrada", description: "Has cerrado sesión correctamente." });
  };

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      toast({ description: "Eliminado de favoritos" });
    } else {
      setWishlist([...wishlist, productId]);
      toast({ description: "Guardado en favoritos", className: "text-[rgb(157,125,72)]" });
    }
  };

  const handleAddToCart = (product: Product, size: string) => {
    const currentProductState = products.find(p => p.id === product.id);
    const sizeData = currentProductState?.sizes.find(s => s.size === size);

    if (!sizeData || sizeData.stock <= 0) {
      toast({ title: "Sin stock", description: "Lo sentimos, esa talla se acaba de agotar.", variant: "destructive" });
      return;
    }

    // Decrementar Stock Visualmente
    setProducts(prevProducts => prevProducts.map(p => {
      if (p.id === product.id) {
        return {
          ...p,
          sizes: p.sizes.map(s => s.size === size ? { ...s, stock: s.stock - 1 } : s)
        };
      }
      return p;
    }));

    // Agregar al Carrito
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
      description: `${product.name} (Talla ${size}) al carrito.`,
      className: "border-l-4 border-[rgb(157,125,72)]"
    });

    setIsModalOpen(false);
  };

  const handleNotifyMe = (email: string) => {
    toast({ title: "Solicitud recibida", description: `Te avisaremos a ${email} cuando vuelva el stock.` });
  };

  const handleUpdateQuantity = (id: string, size: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id && item.selectedSize === size) {
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const handleEditCart = () => setIsCartOpen(true);

  const handleGoToConfirmation = () => {
    setIsCartOpen(false);
    document.getElementById("confirmation")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddAddress = (address: Address) => {
    setAddresses([...addresses, address]);
    if (addresses.length === 0) setSelectedAddressId(address.id);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        wishlistCount={wishlist.length}
      />

      {/* HERO SECTION */}
      <section className="pt-8 pb-10 px-4">
        <ProductCarousel
          products={products.slice(0, 5)}
          onProductClick={(p) => { setSelectedProduct(p); setIsModalOpen(true); }}
        />
      </section>

      {/* CATALOGO & FILTROS */}
      <section id="catalog" className="py-8 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="mb-8 space-y-4">
            <h2 className="font-serif text-4xl font-bold text-center">Nuestra Colección</h2>

            {/* BARRA DE HERRAMIENTAS */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 justify-between items-center">

              {/* Buscador */}
              <div className="relative w-full lg:w-1/3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar productos..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Categorías */}
              <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm transition-all border ${selectedCategory === cat
                        ? "bg-[rgb(157,125,72)] text-white border-[rgb(157,125,72)]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[rgb(157,125,72)]"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Checkbox Stock */}
              <div className="flex items-center gap-2 min-w-fit">
                <input
                  type="checkbox"
                  id="stockFilter"
                  checked={showInStockOnly}
                  onChange={(e) => setShowInStockOnly(e.target.checked)}
                  className="accent-[rgb(157,125,72)] h-4 w-4"
                />
                <label htmlFor="stockFilter" className="text-sm cursor-pointer select-none">Solo Disponibles</label>
              </div>
            </div>

            {/* Control Deslizante de Precio (Opcional, simple) */}
            <div className="flex flex-col items-center justify-center space-y-2 pt-2">
              <span className="text-sm text-gray-500">
                Precio máximo: {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(priceRange[1])}
              </span>
              <input
                type="range"
                min="0"
                max="200000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full max-w-xs accent-[rgb(157,125,72)]"
              />
            </div>

          </div>

          {/* GRID PRODUCTOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isFavorite = wishlist.includes(product.id);
              const isOutOfStock = product.sizes.reduce((a, b) => a + b.stock, 0) === 0;

              return (
                <div key={product.id} className="relative group">
                  {/* Botón Wishlist */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-2 right-2 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors shadow-sm"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-[rgb(157,125,72)] text-[rgb(157,125,72)]" : "text-gray-400"}`} />
                  </button>

                  {/* Product Card con props corregidas */}
                  <ProductCard
                    product={product}
                    onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                  />
                </div>
              );
            })}
          </div>

          {/* Mensaje de vacío */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-lg mt-8">
              <p className="text-gray-500 text-lg">No encontramos productos con esos filtros.</p>
              <p className="text-sm text-gray-400 mb-4">Intenta ajustar el precio o cambiar la categoría.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Todas");
                  setPriceRange([0, 200000]); // Resetear a rango alto
                }}
                className="border-[rgb(157,125,72)] text-[rgb(157,125,72)] hover:bg-[rgb(157,125,72)] hover:text-white"
              >
                Limpiar todos los filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      <OrderSummary
        items={cartItems}
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onEditCart={handleEditCart}
        onSelectAddress={setSelectedAddressId}
        onAddAddress={handleAddAddress}
        user={user}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
        onNotifyMe={handleNotifyMe}
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