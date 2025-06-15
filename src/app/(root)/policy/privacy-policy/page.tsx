'use client';

import { useState } from 'react';
import { Shield, Eye, Lock, UserCircle, Bell, Server, ChevronDown, ChevronRight } from 'lucide-react';



export default function PrivacyPolicyPage() {
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
        {/* Header Section */}
        <div className="text-center mb-12">
          <Shield className="w-8 h-8 mx-auto mb-4 text-gray-700" />
          <h1 className="text-3xl font-light mb-3">Privacy Policy</h1>
          <p className="text-gray-600">LuxWatch - Premium Watch E-commerce Platform</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 15, 2024</p>
        </div>

        {/* Introduction Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-12">
          <h2 className="text-xl font-light mb-4">Your Privacy Matters</h2>
          <p className="text-gray-600 leading-relaxed">
            At LuxWatch, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal
            information when you use our website and services. We are committed to maintaining the trust and confidence of our
            valued customers.
          </p>
        </div>

        {/* Key Privacy Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg">
            <Lock className="w-6 h-6 text-blue-600 mb-3" />
            <h3 className="font-medium mb-2">Secure Shopping</h3>
            <p className="text-sm text-gray-600">SSL encrypted transactions</p>
          </div>

          <div className="bg-emerald-50 p-6 rounded-lg">
            <Eye className="w-6 h-6 text-emerald-600 mb-3" />
            <h3 className="font-medium mb-2">Data Transparency</h3>
            <p className="text-sm text-gray-600">Clear data usage policies</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <Shield className="w-6 h-6 text-purple-600 mb-3" />
            <h3 className="font-medium mb-2">GDPR Compliant</h3>
            <p className="text-sm text-gray-600">European privacy standards</p>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <button 
              onClick={() => toggleSection('information')} 
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <UserCircle className="w-5 h-5 text-gray-600" />
                <span className="font-light">Information We Collect</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === 'information' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </span>
            </button>
            {expandedSection === 'information' && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  We collect personal information that you voluntarily provide to us when you register on our website, place an order, subscribe to our newsletter, or contact our customer service. This may include your name, email address, shipping address, phone number, and payment information.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  We also automatically collect certain information about your device, including your IP address, browser type, and browsing patterns through cookies and similar technologies.
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <button 
              onClick={() => toggleSection('usage')} 
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Server className="w-5 h-5 text-gray-600" />
                <span className="font-light">How We Use Your Data</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === 'usage' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </span>
            </button>
            {expandedSection === 'usage' && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use your personal information to process and fulfill your orders, communicate with you about your purchases, provide customer support, and send you marketing communications if you ve opted in.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  We also use your data to improve our website, analyze usage patterns, prevent fraud, and comply with legal obligations.
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <button 
              onClick={() => toggleSection('security')} 
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <span className="font-light">Data Security</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === 'security' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </span>
            </button>
            {expandedSection === 'security' && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  All payment transactions are encrypted using SSL technology, and we do not store your full credit card information on our servers.
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <button 
              onClick={() => toggleSection('communication')} 
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="font-light">Communication Preferences</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === 'communication' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </span>
            </button>
            {expandedSection === 'communication' && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  You can manage your communication preferences by updating your account settings or clicking the unsubscribe link in our marketing emails.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  We will still send you service-related communications, such as order confirmations and important account notifications, even if you opt out of marketing communications.
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <button 
              onClick={() => toggleSection('rights')} 
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-gray-600" />
                <span className="font-light">Your Privacy Rights</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === 'rights' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </span>
            </button>
            {expandedSection === 'rights' && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, delete, or restrict processing of your data.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  To exercise these rights, please contact us at privacy@luxwatch.com with your specific request.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>For privacy-related inquiries, please contact us at:</p>
          <p className="mt-1">privacy@luxwatch.com</p>
        </div>
      </div>
    </div>
  )
}