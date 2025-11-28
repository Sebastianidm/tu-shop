import { useState } from "react";
import { Address } from "@/types/address";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MapPin, Plus } from "lucide-react";
import { AddressForm } from "./AddressForm";

interface AddressSelectionProps {
  addresses: Address[];
  selectedAddressId: string | null;
  onSelectAddress: (addressId: string) => void;
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
  const [showForm, setShowForm] = useState(addresses.length === 0);

  const handleAddAddress = (address: Address) => {
    onAddAddress(address);
    setShowForm(false);
    onSelectAddress(address.id);
  };

  if (showForm) {
    return (
      <AddressForm
        onSubmit={handleAddAddress}
        onCancel={() => {
          if (addresses.length > 0) {
            setShowForm(false);
          } else {
            onCancel();
          }
        }}
      />
    );
  }

  return (
    <Card className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-primary" />
          <h3 className="font-serif text-2xl font-semibold">Dirección de Envío</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowForm(true)}
          className="rounded-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva
        </Button>
      </div>

      <RadioGroup value={selectedAddressId || ""} onValueChange={onSelectAddress}>
        <div className="space-y-3">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`relative flex items-start space-x-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                selectedAddressId === address.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => onSelectAddress(address.id)}
            >
              <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
              <Label
                htmlFor={address.id}
                className="flex-1 cursor-pointer space-y-1"
              >
                <div className="font-semibold text-foreground">{address.fullName}</div>
                <div className="text-sm text-muted-foreground">
                  {address.street}
                </div>
                <div className="text-sm text-muted-foreground">
                  {address.city}, {address.region} - {address.zipCode}
                </div>
                <div className="text-sm text-muted-foreground">{address.phone}</div>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex-1 rounded-full"
        >
          Cancelar
        </Button>
        <Button
          onClick={onContinue}
          disabled={!selectedAddressId}
          className="flex-1 rounded-full"
        >
          Continuar al Pago
        </Button>
      </div>
    </Card>
  );
};
