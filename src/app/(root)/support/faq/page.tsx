"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our collection, add your desired watch to the cart, and proceed to checkout. Follow the on-screen instructions to complete your purchase.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept major credit cards, PayPal, and bank transfers.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email. Use it to track your shipment on our website or the courier's site.",
  },
  {
    question: "What is your return policy?",
    answer:
      "You can return any unworn watch within 14 days of delivery for a full refund. Please see our Return Policy page for details.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. Shipping fees and delivery times vary by destination.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center py-12 px-4">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="text-indigo-600" size={32} />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h1>
      </div>
      <div className="w-full max-w-2xl space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-5 transition-all"
          >
            <button
              className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 focus:outline-none"
              onClick={() => toggleFAQ(idx)}
              aria-expanded={openIndex === idx}
            >
              {faq.question}
              {openIndex === idx ? (
                <ChevronUp className="text-indigo-600" />
              ) : (
                <ChevronDown className="text-indigo-600" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <p className="text-gray-600 text-base">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
