export interface SignInTypes {
  email: string;
  password: string;
}

export interface RegisterTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AddressProps {
  id: string;
  street: string;
  district: string;
  ward: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone?: string | null;
  avatar?: {
    absolute_url: string;
    public_id: string;
  };
  addresses?: AddressProps[];
}

export interface ChangePasswordProps {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateUserProps {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  avatar?: string | null;
  gender?: UserGender;
}

export enum UserGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
