"use client";

import { createContext, useContext } from "react";
import { UserProps } from "@/types/auth";

export const ProfileContext = createContext<UserProps | null>(null);

export const useProfile = () => {
  return useContext(ProfileContext);
};
