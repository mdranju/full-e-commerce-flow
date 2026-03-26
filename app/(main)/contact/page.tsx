"use client";

import { BackButton } from "@/components/common/BackButton";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

const CONTACT_INFO = [
  { icon: Phone, label: "Call Us", value: "09638-090000", href: "tel:09638090000" },
  { icon: Mail, label: "Email Us", value: "cc.believerssign@gmail.com", href: "mailto:cc.believerssign@gmail.com" },
  { icon: MapPin, label: "Headquarters", value: "Mohakhali DOHS, Dhaka - 1212", href: null },
  { icon: Clock, label: "Support Hours", value: "Sat–Thu: 10AM–9PM", href: null },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <BackButton className="mb-6" />

      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-gray-900 mb-3">Contact Us</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Have a question or need help? We&apos;re here for you.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon size={18} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
            {href ? (
              <a href={href} className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors break-all">
                {value}
              </a>
            ) : (
              <p className="text-sm font-bold text-gray-900 break-words">{value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10">
        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Message Sent!</h2>
            <p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Send a Message</h2>
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Your Name *</label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Full name" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="01XXXXXXXXX" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Subject *</label>
                  <input required value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    placeholder="What is this about?" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Message *</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <button type="submit" className="w-full bg-[#0B1221] text-white py-4 rounded-2xl font-black text-sm hover:bg-gray-800 transition-colors">
                Send Message
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
