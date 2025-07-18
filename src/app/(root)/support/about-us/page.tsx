"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { team } from "@/constant/routes";
import {
  Users,
  Star,
  Gem,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AboutUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <Gem className="w-8 h-8 mx-auto mb-4 text-emerald-600" />
          <h1 className="text-3xl font-light mb-3">About KronLux</h1>
          <p className="text-gray-600">
            Crafting Timeless Luxury, One Watch at a Time
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-12">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" /> Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2020, KronLux was born from a passion for horology and a
            vision to make luxury timepieces accessible to discerning collectors
            worldwide. Each watch in our curated collection is handpicked for
            its craftsmanship, heritage, and timeless design.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg mb-12 border">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-500" /> Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to deliver exceptional value, authenticity, and
            service. We believe every customer deserves a seamless experience,
            from browsing to unboxing. LuxWatch guarantees genuine products,
            secure transactions, and expert support at every step.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-light mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" /> Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-gray-50 rounded-lg p-6 flex flex-col items-center"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow"
                  // onError={(e) =>
                  //   (e.currentTarget.src = "/images/brand/default.jpg")
                  // }
                />
                <h3 className="font-medium text-lg mb-1">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Want to know more or collaborate? Reach out at{" "}
            <span className="text-emerald-600 font-medium">
              KronLux@gmail.com
            </span>
          </p>
        </div>
      </div>

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
                  <p className="text-sm text-gray-500">
                    contact@luxurywatch.com
                  </p>
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
              {loading ? (
                "Sending..."
              ) : (
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
    </div>
  );
}
