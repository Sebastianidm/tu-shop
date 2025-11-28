export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  zipCode: string;
  isDefault?: boolean;
}
