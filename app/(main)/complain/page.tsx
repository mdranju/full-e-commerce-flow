"use client";

import { BackButton } from "@/components/common/BackButton";
import { useState } from "react";
import { MessageSquare, CheckCircle } from "lucide-react";

export default function ComplainPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", orderId: "", type: "Product Issue", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <BackButton className="mb-6" />

      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl">
          <MessageSquare size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900">Complain Box</h1>
          <p className="text-gray-500 text-sm mt-0.5">We take every complaint seriously and respond within 24 hours.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Complaint Submitted</h2>
            <p className="text-gray-500">
              Thank you for reaching out. Our support team will respond within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Order ID (if applicable)</label>
                <input value={form.orderId} onChange={(e) => setForm((f) => ({ ...f, orderId: e.target.value }))}
                  placeholder="ORD-XXXXXXXX" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">Complaint Type *</label>
              <select required value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500">
                <option>Product Issue</option>
                <option>Delivery Problem</option>
                <option>Wrong Item Received</option>
                <option>Payment Issue</option>
                <option>Customer Service</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">Describe Your Issue *</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Please describe your issue in detail..."
                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
            <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-sm hover:bg-orange-600 transition-colors">
              Submit Complaint
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
