"use client";

import { AddressManagement } from "@/components/profile/address-management";
import { useProfile } from "@/components/providers/profile-context";

const AddressesPage = () => {
  const user = useProfile();

  return <AddressManagement addresses={user?.addresses ?? null} />;
};

export default AddressesPage;
