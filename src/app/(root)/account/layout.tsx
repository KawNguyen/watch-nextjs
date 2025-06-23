"use client";

import ProfileContainer from "@/components/profile-container";
import { useAuth } from "@/components/providers/auth-context";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useAuth();
  return <ProfileContainer user={profile}>{children}</ProfileContainer>;
};

export default ProfileLayout;
