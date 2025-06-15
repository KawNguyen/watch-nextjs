'use client';

import { useState } from 'react';
import { HandCoins, CreditCard, Shield, Clock, ChevronDown, ChevronRight } from 'lucide-react';


const sections = [
  {
    key: 'overview',
    icon: <HandCoins className="w-5 h-5 text-emerald-600" />, 
    title: 'Refund Policy Overview',
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          At LuxWatch, customer satisfaction is our top priority. If you are not completely satisfied with your purchase, you may request a refund or exchange under the conditions outlined below.
        </p>
      </>
    )
  },
  {
    key: 'eligibility',
    icon: <Shield className="w-5 h-5 text-blue-600" />, 
    title: 'Eligibility for Refunds',
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          To be eligible for a refund, your item must be unused, in the same condition that you received it, and in its original packaging. Refund requests must be made within 30 days of delivery.
        </p>
      </>
    )
  },
  {
    key: 'process',
    icon: <CreditCard className="w-5 h-5 text-purple-600" />, 
    title: 'Refund Process',
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          To initiate a refund, please contact our support team at support@luxwatch.com with your order details. Once your return is received and inspected, we will notify you of the approval or rejection of your refund.
        </p>
        <ul className="list-disc ml-6 mt-2 text-sm text-gray-600">
          <li>Approved refunds will be processed to your original payment method within 5-7 business days.</li>
          <li>Shipping costs are non-refundable unless the return is due to our error.</li>
        </ul>
      </>
    )
  },
  {
    key: 'exceptions',
    icon: <Clock className="w-5 h-5 text-yellow-600" />, 
    title: 'Exceptions & Non-Refundable Items',
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          Certain items are non-refundable, including gift cards, custom orders, and items marked as final sale. Watches showing signs of wear or damage not due to our error are not eligible for refund.
        </p>
      </>
    )
  }
];

export default function RefundPolicyPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setExpanded(expanded === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
        <HandCoins className="w-8 h-8 mx-auto mb-4 text-gray-700" />
          <h1 className="text-3xl font-light mb-3">Refund Policy</h1>
          <p className="text-gray-600">LuxWatch - Premium Watch E-commerce Platform</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 15, 2024</p>
        </div>
        <div className="space-y-4">
          {sections.map(section => (
            <div key={section.key} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.key)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {section.icon}
                  <span className="font-light">{section.title}</span>
                </div>
                <span className="text-gray-400">
                  {expanded === section.key ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </span>
              </button>
              {expanded === section.key && (
                <div className="p-4 bg-gray-50 border-t">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}