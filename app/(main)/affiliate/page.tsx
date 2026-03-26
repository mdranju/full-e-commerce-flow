"use client";

import { BackButton } from "@/components/common/BackButton";
import { useState } from "react";
import { Users, TrendingUp, Gift, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

const BENEFITS = [
  { icon: TrendingUp, title: "Earn Commission", desc: "Earn up to 10% commission on every sale you refer through your unique affiliate link." },
  { icon: Users, title: "Grow Together", desc: "Join a community of passionate affiliates and grow your income alongside the Believers brand." },
  { icon: Gift, title: "Exclusive Rewards", desc: "Get access to exclusive deals, early product launches, and special incentives for top performers." },
];

const FAQS = [
  { q: "How do I get my affiliate link?", a: "After submitting your application, your unique affiliate link will be emailed to you within 2–3 business days." },
  { q: "When do I get paid?", a: "Commissions are paid out monthly via bKash or bank transfer, with a minimum threshold of 500৳." },
  { q: "Who can become an affiliate?", a: "Anyone! Whether you're a social media influencer, blogger, or just someone with a network, you can join." },
];

export default function AffiliatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", platform: "", followers: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <BackButton className="mb-6" />

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
          <Users size={16} />
          Affiliate Program
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">Join as an Affiliate</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
          Partner with Believers and earn while sharing products you love. It&apos;s free to join and easy to start.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
        {BENEFITS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
              <Icon size={22} />
            </div>
            <h3 className="font-black text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Application Form */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10 mb-12">
        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Application Submitted!</h2>
            <p className="text-gray-500">We&apos;ll review your application and get back to you within 2–3 business days.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Apply Now</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Phone *</label>
                  <input required type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="01XXXXXXXXX" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Platform (Facebook, YouTube, etc.)</label>
                  <input value={form.platform} onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))}
                    placeholder="Facebook / Instagram" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Approximate Followers / Reach</label>
                <input value={form.followers} onChange={(e) => setForm((f) => ({ ...f, followers: e.target.value }))}
                  placeholder="e.g. 5,000" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-colors mt-2">
                Submit Application
              </button>
            </form>
          </>
        )}
      </div>

      {/* FAQs */}
      <div>
        <h2 className="text-2xl font-black text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-sm font-bold text-gray-900 text-left"
              >
                {faq.q}
                {openFaq === i ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
