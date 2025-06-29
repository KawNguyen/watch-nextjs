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
import { useProvinces } from "@/queries/address";
import { addressAPI } from "@/services/address";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

const addFormSchema = z.object({
  address: z.string().min(1, "Address is required"),
  ward: z.string().min(1, "Ward is required"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});
type FormValue = z.infer<typeof addFormSchema>;

// ✅ API lấy địa chỉ của user
const getMyAddress = async () => {
  const res = await axiosInstance.get("/api/address/me");
  return res.data;
};

export const AddAddressModal = () => {
  const { data: provinces = [] } = useProvinces();
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const form = useForm<FormValue>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      address: "",
      ward: "",
      district: "",
      city: "",
      country: "Việt Nam",
    },
  });

  const { data: userAddress } = useQuery({
    queryKey: ["provinces"],
    queryFn: getMyAddress,
  });

  const selectedCity = form.watch("city");
  const selectedDistrict = form.watch("district");

  // 🧠 Reset form khi có data từ API
  useEffect(() => {
    if (userAddress) {
      form.reset({
        address: userAddress.address || "",
        ward: userAddress.ward || "",
        district: userAddress.district || "",
        city: userAddress.city || "",
        country: userAddress.country || "Việt Nam",
      });

      // Load districts
      if (userAddress.city) {
        addressAPI.getDistrict(userAddress.city).then((data) => {
          setDistricts(data.districts || []);
        });
      }

      // Load wards
      if (userAddress.district) {
        addressAPI.getWard(userAddress.district).then((data) => {
          setWards(data.wards || []);
        });
      }
    }
  }, [userAddress]);

  // Khi chọn lại tỉnh
  useEffect(() => {
    if (selectedCity) {
      addressAPI.getDistrict(selectedCity).then((data) => {
        setDistricts(data.districts || []);
        setWards([]);
        form.setValue("district", "");
        form.setValue("ward", "");
      });
    }
  }, [selectedCity]);

  // Khi chọn lại quận
  useEffect(() => {
    if (selectedDistrict) {
      addressAPI.getWard(selectedDistrict).then((data) => {
        setWards(data.wards || []);
        form.setValue("ward", "");
      });
    }
  }, [selectedDistrict]);

  const onSubmit = (values: FormValue) => {
    console.log("Submit form:", values);
    // Gửi API cập nhật địa chỉ nếu cần
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Address</Button>
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
            {/* City */}
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
                      {provinces.map((p) => (
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

            {/* District */}
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quận/Huyện</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!districts.length}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quận/huyện" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts.map((d) => (
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

            {/* Ward */}
            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phường/Xã</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!wards.length}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phường/xã" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wards.map((w) => (
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

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
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
