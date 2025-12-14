import { useState, useEffect } from "react";
import { X, Bell } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  // Agregamos la prop faltante
  onNotifyMe: (email: string) => void;
}

export const ProductModal = ({ product, isOpen, onClose, onAddToCart, onNotifyMe }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");

  // Limpiar selección al cerrar o cambiar producto
  useEffect(() => {
    if (!isOpen) setSelectedSize("");
  }, [isOpen]);

  if (!isOpen || !product) return null;

  // Lógica actualizada para leer el stock del array de sizes
  const getSizeStock = (sizeName: string) => {
    const sizeData = product.sizes.find(s => s.size === sizeName);
    return sizeData ? sizeData.stock : 0;
  };

  const totalStock = product.sizes.reduce((acc, curr) => acc + curr.stock, 0);
  const isProductOutOfStock = totalStock === 0;

  const handleAddToCart = () => {
    if (selectedSize && getSizeStock(selectedSize) > 0) {
      onAddToCart(product, selectedSize);
    }
  };

  const handleNotifyAction = () => {
    onNotifyMe("cliente@ejemplo.com"); // Simulamos el email por ahora
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Columna Imagen */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isProductOutOfStock ? 'opacity-80 grayscale-[0.5]' : ''}`}
            />
            {isProductOutOfStock && (
              <div className="absolute top-4 left-4 bg-stone-800 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                Agotado
              </div>
            )}
          </div>

          {/* Columna Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                {product.category}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h2>
              <p className="text-2xl font-serif font-semibold text-[rgb(157,125,72)]">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Tallas disponibles:</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((sizeData) => {
                  const stock = sizeData.stock;
                  const isVariantSoldOut = stock === 0;

                  return (
                    <button
                      key={sizeData.size}
                      onClick={() => !isVariantSoldOut && setSelectedSize(sizeData.size)}
                      disabled={isVariantSoldOut}
                      className={`
                        relative px-4 py-2 rounded-lg border-2 transition-all duration-200 
                        ${selectedSize === sizeData.size
                          ? "border-[rgb(157,125,72)] bg-[rgb(157,125,72)] text-white"
                          : "border-gray-200 bg-white"
                        }
                        ${isVariantSoldOut
                          ? "opacity-40 cursor-not-allowed bg-gray-100 decoration-slate-500 line-through"
                          : "hover:border-[rgb(157,125,72)]/50 cursor-pointer"
                        }
                      `}
                    >
                      {sizeData.size}
                    </button>
                  );
                })}
              </div>

              {/* Mensaje de stock bajo */}
              {selectedSize && getSizeStock(selectedSize) < 3 && getSizeStock(selectedSize) > 0 && (
                <p className="text-xs text-orange-600 font-medium animate-pulse">
                  ¡Quedan pocas unidades!
                </p>
              )}
            </div>

            <div className="pt-4">
              {isProductOutOfStock || (selectedSize && getSizeStock(selectedSize) === 0) ? (
                <Button
                  onClick={handleNotifyAction}
                  size="lg"
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 border-2 border-stone-300 font-medium py-6 text-base rounded-full"
                >
                  <Bell className="w-5 h-5 mr-2" />
                  Avísame cuando llegue
                </Button>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  size="lg"
                  className="w-full bg-[rgb(157,125,72)] hover:bg-[rgb(140,110,60)] text-white font-medium py-6 text-base rounded-full shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {!selectedSize ? "Selecciona una talla" : "Agregar al carrito"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};