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
import { Toaster } from "../ui/sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../providers/providers";
import { Address } from "@/types/address";

const addFormSchema = z.object({
  id: z.string().min(1, "Address id"),
  street: z.string().min(1, "Address is required"),
  ward: z.string().min(1, "Ward is required"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});
type FormValue = z.infer<typeof addFormSchema>;

interface AddAddressModalProps {
  data?: Address;
  type: "create" | "edit";
  userId: string | "";
}

export const AddAddressModal = ({
  userId,
  data,
  type,
}: AddAddressModalProps) => {
  const [cityCode, setCityCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const { data: provinces } = useProvinces();

  const form = useForm<FormValue>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      street: "",
      ward: "",
      district: "",
      city: "",
      country: "Việt Nam",
    },
  });

  const { data: districts } = useDistricts(cityCode);
  const { data: wards } = useWards(districtCode);

  useEffect(() => {
    if (data) {
      form.reset({
        street: data.street || "",
        ward: data.ward || "",
        district: data.district || "",
        city: data.city || "",
        country: data.country || "Việt Nam",
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: ({
      userId,
      id,
      data,
    }: {
      userId: string | "";
      id?: string;
      data: Address;
    }) =>
      type === "create"
        ? addressAPI.create(userId, data)
        : addressAPI.update(userId, id ?? "", data),
    onSuccess: () => {
      toast.success("Address created successfully");
      queryClient.invalidateQueries({ queryKey: ["my-address"] });
    },
    onError: () => {
      toast.error("Address created unsuccessfully");
    },
  });

  const onSubmit = async (values: FormValue) => {
    // try {
    //   if (type === "create") {
    //     await addressAPI.create(userId, values);

    //     toast.success("Address created successfully");
    //   }
    // } catch (error) {
    //   toast.error("Address created unsuccessfully");
    // }
    mutation.mutate({ userId, id: values.id, data: values });
  };

  return (
    <Dialog>
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
          <DialogTitle>Add Address</DialogTitle>
          <DialogDescription>
            Add a new address to your account
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City/Province</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const selected = provinces.find(
                        (p: any) => p.code.toString() === value
                      );
                      if (selected) {
                        setCityCode(selected.code.toString());
                        field.onChange(selected.name);
                      }
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose city/province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces.map((p: any) => (
                        <SelectItem key={p.code} value={p.code.toString()}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const selected = districts?.districts?.find(
                        (d: any) => d.code.toString() === value
                      );
                      if (selected) {
                        setDistrictCode(selected.code.toString());
                        field.onChange(selected.name);
                      }
                    }}
                    value={field.value}
                    // disabled={!districts.length}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts?.districts?.map((d: any) => (
                        <SelectItem key={d.code} value={d.code.toString()}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ward</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    // disabled={!wards.length}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose ward" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wards?.wards?.map((w: any) => (
                        <SelectItem key={w.code} value={w.name}>
                          {w.name}
                        </SelectItem>
                      ))}
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
                  <FormLabel>Address number</FormLabel>
                  <FormControl>
                    <Input placeholder="123/123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Việt Nam" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
