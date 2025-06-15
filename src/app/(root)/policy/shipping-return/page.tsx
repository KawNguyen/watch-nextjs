'use client';

import { useState } from 'react';
import { Truck, RotateCcw, Package, Clock, ChevronDown, ChevronRight } from 'lucide-react';


const sections = [
  {
    key: 'shipping',
    icon: <Truck className="w-5 h-5 text-emerald-600" />, 
    title: 'Shipping Policy',
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          We offer free worldwide shipping on all orders. Orders are processed within 1-2 business days. Delivery times vary by destination:
        </p>
        <ul className="list-disc ml-6 mt-2 text-sm text-gray-600">
          <li>Domestic (Vietnam): 2-5 business days</li>
          <li>Asia: 5-10 business days</li>
          <li>International: 7-14 business days</li>
        </ul>
        <p className="text-sm text-gray-600 leading-relaxed mt-2">
          All shipments include tracking information, which will be sent to your email once dispatched.
        </p>
      </>
    )
  },
  {
    key: 'packaging',
    icon: <Package className="w-5 h-5 text-blue-600" />, 
    title: 'Packaging & Insurance',
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          Each watch is securely packaged in a branded LuxWatch box and insured for its full value during transit. Please inspect your package upon arrival and contact us immediately if you notice any damage.
        </p>
      </>
    )
  },
  {
    key: 'returns',
    icon: <RotateCcw className="w-5 h-5 text-purple-600" />, 
    title: 'Return & Exchange Policy',
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          We accept returns and exchanges within 30 days of delivery for unworn, undamaged watches in their original packaging. To initiate a return or exchange, please contact our support team at support@luxwatch.com.
        </p>
        <ul className="list-disc ml-6 mt-2 text-sm text-gray-600">
          <li>Return shipping costs are the responsibility of the customer unless the return is due to our error.</li>
          <li>Refunds are processed within 5-7 business days after we receive and inspect the returned item.</li>
        </ul>
      </>
    )
  },
  {
    key: 'warranty',
    icon: <Clock className="w-5 h-5 text-yellow-600" />, 
    title: 'Warranty & Repairs',
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          All LuxWatch timepieces come with a 2-year international warranty covering manufacturing defects and mechanical failures under normal use. For warranty claims or repairs, please email warranty@luxwatch.com with your order details.
        </p>
      </>
    )
  }
];

export default function ShippingReturnPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setExpanded(expanded === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <Truck className="w-8 h-8 mx-auto mb-4 text-gray-700" />
          <h1 className="text-3xl font-light mb-3">Shipping & Return</h1>
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