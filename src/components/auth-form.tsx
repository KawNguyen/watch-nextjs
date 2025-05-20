"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = signinSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type SigninFormData = z.infer<typeof signinSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthFormProps {
  mode?: "signin" | "register";
  onSubmit?: (data: SigninFormData | RegisterFormData) => void;
  className?: string;
}

export function AuthForm({ mode = "signin", onSubmit, className = "" }: AuthFormProps) {
  const schema = mode === "signin" ? signinSchema : registerSchema;
  const form = useForm<SigninFormData | RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(mode === "register" && { name: "" }),
    },
  });

  const handleSubmit = (data: SigninFormData | RegisterFormData) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <Card className={`w-[400px] ${className}`}>
      <CardHeader>
        <CardTitle>{mode === "signin" ? "Sign In" : "Create an Account"}</CardTitle>
        <CardDescription>
          {mode === "signin" 
            ? "Enter your email and password to sign in" 
            : "Enter your information to create an account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {mode === "register" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {mode === "signin" ? "Sign In" : "Create Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}