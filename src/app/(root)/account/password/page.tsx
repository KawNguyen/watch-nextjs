"use client"
import { ChangePassword } from "@/components/profile/change-password";
import { useProfile } from "@/components/providers/profile-context";

const Password = () => {
  const user = useProfile();
  return <ChangePassword userId={user?.id} />;
};

export default Password;
