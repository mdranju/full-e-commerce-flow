import { BackButton } from "@/components/common/BackButton";
import { HelpCircle, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    category: "Orders & Delivery",
    items: [
      {
        q: "How long does delivery take?",
        a: "Inside Dhaka: 1–3 business days. Outside Dhaka: 3–7 business days.",
      },
      {
        q: "How do I track my order?",
        a: "You can track your order at any time using your Order ID via our Track Order page.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled within 2 hours of placement. Contact our support team immediately.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 7 days of delivery for items that are unused and in original packaging.",
      },
      {
        q: "How do I request a refund?",
        a: "Submit your refund request through our Refund & Returns page or contact our support team.",
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 5–7 business days after we receive and verify the returned item.",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We currently accept Cash on Delivery (COD). Online payment options are coming soon.",
      },
      {
        q: "Is Cash on Delivery available everywhere?",
        a: "Yes, COD is available across all districts in Bangladesh.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="relative h-[40vh] bg-[#0B1221] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/40 to-[#0B1221] opacity-80" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-40" />

        <div className="absolute top-8 left-8 z-20">
          <BackButton className="bg-white/10 text-white backdrop-blur-md border-white/10 hover:bg-white/20 rounded-full" />
        </div>

        <div className="relative z-10 text-center px-6 mt-12">
          <p className="text-sky-400 text-[10px] sm:text-xs font-black tracking-[0.5em] md:tracking-[0.8em] uppercase mb-4 md:mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
            Support Center
          </p>
          <h1 className="hero-display text-4xl md:text-6xl text-white uppercase tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            How Can We Help?
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24 -mt-12 sm:-mt-20 relative z-20">
        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-black/5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <div className="space-y-12">
            {FAQS.map((section) => (
              <div
                key={section.category}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                style={{ animationDelay: "400ms" }}
              >
                <h2 className="text-sm font-black text-[#0B1221] uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-sky-500" />
                  {section.category}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <details
                      key={item.q}
                      className="group bg-gray-50/50 border border-black/5 rounded-[1.5rem] overflow-hidden transition-all duration-300 hover:shadow-lg hover:bg-white"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none outline-none">
                        <span className="text-base font-bold text-[#0B1221] group-open:text-sky-600 transition-colors">
                          {item.q}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-black/5 group-open:bg-sky-500 group-open:border-sky-500 transition-all">
                          <ChevronDown
                            size={16}
                            className="text-gray-400 group-open:text-white group-open:rotate-180 transition-transform duration-300 flex-shrink-0"
                          />
                        </div>
                      </summary>
                      <div className="px-6 pb-6 pt-2 text-sm text-gray-600 leading-relaxed border-t border-black/[0.03]">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Still need help */}
          <div className="mt-20 bg-[#0B1221] rounded-[2rem] p-10 text-white text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-600/30 to-indigo-600/30 opacity-50 group-hover:scale-105 transition-transform duration-1000" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HelpCircle size={32} className="text-sky-400" />
              </div>
              <h3 className="hero-display text-3xl tracking-tighter mb-4 uppercase">
                Still have questions?
              </h3>
              <p className="text-white/60 text-sm font-medium mb-8 max-w-sm mx-auto">
                Our support team is available from Sat–Thu, 10AM–9PM to assist
                you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0B1221] px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-sky-50 hover:scale-105 transition-all"
                >
                  Contact Us <ChevronRight size={14} />
                </Link>
                <Link
                  href="/complain"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 hover:scale-105 transition-all"
                >
                  Complain Box <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
