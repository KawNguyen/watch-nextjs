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



export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  avatar?: string | null;
}
