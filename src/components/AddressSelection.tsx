import { useState } from "react";
import { Address } from "@/types/address";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Plus, ArrowLeft } from "lucide-react";

interface AddressSelectionProps {
  addresses: Address[];
  selectedAddressId: string | null;
  onSelectAddress: (id: string) => void;
  onAddAddress: (address: Address) => void;
  onContinue: () => void;
  onCancel: () => void;
}

export const AddressSelection = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddAddress,
  onContinue,
  onCancel,
}: AddressSelectionProps) => {
  const [isAddingNew, setIsAddingNew] = useState(false);

  // 1. CORRECCIÓN: Estado ampliado para cubrir todos los campos de Address
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    region: "",
    zip: "",
  });

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();

    // 2. CORRECCIÓN: Creamos el objeto Address completo
    const address: Address = {
      id: Date.now().toString(),
      fullName: newAddress.fullName,
      phone: newAddress.phone,
      street: newAddress.street,
      city: newAddress.city,
      region: newAddress.region,
      zipCode: newAddress.zip,
    };

    onAddAddress(address);
    onSelectAddress(address.id);
    setIsAddingNew(false);
    // Limpiamos el formulario
    setNewAddress({ fullName: "", phone: "", street: "", city: "", region: "", zip: "" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver
        </Button>
      </div>

      {!isAddingNew ? (
        <div className="space-y-4">
          <div className="grid gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => onSelectAddress(addr.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${selectedAddressId === addr.id
                    ? "border-[rgb(157,125,72)] bg-[rgb(157,125,72)]/5"
                    : "border-transparent bg-white hover:border-gray-200"
                  }`}
              >
                <div className={`mt-1 p-1 rounded-full ${selectedAddressId === addr.id ? "bg-[rgb(157,125,72)] text-white" : "bg-gray-100 text-gray-400"}`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{addr.fullName || "Dirección"}</p>
                  <p className="text-sm text-foreground">{addr.street}</p>
                  <p className="text-xs text-muted-foreground">
                    {addr.city}, {addr.region} - {addr.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => setIsAddingNew(true)}
            className="w-full border-dashed border-2 py-6 text-muted-foreground hover:text-primary hover:border-primary"
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Nueva Dirección
          </Button>

          <Button
            onClick={onContinue}
            disabled={!selectedAddressId}
            className="w-full bg-[rgb(157,125,72)] hover:bg-[rgb(140,110,60)] text-white font-medium py-6 rounded-full mt-4 shadow-lg"
          >
            Continuar al Pago
          </Button>
        </div>
      ) : (
        /* 3. CORRECCIÓN: Formulario ampliado */
        <form onSubmit={handleSaveAddress} className="space-y-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-serif text-xl font-bold mb-4">Nueva Dirección</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                required
                value={newAddress.fullName}
                onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                placeholder="Ej: Juan Pérez"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                required
                type="tel"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                placeholder="+56 9 1234 5678"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Calle y Número</Label>
            <Input
              id="street"
              required
              value={newAddress.street}
              onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
              placeholder="Ej: Av. Providencia 1234, Depto 501"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="region">Región</Label>
              <Input
                id="region"
                required
                value={newAddress.region}
                onChange={(e) => setNewAddress({ ...newAddress, region: e.target.value })}
                placeholder="RM"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Comuna / Ciudad</Label>
              <Input
                id="city"
                required
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                placeholder="Providencia"
              />
            </div>
            <div className="space-y-2 col-span-2 md:col-span-1">
              <Label htmlFor="zip">Código Postal</Label>
              <Input
                id="zip"
                value={newAddress.zip}
                onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                placeholder="7500000"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddingNew(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-[rgb(157,125,72)] hover:bg-[rgb(140,110,60)] text-white">
              Guardar Dirección
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};