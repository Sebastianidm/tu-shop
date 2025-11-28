import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { CartItem } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onGoToConfirmation: () => void;
}

export const ShoppingCart = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onGoToConfirmation,
}: ShoppingCartProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      <div className="fixed right-0 top-0 z-50 h-full w-full md:w-[500px] bg-card shadow-2xl animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h2 className="font-serif text-2xl font-semibold">Tu Carrito</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto" />
              <p className="text-lg text-muted-foreground">Tu carrito está vacío</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex gap-4 p-4 bg-muted/30 rounded-xl border border-border"
                >
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-background">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Talla: {item.selectedSize}</p>
                    <p className="text-primary font-semibold">${item.price.toLocaleString()}</p>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                        className="p-1 rounded-md hover:bg-background border border-border transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                        className="p-1 rounded-md hover:bg-background border border-border transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-6 space-y-4 bg-muted/20">
              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={onGoToConfirmation}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Ir a Confirmación
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
