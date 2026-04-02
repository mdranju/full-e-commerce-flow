"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/src/store/slices/authSlice";
import { RootState, AppDispatch } from "@/src/store/store";
import { premiumToast as toast } from "@/components/ui/PremiumToast";
import { ArrowLeft, Mail, Smartphone, AlertCircle } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setValidationError("Field is required");
      return;
    }

    const resultAction = await dispatch(forgotPassword(email));
    if (forgotPassword.fulfilled.match(resultAction)) {
      toast.success("OTP Sent! 📧", {
        description:
          "A 6-digit verification code has been sent to your account.",
      });
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } else {
      toast.error("Failed to Send OTP", {
        description:
          (resultAction.payload as string) ||
          "Something went wrong. Please try again.",
      });
    }
  };

  const handleInputChange = (val: string) => {
    setEmail(val);
    if (validationError) setValidationError(null);
  };

  return (
    <div className="flex items-center justify-center px-4 py-20 relative overflow-hidden bg-[#F8FAFC]">
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group space-y-1.5 overflow-hidden">
              <label
                className={`text-[10px] font-black uppercase tracking-widest ml-4 transition-colors ${validationError ? "text-red-500" : "text-[#0B1221]/40 group-focus-within:text-blue-600"}`}
              >
                Email or Phone
              </label>
              <div
                className={`flex items-center bg-gray-50 border rounded-2xl px-5 py-4 transition-all duration-300 ${validationError ? "border-red-500 bg-red-50/20" : "border-black/5 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-blue-500/5"}`}
              >
                <input
                  type="text"
                  placeholder="name@example.com / 017XXXXXXXX"
                  className="w-full bg-transparent outline-none text-[#0B1221] text-sm placeholder:text-[#0B1221]/20 font-medium"
                  value={email}
                  onChange={(e) => handleInputChange(e.target.value)}
                  disabled={isLoading}
                />
                {validationError && (
                  <AlertCircle size={18} className="text-red-500" />
                )}
              </div>
              <AnimatePresence>
                {validationError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-500 text-[9px] font-bold uppercase tracking-widest ml-4 mt-1"
                  >
                    {validationError}
                  </motion.p>
                )}
              </AnimatePresence>
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
