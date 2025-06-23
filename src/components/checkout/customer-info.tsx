"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
};

export const CustomerInfo = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      district: "",
      ward: "",
      city: "",
      country: "",
      payment: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Customer Data", data);
  };

  return (
    <Card className="p-4 bg-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Customer Information
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              rules={{ required: "Last name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^\d{9,11}$/,
                  message: "Phone must be 9–11 digits",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="0123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-900 mb-4">
              Shipping Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="street"
                rules={{ required: "Street is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Avenue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                rules={{ required: "District is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input placeholder="District 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ward"
                rules={{ required: "Ward is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ward</FormLabel>
                    <FormControl>
                      <Input placeholder="Ward 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Ho Chi Minh City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Vietnam" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             <FormField
  control={form.control}
  name="payment"
  rules={{ required: "Payment is required" }}
  render={({ field }) => (
    <FormItem>
      <FormLabel>Payment Method</FormLabel>
      <Select
        onValueChange={field.onChange}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Payments</SelectLabel>
            <SelectItem value="cod">Cash on Delivery (COD)</SelectItem>
            <SelectItem value="momo">MOMO</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

            </div>
          </div>
          <Button
            type="submit"
            className="px-4 py-2 w-full bg-black text-white rounded-md hover:cursor-pointer"
          >
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
};
