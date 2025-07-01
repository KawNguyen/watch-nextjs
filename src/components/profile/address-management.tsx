"use client";

import { Edit, Home, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddressProps } from "@/types/auth";
import { AddAddressModal } from "./add-address-modal";

export function AddressManagement({
  initialAddresses,
  userId,
}: {
  initialAddresses: AddressProps[] | null;
  userId: string;
}) {
  const [addressList, setAddressList] = useState<AddressProps[]>(initialAddresses || []);

  // const handleAddSuccess = (newAddress: AddressProps) => {
  //   setAddressList((prev) => [...prev, newAddress]);
  // };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pl-6 pt-4">
        <div>
          <CardTitle>Saved Addresses</CardTitle>
          <CardDescription>Manage your shipping and billing addresses</CardDescription>
        </div>
        <AddAddressModal
          type="create"
          userId={userId}
          // onSuccess={handleAddSuccess}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        {addressList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addressList.map((address, index) => (
              <Card key={address.id} className="border hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Address {index + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {`${address.street}, Ward ${address.ward}, District ${address.district}, ${address.city}, ${address.country}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <AddAddressModal
                        type="edit"
                        data={address}
                        userId={userId}
                        // onSuccess={() => {}}
                      />
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No addresses saved yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
