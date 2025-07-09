"use client";

import { ChangePasswordSection } from "@/components/profile/change-password";
import { useAuthStore } from "@/store/auth.store";

const Password = () => {
  const { profile: user } = useAuthStore();
  return <ChangePasswordSection userId={user?.id} />;
};

export default Password;
