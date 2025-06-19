"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

type PromotionForm = z.infer<typeof formSchema>;

export function Promotion() {
  const form = useForm<PromotionForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = (values: PromotionForm) => {
    console.log(values);
    form.reset();
  };

  return (
    <div className="my-12">
      <h1 className="text-3xl font-semibold text-center">Promotion</h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 my-12">
        <div className="col-span-6 p-4">
          <div className="bg-white rounded-xl shadow-lg px-6 py-[13px] ">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Submit for free coupon{" "}
            </h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-black text-white">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="hidden md:block md:col-span-6 p-4">
          <Image
            src="https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl2.jpg"
            alt="hero"
            width={600}
            height={600}
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
