"use client";

import { useForm } from "react-hook-form";
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
import { Card } from "../ui/card";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  district: string;
  ward: string;
  city: string;
  country: string;
  payment: string;
  addressId?: string;
};

export const CustomerInfo = () => {
  const { isAuthenticated, profile } = useAuthStore();
  const { data: addresses } = useMyAddresses();

  const form = useForm<FormValues>({
    defaultValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      street: "",
      district: "",
      ward: "",
      city: "",
      country: "",
      payment: "cod",
    },
  });

  const handleAddressSelect = (id: string) => {
    const selected = addresses?.find((a: Address) => a.id === id);
    if (selected) {
      form.setValue("street", selected.street || "");
      form.setValue("district", selected.district || "");
      form.setValue("ward", selected.ward || "");
      form.setValue("city", selected.city || "");
      form.setValue("country", selected.country || "");
    }
  };

  return (
    <Card className="p-4 bg-gray-100">
      <Form {...form}>
        <form className="space-y-6">
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
                        {addresses.map((addr: Address) => (
                          <SelectItem key={addr.id ?? ""} value={addr.id ?? ""}>
                            {`${addr.street}, ${addr.ward}, ${addr.district}, ${addr.city}`}
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
            {[
              { name: "street", label: "Street" },
              { name: "ward", label: "Ward" },
              { name: "district", label: "District" },
              { name: "city", label: "City" },
              { name: "country", label: "Country" },
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
                      <SelectItem value="cod">Cash on Delivery</SelectItem>
                      <SelectItem value="momo">MOMO</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Card>
  );
};
