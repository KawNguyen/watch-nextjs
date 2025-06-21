"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 2500);
    }, 1200);
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
        Contact Us
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        We would love to hear from you! Fill out the form below or reach us
        directly via phone, email, or visit our store.
      </p>

      <div className="grid md:grid-cols-2 gap-10 w-full max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center gap-4">
              <Phone className="text-indigo-600" />
              <div>
                <CardTitle className="text-base">Phone</CardTitle>
                <p className="text-sm text-gray-500">+1 234 567 890</p>
              </div>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center gap-4">
              <Mail className="text-indigo-600" />
              <div>
                <CardTitle className="text-base">Email</CardTitle>
                <p className="text-sm text-gray-500">contact@luxurywatch.com</p>
              </div>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center gap-4">
              <MapPin className="text-indigo-600" />
              <div>
                <CardTitle className="text-base">Address</CardTitle>
                <p className="text-sm text-gray-500">
                  123 KronLux Ave, New York, NY
                </p>
              </div>
            </CardHeader>
          </Card>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-8 flex flex-col gap-5 animate-fade-in"
        >
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : (
              <>
                <Send size={18} className="mr-2" /> Send Message
              </>
            )}
          </Button>
          {sent && (
            <div className="text-green-600 text-center font-medium mt-2">
              Thank you! Your message has been sent.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
