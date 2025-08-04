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
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { formatAddress } from "@/lib/utils";
import { AddressProps } from "@/types/auth";

export function AddressManagement() {
  const { profile: user } = useAuthStore();
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
      toast.success("Address deleted successfully");
    },
    onError: (error: string) => {
      console.error("Address deleted error", error);
      toast.error("");
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pl-6 pt-4">
        <div>
          <CardTitle>Địa Chỉ</CardTitle>
          <CardDescription>
            Quản lý địa chỉ giao hàng và thanh toán của bạn
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
                        <span className="font-medium">Địa chỉ {index + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {formatAddress(address)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <AddAddressModal
                        userId={user?.id ?? ""}
                        addressId={address.id}
                        data={{
                          ...address,
                          ward:
                            typeof address.ward === "string"
                              ? { name: address.ward, code: "" }
                              : address.ward,
                          district:
                            typeof address.district === "string"
                              ? { name: address.district, code: "" }
                              : address.district,
                          city:
                            typeof address.city === "string"
                              ? { name: address.city, code: "" }
                              : address.city,
                        }}
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
                              Bạn có chắc chắn không?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Bạn sắp xóa địa chỉ sau:
                              <br />
                              <span className="font-medium block mt-2">
                                {formatAddress(address)}
                              </span>
                              <br />
                              Hành động này không thể hoàn tác.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                mutation.mutate({
                                  userId: user?.id ?? "",
                                  addressId: address.id ?? "",
                                })
                              }
                            >
                              Có, xóa nó
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
            Bạn chưa có địa chỉ nào.{" "}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
