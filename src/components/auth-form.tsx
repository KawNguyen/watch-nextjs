"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMemo } from "react";
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
import { googleLogin } from "@/lib/google-login";
import { RegisterTypes, SignInTypes } from "@/types/auth";

export interface AuthField {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  validation: z.ZodTypeAny;
}

interface AuthFormProps {
  mode?: "signin" | "register";
  onSubmit?: (data: RegisterTypes | SignInTypes) => void;
  className?: string;
  isPending?: boolean;
  fields: AuthField[];
}

export function AuthForm({
  mode = "signin",
  onSubmit,
  className = "",
  isPending,
  fields,
}: AuthFormProps) {
  const schema = useMemo(() => {
    return z.object(
      fields.reduce(
        (acc, field) => {
          acc[field.name] = field.validation;
          return acc;
        },
        {} as Record<string, z.ZodTypeAny>,
      ),
    );
  }, [fields]);

  type FormData = z.infer<typeof schema>;

  const defaultValues = useMemo(() => {
    return fields.reduce(
      (acc, field) => {
        acc[field.name] = "";
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [fields]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = (data: FormData) => {
    onSubmit?.(data as RegisterTypes | SignInTypes);
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
            ? "Enter your credentials to access your account"
            : "Fill the form to register"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={field.type || "text"}
                        placeholder={field.placeholder || ""}
                        {...f}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

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
                    Don&apos;t have an account?{" "}
                  </span>
                  <Link href="/sign-up">Sign Up</Link>
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
