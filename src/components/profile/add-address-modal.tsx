"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDistricts, useProvinces, useWards } from "@/queries/address";
import { addressAPI } from "@/services/address";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../providers/providers";
import { Address } from "@/types/address";

const addFormSchema = z.object({
  street: z.string().min(1, "Address is required"),
  ward: z.object({
    name: z.string(),
    code: z.string(),
  }),
  district: z.object({
    name: z.string(),
    code: z.string(),
  }),
  city: z.object({
    name: z.string(),
    code: z.string(),
  }),
  country: z.string().min(1, "Country is required"),
});
type FormValue = z.infer<typeof addFormSchema>;

interface AddAddressModalProps {
  userId: string | "";
  addressId?: string;
  data?: Address;
  type: "create" | "edit";
}

export const AddAddressModal = ({
  userId,
  addressId,
  data,
  type,
}: AddAddressModalProps) => {
  const [open, setOpen] = useState(false);
  const [cityCode, setCityCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");

  const { data: provinces = [] } = useProvinces();
  const { data: districts = { districts: [] } } = useDistricts(cityCode);
  const { data: wards = { wards: [] } } = useWards(districtCode);

  const form = useForm<FormValue>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      street: "",
      ward: { name: "", code: "" },
      district: { name: "", code: "" },
      city: { name: "", code: "" },
      country: "Việt Nam",
    },
  });

  useEffect(() => {
    if (!data || !provinces.length) return;

    const selectedProvince = provinces.find(
      (p: { name: string }) =>
        typeof data.city === "object" &&
        data.city !== null &&
        "name" in data.city &&
        p.name === (data.city as { name: string }).name
    );
    if (selectedProvince && !cityCode) {
      setCityCode(selectedProvince.code.toString());
      form.setValue("city", {
        name: selectedProvince.name,
        code: selectedProvince.code.toString(),
      });
    }
  }, [data, provinces, cityCode, form]);

  useEffect(() => {
    if (!data || !districts?.districts?.length) return;

    const selectedDistrict = districts.districts.find(
      (d: { name: string }) =>
        typeof data.district === "object" &&
        data.district !== null &&
        "name" in data.district &&
        d.name === (data.district as { name: string }).name
    );
    if (selectedDistrict && !districtCode) {
      setDistrictCode(selectedDistrict.code.toString());
      form.setValue("district", {
        name: selectedDistrict.name,
        code: selectedDistrict.code.toString(),
      });
    }
  }, [data, districts, districtCode, form]);

  useEffect(() => {
    if (data) {
      form.setValue("street", data.street);
      form.setValue("ward", {
        name:
          typeof data.ward === "object" &&
          data.ward !== null &&
          "name" in data.ward
            ? (data.ward as { name: string }).name
            : "",
        code:
          typeof data.ward === "object" &&
          data.ward !== null &&
          "code" in data.ward
            ? (data.ward as { code: string }).code
            : "",
      });
      form.setValue("country", data.country);
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: ({
      userId,
      id,
      data,
    }: {
      userId: string;
      id?: string;
      data: Address;
    }) =>
      type === "create"
        ? addressAPI.create(userId, data)
        : addressAPI.update(userId, id ?? "", data),
    onSuccess: () => {
      form.reset();
      toast.success(
        type === "create"
          ? "Address added successfully"
          : "Address saved successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["my-address"] });
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to save address");
    },
  });

  const onSubmit = (values: FormValue) => {
    mutation.mutate({ userId, id: addressId, data: values });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {type === "create" ? (
          <Button variant="outline">Add Address</Button>
        ) : (
          <Button variant="ghost">
            <Edit />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Add" : "Edit"} Address
          </DialogTitle>
          <DialogDescription>
            Provide your detailed address information
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormItem>
              <FormLabel>City / Province</FormLabel>
              <Select
                onValueChange={(value) => {
                  const selected = provinces.find(
                    (p: { code: string; name: string }) =>
                      p.code.toString() === value
                  );
                  if (selected) {
                    setCityCode(selected.code.toString());
                    form.setValue("city", {
                      name: selected.name,
                      code: selected.code.toString(),
                    });
                    form.setValue("district", { name: "", code: "" });
                    form.setValue("ward", { name: "", code: "" });
                    setDistrictCode("");
                  }
                }}
                value={cityCode}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose city/province" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {provinces.map(
                    (p: { code: string | number; name: string }) => (
                      <SelectItem key={p.code} value={p.code.toString()}>
                        {p.name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>District</FormLabel>
              <Select
                onValueChange={(value) => {
                  const selected = districts.districts.find(
                    (d: { code: string }) => d.code.toString() === value
                  );
                  if (selected) {
                    setDistrictCode(selected.code.toString());
                    form.setValue("district", {
                      name: selected.name,
                      code: selected.code.toString(),
                    });
                    form.setValue("ward", { name: "", code: "" });
                  }
                }}
                value={districtCode}
                disabled={!cityCode}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose district" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {districts.districts.map(
                    (d: { code: string | number; name: string }) => (
                      <SelectItem key={d.code} value={d.code.toString()}>
                        {d.name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ward</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const selected:
                        | { name: string; code: string }
                        | undefined = wards.wards.find(
                        (w: { name: string; code: string }) => w.name === value
                      );
                      if (selected) {
                        field.onChange({
                          name: selected.name,
                          code: selected.code.toString(),
                        });
                      }
                    }}
                    value={field.value.name}
                    disabled={!districtCode}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose ward" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wards.wards.map(
                        (w: { code: string | number; name: string }) => (
                          <SelectItem key={w.code} value={w.name}>
                            {w.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address number / Street</FormLabel>
                  <FormControl>
                    <Input placeholder="123/45 Street ABC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Việt Nam" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
