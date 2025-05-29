"use client";

import { useUser } from "@/queries/user";
import { ProfileTypes, UserTypes } from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  email: string;
  setEmail: (email: string) => void;
  profile: ProfileTypes | null;
  isAuthenticated: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  email: "",
  setEmail: () => {},
  profile: null,
  isAuthenticated: false,
  logout: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string>("");
  const [profile, setProfile] = useState<ProfileTypes | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data, status } = useUser();

  const checkAuth = () => {
    if (status === "success") {
      console.log(data);
      setProfile(data?.profile);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [data])

  const logout = () => {
    sessionStorage.removeItem("user");
    setProfile(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    email,
    setEmail,
    profile,
    isAuthenticated,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
