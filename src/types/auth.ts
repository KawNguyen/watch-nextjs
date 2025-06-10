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

export interface UserTypes {
    email: string;
    profile: ProfileTypes;
}

export interface ProfileTypes {
    firstName: string;
    lastName: string;
    avatar: string;

}