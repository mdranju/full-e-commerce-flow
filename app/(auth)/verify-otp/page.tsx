"use client";

import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, forgotPassword } from "@/src/store/slices/authSlice";
import { RootState, AppDispatch } from "@/src/store/store";
import { toast } from "sonner";
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 opacity-10 pointer-events-none">
        <div className="w-full h-full border-2 border-[#0A1128] rotate-45"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10 text-center">
        <div className="mb-8">
          <Link href="/forgot-password" title="Back" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6 transition-colors">
            <ArrowLeft size={16} />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify OTP</h1>
          <p className="text-gray-600 px-4">
            Enter the 6-digit code sent to <span className="font-bold text-black">{email}</span>
          </p>
        </div>

        <div className="bg-white p-2 md:p-4 rounded-xl">
          <div className="flex justify-between gap-2 md:gap-3 mb-8">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => { inputRefs.current[idx] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-full aspect-square text-center text-xl font-bold border border-gray-200 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none bg-gray-50/50 transition-all"
                disabled={isLoading}
              />
            ))}
          </div>

          <button
            onClick={() => handleVerify()}
            disabled={isLoading}
            className="w-full bg-[#0A1128] text-white py-4 rounded-lg font-bold hover:bg-black transition-all mb-6 active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Verify"
            )}
          </button>

          <div className="flex flex-col items-center gap-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResend}
              disabled={timer > 0 || isLoading}
              className={`flex items-center gap-2 font-bold text-sm transition-all ${timer > 0 ? "text-gray-300 cursor-not-allowed" : "text-[#0A1128] hover:scale-105"}`}
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              Resend OTP {timer > 0 && `(${timer}s)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
