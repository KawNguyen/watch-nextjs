"use client";
import { ProfileInfo } from "@/components/profile/profile-info";
import { useProfile } from "@/components/providers/profile-context";

export default function InfoPage() {
  const user = useProfile();
  return <ProfileInfo user={user} />;
}
