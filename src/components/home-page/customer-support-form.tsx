"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { supportApi } from "@/services/suppport";
import { toast } from "sonner";

const CustomerSupportForm = () => {
  const [form, setForm] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const createSupportTicket = useMutation({
    mutationFn: async (data: {
      email: string;
      subject: string;
      message: string;
    }) => {
      const response = await supportApi.createSupportTicket(data);
      return response;
    },
    onSuccess: () => {
      toast.success("Yêu cầu hỗ trợ đã được gửi thành công!");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    
    createSupportTicket.mutate(form);
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Bạn cần hỗ trợ gì?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <Label htmlFor="subject">Chủ đề</Label>
            <Input
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              placeholder="Mã đơn hàng hoặc số điện thoại"
            />
          </div>

          <div>
            <Label htmlFor="message">Nội dung</Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Mô tả vấn đề hoặc câu hỏi của bạn"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={createSupportTicket.isPending}
          >
            {createSupportTicket.isPending ? "Đang gửi..." : "Gửi yêu cầu"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomerSupportForm;
