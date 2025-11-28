import { useState } from "react";
import { X } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductModal = ({ product, isOpen, onClose, onAddToCart }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (selectedSize && product.inStock) {
      onAddToCart(product, selectedSize);
      onClose();
    }
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
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                {product.category}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h2>
              <p className="text-2xl font-serif font-semibold text-primary">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Tallas disponibles:</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={!product.inStock}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50"
                    } ${!product.inStock ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              {product.inStock ? (
                <Badge className="bg-accent text-accent-foreground mb-4">
                  En Stock
                </Badge>
              ) : (
                <Badge variant="secondary" className="mb-4">
                  Sin Stock
                </Badge>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock || !selectedSize}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!product.inStock
                ? "Producto sin stock"
                : !selectedSize
                ? "Selecciona una talla"
                : "Agregar al carrito"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
