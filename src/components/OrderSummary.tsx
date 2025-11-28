import { useState } from "react";
import { CartItem } from "@/types/product";
import { Address } from "@/types/address";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Package, CreditCard } from "lucide-react";
import { AddressSelection } from "./AddressSelection";
import { PaymentGateway } from "./PaymentGateway";

interface OrderSummaryProps {
  items: CartItem[];
  addresses: Address[];
  selectedAddressId: string | null;
  onEditCart: () => void;
  onSelectAddress: (addressId: string) => void;
  onAddAddress: (address: Address) => void;
}

export const OrderSummary = ({ 
  items, 
  addresses, 
  selectedAddressId, 
  onEditCart, 
  onSelectAddress, 
  onAddAddress 
}: OrderSummaryProps) => {
  const [showAddressSelection, setShowAddressSelection] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5000;
  const total = subtotal + shipping;

  const handleProceedToPayment = () => {
    setShowAddressSelection(true);
  };

  const handleContinueToPayment = () => {
    setShowAddressSelection(false);
    setShowPaymentGateway(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentGateway(false);
    setPaymentSuccess(true);
  };

  const handleCancelAddress = () => {
    setShowAddressSelection(false);
  };

  const handleCancelPayment = () => {
    setShowPaymentGateway(false);
    setShowAddressSelection(true);
  };

  if (paymentSuccess) {
    return (
      <section id="confirmation" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 text-center space-y-6 animate-scale-in">
            <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-4xl font-bold text-foreground">
                ¡Pedido Confirmado!
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Gracias por tu compra. Recibirás un correo con los detalles de tu pedido.
              </p>
            </div>
            <Button
              onClick={() => window.location.reload()}
              className="rounded-full mt-6"
            >
              Realizar Nuevo Pedido
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  if (showAddressSelection) {
    return (
      <section id="confirmation" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Dirección de Envío
            </h2>
            <p className="text-lg text-muted-foreground">
              Selecciona o agrega una dirección para tu pedido
            </p>
          </div>
          <AddressSelection
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onSelectAddress={onSelectAddress}
            onAddAddress={onAddAddress}
            onContinue={handleContinueToPayment}
            onCancel={handleCancelAddress}
          />
        </div>
      </section>
    );
  }

  if (showPaymentGateway) {
    return (
      <section id="confirmation" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Finalizar Compra
            </h2>
            <p className="text-lg text-muted-foreground">
              Completa los datos de pago
            </p>
          </div>
          <PaymentGateway
            total={total}
            onCancel={handleCancelPayment}
            onSuccess={handlePaymentSuccess}
          />
        </div>
      </section>
    );
  }

  return (
    <section id="confirmation" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Confirmación de Pedido
          </h2>
          <p className="text-lg text-muted-foreground">
            Revisa tu pedido antes de proceder al pago
          </p>
        </div>

        {items.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-6">
              No hay productos en tu pedido
            </p>
            <Button
              onClick={onEditCart}
              variant="outline"
              className="rounded-full"
            >
              Ir al Catálogo
            </Button>
          </Card>
        ) : (
          <Card className="p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b">
              <Package className="h-6 w-6 text-primary" />
              <h3 className="font-serif text-2xl font-semibold">Resumen del Pedido</h3>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl"
                >
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-background">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Talla: {item.selectedSize} • Cantidad: {item.quantity}
                    </p>
                    <p className="text-primary font-semibold mt-1">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Envío</span>
                <span>${shipping.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span className="text-primary">${total.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button
                onClick={onEditCart}
                variant="outline"
                size="lg"
                className="w-full rounded-full"
              >
                Editar Carrito
              </Button>
              <Button
                onClick={handleProceedToPayment}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Proceder al Pago
              </Button>
            </div>

            <p className="text-sm text-center text-muted-foreground pt-4">
              Este es el paso previo al pago. Al continuar serás redirigido a la pasarela de pago segura.
            </p>
          </Card>
        )}
      </div>
    </section>
  );
};
