"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { faqs } from "@/constant/routes";

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
          Câu hỏi thường gặp
          <span className="text-gray-600 text-base ml-2">
            (FAQ - Câu hỏi thường gặp)
          </span>
        </h1>
      </div>
      <div className="w-full max-w-2xl space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-5 transition-all"
          >
            <Button
              className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 focus:outline-none"
              variant="ghost"
              onClick={() => toggleFAQ(idx)}
              aria-expanded={openIndex === idx}
            >
              {faq.question}
              {openIndex === idx ? (
                <ChevronUp className="text-indigo-600" />
              ) : (
                <ChevronDown className="text-indigo-600" />
              )}
            </Button>
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
