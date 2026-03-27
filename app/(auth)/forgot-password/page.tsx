"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/src/store/slices/authSlice";
import { RootState, AppDispatch } from "@/src/store/store";
import { premiumToast as toast } from "@/components/ui/PremiumToast";
import { ArrowLeft, Mail, Smartphone } from "lucide-react";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Email Required", {
        description: "Please enter your email or phone number to continue.",
      });
      return;
    }

    const resultAction = await dispatch(forgotPassword(email));
    if (forgotPassword.fulfilled.match(resultAction)) {
      toast.success("OTP Sent! 📧", {
        description:
          "A 6-digit verification code has been sent to your account.",
      });
      // Pass email to verify-otp page via router state (modern Next.js handling usually uses URL params or global state, here we'll use state if possible or just assume email is in redux if needed)
      // For simplicity in this flow, we'll use URL search params to pass the email/phone
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } else {
      toast.error("Failed to Send OTP", {
        description:
          (resultAction.payload as string) ||
          "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-[#F8FAFC]">
      {/* Soft Ambient Glow Elements */}
      <div className="absolute top-0 right-0 w-[1000px] h-[700px] bg-blue-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="w-full max-md max-w-md relative z-10">
        <div className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-black/5 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.06)] backdrop-blur-3xl">
          <div className="text-center mb-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#0B1221]/40 hover:text-[#0B1221] mb-8 transition-colors group"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Login
            </Link>
            <p className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase mb-4">
              Forgot Password
            </p>
            <h1 className="hero-display text-[#0B1221] text-4xl mb-4 tracking-tighter">
              Reset Password.
            </h1>
            <p className="text-[#0B1221]/40 text-sm font-medium px-4 leading-relaxed">
              Enter your email or phone to receive a 6-digit verification code.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group space-y-1.5">
              <label className="text-[10px] font-black text-[#0B1221]/40 uppercase tracking-widest ml-4 group-focus-within:text-blue-600 transition-colors">
                Email or Phone
              </label>
              <div className="flex items-center bg-gray-50 border border-black/5 rounded-2xl px-5 py-4 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-blue-500/5 transition-all duration-300">
                <input
                  type="text"
                  placeholder="name@example.com"
                  className="w-full bg-transparent outline-none text-[#0B1221] text-sm placeholder:text-[#0B1221]/20 font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0B1221] text-white h-16 rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-black/10 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>

          <div className="mt-12 text-center pt-8 border-t border-black/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-black/20">
              Facing issues?{" "}
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-700 font-black transition-colors"
              >
                Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
