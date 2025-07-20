"use client";

import { useForm } from "react-hook-form";
import React from "react";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Address } from "@/types/address";
import { useAuthStore } from "@/store/auth.store";
import { useMyAddresses } from "@/queries/address";
import { useProvinces, useDistricts, useWards } from "@/queries/address";
import { Card } from "../ui/card";
import { AddressProps, UserProps } from "@/types/auth";
import { formatAddress } from "@/lib/utils";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  districtName: string;
  wardName: string;
  provinceName: string;
  payment: string;
  addressId?: string;
};

interface CustomerInfoType {
  street: string;
  provinceName: string;
  districtName: string;
  wardName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  payment: string;
}

type CustomerInfoProps = {
  profile?: UserProps;
  setCustomerInfo: (info: CustomerInfoType) => void;
  onSelectSavedAddress?: (address: Address) => void;
  customerInfo?: CustomerInfoType | null;
};

export const CustomerInfo = ({
  profile,
  setCustomerInfo,
  onSelectSavedAddress,
  customerInfo,
}: CustomerInfoProps) => {
  const { isAuthenticated } = useAuthStore();
  const { data: addresses } = useMyAddresses();
  const [isMounted, setIsMounted] = React.useState(false);

  const [provinceCode, setProvinceCode] = React.useState("");
  const [districtCode, setDistrictCode] = React.useState("");

  const { data: provinces = [] } = useProvinces();
  const { data: districts = { districts: [] } } = useDistricts(provinceCode);
  const { data: wards = { wards: [] } } = useWards(districtCode);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<FormValues>({
    defaultValues: {
      firstName: customerInfo?.firstName || profile?.firstName || "",
      lastName: customerInfo?.lastName || profile?.lastName || "",
      email: customerInfo?.email || profile?.email || "",
      phone: customerInfo?.phone || profile?.phone || "",
      street: customerInfo?.street || "",
      districtName: customerInfo?.districtName || "",
      wardName: customerInfo?.wardName || "",
      provinceName: customerInfo?.provinceName || "",
      payment: customerInfo?.payment || "cod",
    },
  });

  const lastSentCustomerInfo = React.useRef<CustomerInfoType | null>(null);

  React.useEffect(() => {
    if (
      customerInfo &&
      JSON.stringify(customerInfo) !==
        JSON.stringify(lastSentCustomerInfo.current)
    ) {
      const currentValues = form.getValues();
      const hasChanges = Object.keys(customerInfo).some((key) => {
        const formKey = key as keyof FormValues;
        return (
          currentValues[formKey] !== customerInfo[key as keyof CustomerInfoType]
        );
      });

      if (hasChanges) {
        form.reset({
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          street: customerInfo.street,
          provinceName: customerInfo.provinceName,
          districtName: customerInfo.districtName,
          wardName: customerInfo.wardName,
          payment: customerInfo.payment,
        });

        const selectedProvince = provinces.find(
          (p: { name: string }) => p.name === customerInfo.provinceName
        );
        if (selectedProvince) {
          setProvinceCode(selectedProvince.code.toString());
        }
      }
    }
  }, [customerInfo, form, provinces]);

  React.useEffect(() => {
    if (customerInfo?.districtName && districts.districts.length > 0) {
      const selectedDistrict = districts.districts.find(
        (d: { name: string }) => d.name === customerInfo.districtName
      );
      if (
        selectedDistrict &&
        districtCode !== selectedDistrict.code.toString()
      ) {
        setDistrictCode(selectedDistrict.code.toString());
      }
    }
  }, [customerInfo?.districtName, districts.districts, districtCode]);

  const handleAddressSelect = (id: string) => {
    const selected = addresses?.find((a: Address) => a.id === id);
    if (!selected) return;

    if (onSelectSavedAddress) {
      onSelectSavedAddress(selected);
      return;
    }

    const currentValues = form.getValues();

    const selectedProvince = provinces.find(
      (p: { name: string }) => p.name === selected.provinceName
    );
    if (selectedProvince) {
      setProvinceCode(selectedProvince.code.toString());
      form.setValue("provinceName", selectedProvince.name);
    }

    setTimeout(() => {
      const selectedDistrict = districts.districts.find(
        (d: { name: string }) => d.name === selected.districtName
      );

      if (selectedDistrict) {
        setDistrictCode(selectedDistrict.code.toString());
        form.setValue("districtName", selectedDistrict.name);
      }

      setTimeout(() => {
        form.setValue("wardName", selected.wardName || "");

        form.reset({
          ...currentValues,
          street: selected.street || "",
          provinceName: selected.provinceName,
          districtName: selected.districtName,
          wardName: selected.wardName,
          addressId: selected.id,
        });
      }, 300);
    }, 300);
  };

  const onSubmit = (data: FormValues) => {
    const customerInfoData: CustomerInfoType = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      street: data.street,
      provinceName: data.provinceName,
      districtName: data.districtName,
      wardName: data.wardName,
      payment: data.payment,
    };
    setCustomerInfo(customerInfoData);
  };

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (
        value.firstName &&
        value.lastName &&
        value.email &&
        value.phone &&
        value.street &&
        value.provinceName &&
        value.districtName &&
        value.wardName
      ) {
        const customerInfoData: CustomerInfoType = {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          phone: value.phone,
          street: value.street,
          provinceName: value.provinceName,
          districtName: value.districtName,
          wardName: value.wardName,
          payment: value.payment || "cod",
        };

        if (
          JSON.stringify(customerInfoData) !==
          JSON.stringify(lastSentCustomerInfo.current)
        ) {
          lastSentCustomerInfo.current = customerInfoData;
          setCustomerInfo(customerInfoData);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, setCustomerInfo]);

  if (!isMounted) {
    return (
      <Card className="p-4 bg-gray-100">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-32"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-gray-100">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "firstName", label: "First Name" },
              { name: "lastName", label: "Last Name" },
              { name: "email", label: "Email" },
              { name: "phone", label: "Phone" },
            ].map(({ name, label }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as keyof FormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input placeholder={label} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          {isAuthenticated && addresses?.length > 0 && (
            <FormField
              control={form.control}
              name="addressId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Saved Address</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val);
                      handleAddressSelect(val);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose address" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Addresses</SelectLabel>
                        {addresses.map((addr: AddressProps) => (
                          <SelectItem key={addr.id ?? ""} value={addr.id ?? ""}>
                            {formatAddress(addr)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Province / City</FormLabel>
              <Select
                onValueChange={(value) => {
                  const selected = provinces.find(
                    (p: { code: string; name: string }) =>
                      p.code.toString() === value
                  );
                  if (selected) {
                    setProvinceCode(selected.code.toString());
                    form.setValue("provinceName", selected.name);
                    form.setValue("districtName", "");
                    form.setValue("wardName", "");
                    setDistrictCode("");
                  }
                }}
                value={provinceCode}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose province/city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {provinces.map((p: { code: string; name: string }) => (
                    <SelectItem key={p.code} value={p.code.toString()}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>District</FormLabel>
              <Select
                onValueChange={(value) => {
                  const selected = districts.districts.find(
                    (d: { code: string; name: string }) =>
                      d.code.toString() === value
                  );
                  if (selected) {
                    setDistrictCode(selected.code.toString());
                    form.setValue("districtName", selected.name);
                    form.setValue("wardName", "");
                  }
                }}
                value={districtCode}
                disabled={!provinceCode}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose district" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {districts.districts.map(
                    (d: { code: string; name: string }) => (
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
              name="wardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ward</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    disabled={!districtCode}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose ward" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wards.wards.map((w: { code: string; name: string }) => (
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
                  <FormLabel>Address number / Street</FormLabel>
                  <FormControl>
                    <Input placeholder="123/45 Street ABC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="payment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Options</SelectLabel>
                      <SelectItem value="cod">COD</SelectItem>
                      <SelectItem value="momo">MOMO</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <button type="submit" className="hidden" aria-hidden="true"></button>
        </form>
      </Form>
    </Card>
  );
};
