import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Address } from "@/types/address";

const addressSchema = z.object({
  fullName: z.string().min(3, "Nombre debe tener al menos 3 caracteres"),
  phone: z.string().min(9, "Teléfono inválido"),
  street: z.string().min(5, "Dirección debe tener al menos 5 caracteres"),
  city: z.string().min(2, "Ciudad requerida"),
  region: z.string().min(2, "Región requerida"),
  zipCode: z.string().min(4, "Código postal inválido"),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  onSubmit: (data: Address) => void;
  onCancel: () => void;
  initialData?: Address;
}

export const AddressForm = ({ onSubmit, onCancel, initialData }: AddressFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData,
  });

  const onFormSubmit = (data: AddressFormData) => {
    const address: Address = {
      id: initialData?.id || Date.now().toString(),
      fullName: data.fullName,
      phone: data.phone,
      street: data.street,
      city: data.city,
      region: data.region,
      zipCode: data.zipCode,
      isDefault: initialData?.isDefault || false,
    };
    onSubmit(address);
  };

  return (
    <Card className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 pb-4 border-b">
        <MapPin className="h-6 w-6 text-primary" />
        <h3 className="font-serif text-2xl font-semibold">
          {initialData ? "Editar Dirección" : "Nueva Dirección"}
        </h3>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nombre Completo</Label>
          <Input
            id="fullName"
            {...register("fullName")}
            placeholder="María González"
            className="rounded-lg"
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder="+56 9 1234 5678"
            className="rounded-lg"
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Dirección</Label>
          <Input
            id="street"
            {...register("street")}
            placeholder="Av. Providencia 1234, Depto 305"
            className="rounded-lg"
          />
          {errors.street && (
            <p className="text-sm text-destructive">{errors.street.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input
              id="city"
              {...register("city")}
              placeholder="Santiago"
              className="rounded-lg"
            />
            {errors.city && (
              <p className="text-sm text-destructive">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">Región</Label>
            <Input
              id="region"
              {...register("region")}
              placeholder="Metropolitana"
              className="rounded-lg"
            />
            {errors.region && (
              <p className="text-sm text-destructive">{errors.region.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">Código Postal</Label>
          <Input
            id="zipCode"
            {...register("zipCode")}
            placeholder="7500000"
            className="rounded-lg"
          />
          {errors.zipCode && (
            <p className="text-sm text-destructive">{errors.zipCode.message}</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 rounded-full"
          >
            Cancelar
          </Button>
          <Button type="submit" className="flex-1 rounded-full">
            Guardar Dirección
          </Button>
        </div>
      </form>
    </Card>
  );
};
