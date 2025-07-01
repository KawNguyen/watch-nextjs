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

const addFormSchema = z.object({
  street: z.string().min(1, "Address is required"),
  ward: z.string().min(1, "Ward is required"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});
type FormValue = z.infer<typeof addFormSchema>;

interface AddAddressModalProps {
  data?: AddressData;
  type: "create" | "edit";
}

interface AddressData {
  street: string;
  district: string;
  ward: string;
  city: string;
  country: string;
}

export const AddAddressModal = ({ data, type }: AddAddressModalProps) => {
  const { data: provinces = [] } = useProvinces();


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
  const provinceCode=form.watch("city");
  const districtCode=form.watch("district")
  const {data:districts=[]} = useDistricts(provinceCode);
  const {data:wards} = useWards(districtCode);

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

  const onSubmit = (values: FormValue) => {
    console.log("Submit form:", values);
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
                  <FormLabel>Tỉnh/Thành phố</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tỉnh/thành" />
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
                  <FormLabel>Quận/Huyện</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    // disabled={!districts.length}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quận/huyện" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts.districts?.map((d) => (
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
                  <FormLabel>Phường/Xã</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    // disabled={!wards.length}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phường/xã" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wards?.wards?.map((w) => (
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
                  <FormLabel>Địa chỉ cụ thể</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Đường ABC..." {...field} />
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
                  <FormLabel>Quốc gia</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Việt Nam" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Lưu địa chỉ</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
