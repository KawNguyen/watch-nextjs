"use client";

import React, { useState } from "react";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  review: z.string().min(1, "Review is required"),
  rating: z.number().min(1, "Rating is required"),
});

type ReviewFormValues = z.infer<typeof formSchema>;

export function ReviewForm() {
  const [hoverRating, setHoverRating] = useState(0);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      review: "",
      rating: 0,
    },
  });

  const onSubmit = (values: ReviewFormValues) => {
    console.log(values);
    form.reset();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg px-6 py-[13px] ">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Review Form</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        type="button"
                        variant="ghost"
                        onClick={() => field.onChange(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1"
                      >
                        <StarIcon
                          size={24}
                          className={`transition-colors duration-200 ${
                            star <= (hoverRating || field.value)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Feeling</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Write your review..."
                    className="resize-none"
                    {...field}
                  />
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
  );
}
