"use client";
import { ChangePasswordSection } from "@/components/profile/change-password";
import { useProfile } from "@/components/providers/profile-context";

const Password = () => {
  const user = useProfile();
  return <ChangePasswordSection userId={user?.id} />;
};

export default Password;
