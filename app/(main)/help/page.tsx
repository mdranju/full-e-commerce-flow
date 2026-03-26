import { BackButton } from "@/components/common/BackButton";
import { HelpCircle, ChevronDown } from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    category: "Orders & Delivery",
    items: [
      { q: "How long does delivery take?", a: "Inside Dhaka: 1–3 business days. Outside Dhaka: 3–7 business days." },
      { q: "How do I track my order?", a: "You can track your order at any time using your Order ID via our Track Order page." },
      { q: "Can I cancel my order?", a: "Orders can be cancelled within 2 hours of placement. Contact our support team immediately." },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      { q: "What is your return policy?", a: "We accept returns within 7 days of delivery for items that are unused and in original packaging." },
      { q: "How do I request a refund?", a: "Submit your refund request through our Refund & Returns page or contact our support team." },
      { q: "When will I receive my refund?", a: "Refunds are processed within 5–7 business days after we receive and verify the returned item." },
    ],
  },
  {
    category: "Payments",
    items: [
      { q: "What payment methods do you accept?", a: "We currently accept Cash on Delivery (COD). Online payment options are coming soon." },
      { q: "Is Cash on Delivery available everywhere?", a: "Yes, COD is available across all districts in Bangladesh." },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <BackButton className="mb-6" />

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
          <HelpCircle size={16} />
          Help Center
        </div>
        <h1 className="text-3xl font-black text-gray-900">How can we help?</h1>
        <p className="text-gray-500 mt-2">Find answers to the most common questions below.</p>
      </div>

      <div className="space-y-10">
        {FAQS.map((section) => (
          <div key={section.category}>
            <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-blue-600 rounded-full inline-block" />
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.items.map((item) => (
                <details key={item.q} className="bg-white border border-gray-100 rounded-2xl shadow-sm group">
                  <summary className="flex items-center justify-between px-6 py-4 text-sm font-bold text-gray-900 cursor-pointer list-none">
                    {item.q}
                    <ChevronDown size={16} className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Still need help */}
      <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-white text-center">
        <h3 className="text-xl font-black mb-2">Still have questions?</h3>
        <p className="text-blue-100 text-sm mb-6">Our team is available Sat–Thu, 10AM–9PM.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact"
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
            Contact Us
          </Link>
          <Link href="/complain"
            className="bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-800 transition-colors">
            Submit a Complaint
          </Link>
        </div>
      </div>
    </div>
  );
}
