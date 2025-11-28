import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, Check } from "lucide-react";

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Número de tarjeta inválido (16 dígitos)"),
  cardName: z.string().min(3, "Nombre en la tarjeta requerido"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato MM/YY"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV inválido (3-4 dígitos)"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentGatewayProps {
  total: number;
  onCancel: () => void;
  onSuccess: () => void;
}

export const PaymentGateway = ({ total, onCancel, onSuccess }: PaymentGatewayProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);

    // Mostrar éxito por 2 segundos antes de llamar onSuccess
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.slice(0, 16);
  };

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  if (isSuccess) {
    return (
      <Card className="p-12 text-center space-y-6 animate-scale-in">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-3xl font-semibold text-foreground">
            ¡Pago Exitoso!
          </h3>
          <p className="text-muted-foreground">
            Tu pedido ha sido confirmado y será enviado pronto
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 pb-4 border-b">
        <CreditCard className="h-6 w-6 text-primary" />
        <h3 className="font-serif text-2xl font-semibold">Pasarela de Pago</h3>
      </div>

      <div className="bg-muted/30 p-4 rounded-xl space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Total a pagar</span>
          <span className="text-2xl font-serif font-bold text-primary">
            ${total.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-3 w-3" />
          <span>Pago seguro y encriptado</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Número de Tarjeta</Label>
          <Input
            id="cardNumber"
            {...register("cardNumber")}
            onChange={(e) => {
              e.target.value = formatCardNumber(e.target.value);
            }}
            placeholder="1234 5678 9012 3456"
            maxLength={16}
            className="rounded-lg font-mono"
          />
          {errors.cardNumber && (
            <p className="text-sm text-destructive">{errors.cardNumber.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
          <Input
            id="cardName"
            {...register("cardName")}
            placeholder="MARÍA GONZÁLEZ"
            className="rounded-lg uppercase"
          />
          {errors.cardName && (
            <p className="text-sm text-destructive">{errors.cardName.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Fecha de Expiración</Label>
            <Input
              id="expiryDate"
              {...register("expiryDate")}
              onChange={(e) => {
                e.target.value = formatExpiryDate(e.target.value);
              }}
              placeholder="MM/YY"
              maxLength={5}
              className="rounded-lg font-mono"
            />
            {errors.expiryDate && (
              <p className="text-sm text-destructive">{errors.expiryDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              {...register("cvv")}
              type="password"
              maxLength={4}
              placeholder="123"
              className="rounded-lg font-mono"
            />
            {errors.cvv && (
              <p className="text-sm text-destructive">{errors.cvv.message}</p>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1 rounded-full"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isProcessing}
            className="flex-1 rounded-full bg-primary hover:bg-primary/90"
          >
            {isProcessing ? (
              <>
                <span className="animate-pulse">Procesando...</span>
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Pagar ${total.toLocaleString()}
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground pt-2">
          Este es un simulador de pago. No se realizarán cargos reales.
        </p>
      </form>
    </Card>
  );
};
