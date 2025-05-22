"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { googleLogin } from "@/lib/auth";

const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SigninFormData = z.infer<typeof signinSchema>;
export type RegisterFormData = z.infer<typeof signinSchema>;

interface AuthFormProps {
  mode?: "signin" | "register";
  onSubmit?: (data: SigninFormData | RegisterFormData) => void;
  className?: string;
  isPending?: boolean;
}

export function AuthForm({
  mode = "signin",
  onSubmit,
  className = "",
  isPending,
}: AuthFormProps) {
  const schema = signinSchema;
  const form = useForm<SigninFormData | RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: SigninFormData | RegisterFormData) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const handleGoogleSignIn = () => {
    googleLogin();
  };

  return (
    <Card className={`w-[400px] ${className}`}>
      <CardHeader>
        <CardTitle>
          {mode === "signin" ? "Sign In" : "Create an Account"}
        </CardTitle>
        <CardDescription>
          {mode === "signin"
            ? "Enter your email and password to sign in"
            : "Enter your information to create an account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    In progress ...
                  </>
                ) : mode === "signin" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>

              {mode === "signin" && (
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    Don&apos;t have an account? {""}
                  </span>
                  <Link href="/register">Sign Up</Link>
                </div>
              )}

              {mode === "register" && (
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    Already have an account?{" "}
                  </span>
                  <Link href="/sign-in">Sign in</Link>
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                <Image
                  src="svg/google.svg"
                  alt="Google"
                  className="h-5 w-5 mr-2"
                  width={24}
                  height={24}
                />
                Sign in with Google
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
