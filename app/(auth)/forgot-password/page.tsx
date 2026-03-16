"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/src/store/slices/authSlice";
import { RootState, AppDispatch } from "@/src/store/store";
import { toast } from "sonner";
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
        description: "A 6-digit verification code has been sent to your account.",
      });
      // Pass email to verify-otp page via router state (modern Next.js handling usually uses URL params or global state, here we'll use state if possible or just assume email is in redux if needed)
      // For simplicity in this flow, we'll use URL search params to pass the email/phone
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } else {
        toast.error("Failed to Send OTP", {
            description: resultAction.payload as string || "Something went wrong. Please try again.",
        });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 opacity-10 pointer-events-none">
        <div className="w-full h-full border-2 border-[#0A1128] rotate-45"></div>
      </div>
      <div className="absolute bottom-20 right-10 w-32 h-32 opacity-10 pointer-events-none">
        <div className="w-full h-full rounded-full border-2 border-[#0A1128]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6 transition-colors">
            <ArrowLeft size={16} />
            Back to Login
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
          <p className="text-gray-600 px-4">
            Enter your email or phone number and we'll send you a verification code
          </p>
        </div>

        <div className="bg-white p-2 md:p-4 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium">
                Email or Phone Number
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-3.5 focus-within:border-black transition-colors bg-gray-50/30">
                <input
                  type="text"
                  placeholder="name@example.com or 017XXXXXXXX"
                  className="w-full outline-none text-gray-900 text-sm bg-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0A1128] text-white py-4 rounded-lg font-bold hover:bg-black transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
                Facing issues? <Link href="/contact" className="text-[#0A1128] font-bold hover:underline">Contact Support</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
