"use client";

import { useState } from "react";
import {
  Lock,
  Truck,
  Clock,
  CreditCard,
  Package,
  RotateCcw,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function TermOfUsePage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <Lock className="w-8 h-8 mx-auto mb-4 text-gray-700" />
          <h1 className="text-3xl font-light mb-3">Terms of Use</h1>
          <p className="text-gray-600">
            KronLux - Premium Watch E-commerce Platform
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: January 15, 2024
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-12">
          <h2 className="text-xl font-light mb-4">Welcome to KronLux</h2>
          <p className="text-gray-600 leading-relaxed">
            These Terms of Use govern your access to and use of the KronLux
            website and services. KronLux is a premium timepiece retailer
            offering luxury watches with free worldwide shipping and
            comprehensive 2-year warranty. By using our platform, you agree to
            these terms and our commitment to providing exceptional timepieces
            and customer service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-emerald-50 p-6 rounded-lg">
            <Truck className="w-6 h-6 text-emerald-600 mb-3" />
            <h3 className="font-medium mb-2">Free Shipping</h3>
            <p className="text-sm text-gray-600">
              Worldwide delivery on all orders
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <Clock className="w-6 h-6 text-blue-600 mb-3" />
            <h3 className="font-medium mb-2">2-Year Warranty</h3>
            <p className="text-sm text-gray-600">
              Comprehensive coverage included
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <Clock className="w-6 h-6 text-purple-600 mb-3" />
            <h3 className="font-medium mb-2">24/7 Support</h3>
            <p className="text-sm text-gray-600">Customer service: 1900-1234</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("acceptance")}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <span className="font-light">Acceptance of Terms</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === "acceptance" ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </span>
            </button>
            {expandedSection === "acceptance" && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  By accessing or using the LuxWatch website, you agree to be
                  bound by these Terms of Use and all applicable laws and
                  regulations. If you do not agree with any of these terms, you
                  are prohibited from using or accessing this site.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  We reserve the right to modify these terms at any time. Your
                  continued use of the website following the posting of changes
                  constitutes your acceptance of those changes.
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("product")}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-gray-600" />
                <span className="font-light">
                  Product Information & Availability
                </span>
              </div>
              <span className="text-gray-400">
                {expandedSection === "product" ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </span>
            </button>
            {expandedSection === "product" && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  We strive to provide accurate product information and imagery.
                  However, we do not warrant that product descriptions or other
                  content is accurate, complete, reliable, current, or
                  error-free.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  Product availability is subject to change without prior
                  notice. We reserve the right to limit quantities of any
                  product purchased by each customer.
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("orders")}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span className="font-light">Orders & Payment</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === "orders" ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </span>
            </button>
            {expandedSection === "orders" && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  All orders are subject to acceptance and availability. We
                  accept major credit cards, PayPal, and bank transfers as
                  payment methods. All payments are processed securely through
                  our payment partners.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  Prices are subject to change without notice. We reserve the
                  right to refuse any order placed with us.
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("shipping")}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-600" />
                <span className="font-light">Shipping & Delivery</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === "shipping" ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </span>
            </button>
            {expandedSection === "shipping" && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  We offer free worldwide shipping on all orders. Delivery times
                  vary depending on your location, typically 3-7 business days
                  for domestic orders and 7-14 business days for international
                  orders.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  All shipments include tracking information that will be
                  provided via email once your order is dispatched.
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("warranty")}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="font-light">2-Year Warranty Policy</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === "warranty" ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </span>
            </button>
            {expandedSection === "warranty" && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  All watches purchased from LuxWatch come with a comprehensive
                  2-year international warranty covering manufacturing defects
                  and mechanical failures under normal use.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  The warranty does not cover damage resulting from accidents,
                  misuse, unauthorized repairs, or normal wear and tear.
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("returns")}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-gray-600" />
                <span className="font-light">Returns & Exchanges</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === "returns" ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </span>
            </button>
            {expandedSection === "returns" && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  We offer a 30-day return policy for all unworn and undamaged
                  watches in their original packaging. Return shipping costs are
                  the responsibility of the customer unless the return is due to
                  our error.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  To initiate a return or exchange, please contact our customer
                  service team at support@luxwatch.com.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
