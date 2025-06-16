'use client';

import { Users, Star, Gem, ShieldCheck } from 'lucide-react';

const team = [
  {
    name: 'Anna Nguyen',
    role: 'Founder & CEO',
    image: ''
  },
  {
    name: 'David Tran',
    role: 'Chief Watchmaker',
    image: ''
  },
  {
    name: 'Linh Pham',
    role: 'Customer Experience Lead',
    image: ''
  }
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Gem className="w-8 h-8 mx-auto mb-4 text-emerald-600" />
          <h1 className="text-3xl font-light mb-3">About KronLux</h1>
          <p className="text-gray-600">Crafting Timeless Luxury, One Watch at a Time</p>
        </div>

        {/* Brand Story */}
        <div className="bg-gray-50 p-6 rounded-lg mb-12">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500" /> Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2020, KronLux was born from a passion for horology and a vision to make luxury timepieces accessible to discerning collectors worldwide. Each watch in our curated collection is handpicked for its craftsmanship, heritage, and timeless design.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white p-6 rounded-lg mb-12 border">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-blue-500" /> Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to deliver exceptional value, authenticity, and service. We believe every customer deserves a seamless experience, from browsing to unboxing. LuxWatch guarantees genuine products, secure transactions, and expert support at every step.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-xl font-light mb-6 flex items-center gap-2"><Users className="w-5 h-5 text-purple-500" /> Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map(member => (
              <div key={member.name} className="bg-gray-50 rounded-lg p-6 flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow"
                  onError={e => (e.currentTarget.src = '/images/brand/default.jpg')}
                />
                <h3 className="font-medium text-lg mb-1">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600">Want to know more or collaborate? Reach out at <span className="text-emerald-600 font-medium">KronLux@gmail.com</span></p>
        </div>
      </div>
    </div>
  );
}