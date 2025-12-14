import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, Loader2 } from "lucide-react";

interface PaymentGatewayProps {
  total: number;
  onCancel: () => void;
  onSuccess: () => void;
}

export const PaymentGateway = ({ total, onCancel, onSuccess }: PaymentGatewayProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulamos un proceso de red de 2 segundos
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl font-bold flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[rgb(157,125,72)]" />
          Tarjeta de Crédito / Débito
        </h3>
        <div className="flex gap-2">
          {/* Iconos de tarjetas simulados */}
          <div className="w-8 h-5 bg-gray-200 rounded"></div>
          <div className="w-8 h-5 bg-gray-200 rounded"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="cardName">Nombre en la tarjeta</Label>
          <Input id="cardName" placeholder="Como aparece en el plástico" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardNumber">Número de tarjeta</Label>
          <div className="relative">
            <Input id="cardNumber" placeholder="0000 0000 0000 0000" required maxLength={19} />
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiración (MM/AA)</Label>
            <Input id="expiry" placeholder="MM/AA" required maxLength={5} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="123" required maxLength={3} type="password" />
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[rgb(157,125,72)] hover:bg-[rgb(140,110,60)] text-white font-medium py-6 rounded-full text-lg shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Procesando...
              </>
            ) : (
              `Pagar $${total.toLocaleString()}`
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full text-muted-foreground"
          >
            Cancelar y volver
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
        <Lock className="w-3 h-3" />
        Pago 100% seguro encriptado con SSL
      </div>
    </div>
  );
};