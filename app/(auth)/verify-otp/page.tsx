"use client";

import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, forgotPassword } from "@/src/store/slices/authSlice";
import { RootState, AppDispatch } from "@/src/store/store";
import { premiumToast as toast } from "@/components/ui/PremiumToast";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!email) {
      router.push("/forgot-password");
    }
  }, [email, router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus next or submit
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (value && index === 5) {
        // Option 1: Trigger Verify On Last Digit
        // Option 2: Wait for user click (user prefers auto-submit if possible)
        handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    
    const resultAction = await dispatch(forgotPassword(email));
    if (forgotPassword.fulfilled.match(resultAction)) {
      setTimer(60);
      toast.success("OTP Resent", {
        description: "A new 6-digit code has been sent to your email/phone.",
      });
    }
  };

  const handleVerify = async (otpString?: string) => {
    const finalOtp = otpString || otp.join("");
    if (finalOtp.length < 6) {
      toast.warning("Incomplete OTP", {
        description: "Please enter the full 6-digit code.",
      });
      return;
    }

    const resultAction = await dispatch(verifyOtp({ email, otp: finalOtp }));
    if (verifyOtp.fulfilled.match(resultAction)) {
      toast.success("OTP Verified! ✅", {
        description: "You can now reset your password.",
      });
      // Pass email and OTP to reset page
      router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(finalOtp)}`);
    } else {
        toast.error("Verification Failed", {
            description: resultAction.payload as string || "Invalid or expired code.",
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-[#F8FAFC]">
      {/* Soft Ambient Glow Elements */}
      <div className="absolute top-0 right-0 w-[1000px] h-[700px] bg-blue-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-black/5 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.06)] backdrop-blur-3xl text-center">
          <div className="mb-10">
            <Link href="/forgot-password" title="Back" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#0B1221]/40 hover:text-[#0B1221] mb-8 transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Link>
            <p className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase mb-4">
              Enter OTP
            </p>
            <h1 className="hero-display text-[#0B1221] text-4xl mb-4 tracking-tighter">
              Verify Code.
            </h1>
            <p className="text-[#0B1221]/40 text-sm font-medium px-4 leading-relaxed">
              Enter the 6-digit code sent to <br />
              <span className="text-[#0B1221] font-bold underline decoration-blue-600 underline-offset-4">{email || "your mobile"}</span>
            </p>
          </div>

          <div className="grid grid-cols-6 gap-3 mb-12">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => { inputRefs.current[idx] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-full aspect-square text-center text-xl font-black bg-gray-50 border border-black/5 rounded-2xl text-[#0B1221] focus:border-blue-500 focus:bg-white focus:shadow-[0_0_30px_rgba(59,130,246,0.1)] outline-none transition-all"
                disabled={isLoading}
              />
            ))}
          </div>

          <button
            onClick={() => handleVerify()}
            disabled={isLoading}
            className="w-full bg-[#0B1221] text-white h-16 rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-black/10 active:scale-[0.98] mb-8"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Verify"
            )}
          </button>

          <div className="flex flex-col items-center gap-6 pt-8 border-t border-black/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-black/20">
              Didn&apos;t receive the code?
            </p>
            <button
              onClick={handleResend}
              disabled={timer > 0 || isLoading}
              className={`flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] transition-all ${timer > 0 ? "text-black/10 cursor-not-allowed" : "text-blue-600 hover:text-blue-700 group"}`}
            >
              <RefreshCw size={14} className={`${isLoading ? "animate-spin" : ""} group-hover:rotate-180 transition-transform duration-700`} />
              Resend Code {timer > 0 && `(${timer}s)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
