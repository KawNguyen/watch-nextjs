"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Contact Us</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">We would love to hear from you! Fill out the form below or reach us directly via phone, email, or visit our store.</p>
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-4xl">
        {/* Contact Info Cards */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
            <Phone className="text-indigo-600" />
            <div>
              <div className="font-semibold">Phone</div>
              <div className="text-gray-500 text-sm">+1 234 567 890</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
            <Mail className="text-indigo-600" />
            <div>
              <div className="font-semibold">Email</div>
              <div className="text-gray-500 text-sm">contact@luxurywatch.com</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
            <MapPin className="text-indigo-600" />
            <div>
              <div className="font-semibold">Address</div>
              <div className="text-gray-500 text-sm">123 KronLux Ave, New York, NY</div>
            </div>
          </div>
        </div>
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 flex flex-col gap-5 animate-fade-in">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border-b-2 border-gray-200 focus:border-indigo-500 outline-none py-2 px-1 transition-all bg-transparent"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border-b-2 border-gray-200 focus:border-indigo-500 outline-none py-2 px-1 transition-all bg-transparent"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="border-b-2 border-gray-200 focus:border-indigo-500 outline-none py-2 px-1 transition-all bg-transparent resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : <><Send size={18} /> Send Message</>}
          </button>
          {sent && <div className="text-green-600 text-center font-medium mt-2">Thank you! Your message has been sent.</div>}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;