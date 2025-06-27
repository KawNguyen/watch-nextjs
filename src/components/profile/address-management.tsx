"use client";

import { Edit, Home, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddressProps } from "@/types/auth";

export function AddressManagement({
  addresses,
}: {
  addresses: AddressProps[] | null;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div>
          <CardTitle>Saved Addresses</CardTitle>
          <CardDescription>
            Manage your shipping and billing addresses
          </CardDescription>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {addresses && addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address, index) => (
              <Card key={address.id}>
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
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
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
          <p className="text-sm text-muted-foreground">
            No addresses saved yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
