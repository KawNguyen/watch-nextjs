export interface Address {
  id?: string;
  street: string;
  ward: {
    name: string;
    code: string;
  };
  district: {
    name: string;
    code: string;
  };
  city: {
    name: string;
    code: string;
  };
  country: string;
}
