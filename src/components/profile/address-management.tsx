"use client";

import { Home, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddAddressModal } from "./add-address-modal";
import { useProfile } from "../providers/profile-context";
import { AddressProps } from "@/types/auth";
import { useMyAddresses } from "@/queries/address";
import { useMutation } from "@tanstack/react-query";
import { addressAPI } from "@/services/address";
import { queryClient } from "../providers/providers";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function AddressManagement() {
  const user = useProfile();
  const { data: addresses } = useMyAddresses();

  const mutation = useMutation({
    mutationFn: ({
      userId,
      addressId,
    }: {
      userId: string;
      addressId: string;
    }) => addressAPI.delete(userId, addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-address"] });
    },
    onError: (error: any) => {
      console.error("Address deleted error", error);
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pl-6 pt-4">
        <div>
          <CardTitle>Saved Addresses</CardTitle>
          <CardDescription>
            Manage your shipping and billing addresses
          </CardDescription>
        </div>
        <AddAddressModal type="create" userId={user?.id ?? ""} />
      </CardHeader>
      <CardContent className="space-y-4">
        {addresses?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses?.map((address: AddressProps, index: number) => (
              <Card
                key={address.id}
                className="border hover:shadow-sm transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Address {index + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {`${address.street}, ${address.ward}, ${address.district}, ${address.city}, ${address.country}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <AddAddressModal
                        userId={user?.id ?? ""}
                        addressId={address.id}
                        data={address}
                        type="edit"
                      />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              You are about to delete the following address:
                              <br />
                              <span className="font-medium block mt-2">
                                {`${address.street}, ${address.ward}, ${address.district}, ${address.city}, ${address.country}`}
                              </span>
                              <br />
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                mutation.mutate({
                                  userId: user?.id ?? "",
                                  addressId: address.id,
                                })
                              }
                            >
                              Yes, delete it
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
