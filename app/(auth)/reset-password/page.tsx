"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/src/store/slices/authSlice";
import { RootState, AppDispatch } from "@/src/store/store";
import { premiumToast as toast } from "@/components/ui/PremiumToast";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const strength = useMemo(() => {
    if (!password) return { label: "", color: "bg-gray-200", percent: 0 };
    if (password.length < 6)
      return { label: "Weak", color: "bg-red-500", percent: 33 };
    if (
      password.match(/[A-Z]/) &&
      password.match(/[0-9]/) &&
      password.match(/[^A-Za-z0-9]/)
    ) {
      return { label: "Strong", color: "bg-green-500", percent: 100 };
    }
    return { label: "Medium", color: "bg-yellow-500", percent: 66 };
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const resultAction = await dispatch(
      resetPassword({ email, otp, newPassword: password }),
    );
    if (resetPassword.fulfilled.match(resultAction)) {
      toast.success("Password Reset Successfully! ✅", {
        description: "You can now login with your new password.",
      });
      router.push("/login");
    } else {
      toast.error("Reset Failed", {
        description:
          (resultAction.payload as string) ||
          "Something went wrong. Please try again.",
      });
    }
  };

  const handleInputChange = (
    field: "password" | "confirmPassword",
    val: string,
  ) => {
    if (field === "password") setPassword(val);
    else setConfirmPassword(val);

    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const renderError = (error?: string) => (
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-red-500 text-[9px] font-bold uppercase tracking-widest ml-4 mt-1"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <div className="lg:min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-[#F8FAFC]">
      {/* Soft Ambient Glow Elements */}
      <div className="absolute top-0 right-0 w-[1000px] h-[700px] bg-blue-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-black/5 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.06)] backdrop-blur-3xl">
          <div className="text-center mb-10">
            <p className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase mb-4">
              Reset Password
            </p>
            <h1 className="hero-display text-[#0B1221] text-4xl mb-4 tracking-tighter">
              New Password.
            </h1>
            <p className="text-[#0B1221]/40 text-sm font-medium px-4 leading-relaxed">
              Create a new strong password for your account <br />
              <span className="text-[#0B1221] font-bold underline decoration-blue-600 underline-offset-4">
                {email || "your account"}
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group space-y-1.5 overflow-hidden">
              <label
                className={`text-[10px] font-black uppercase tracking-widest ml-4 transition-colors ${validationErrors.password ? "text-red-500" : "text-[#0B1221]/40 group-focus-within:text-blue-600"}`}
              >
                New Password
              </label>
              <div
                className={`flex items-center bg-gray-50 border rounded-2xl px-5 py-4 transition-all duration-300 ${validationErrors.password ? "border-red-500 bg-red-50/20 shadow-xl shadow-red-500/5" : "border-black/5 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-blue-500/5"}`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full bg-transparent outline-none text-[#0B1221] text-sm placeholder:text-[#0B1221]/20 font-medium tracking-widest"
                  value={password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-black/10 hover:text-[#0B1221] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {renderError(validationErrors.password)}
            </div>

            {/* Password Strength Indicator */}
            <div className="space-y-3 px-2">
              <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                <span className="text-black/20">Security Level</span>
                <span
                  className={`${strength.percent === 33 ? "text-red-500" : strength.percent === 66 ? "text-yellow-500" : strength.percent === 100 ? "text-green-500" : "text-black/10"}`}
                >
                  {strength.label || "Awaiting"}
                </span>
              </div>
              <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden border border-black/5">
                <div
                  className={`h-full transition-all duration-700 ease-out ${strength.color} shadow-[0_0_10px_rgba(0,0,0,0.05)]`}
                  style={{ width: `${strength.percent}%` }}
                ></div>
              </div>
            </div>

            <div className="group space-y-1.5 overflow-hidden">
              <label
                className={`text-[10px] font-black uppercase tracking-widest ml-4 transition-colors ${validationErrors.confirmPassword ? "text-red-500" : "text-[#0B1221]/40 group-focus-within:text-blue-600"}`}
              >
                Confirm Password
              </label>
              <div
                className={`flex items-center bg-gray-50 border rounded-2xl px-5 py-4 transition-all duration-300 ${validationErrors.confirmPassword ? "border-red-500 bg-red-50/20 shadow-xl shadow-red-500/5" : "border-black/5 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-blue-500/5"}`}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full bg-transparent outline-none text-[#0B1221] text-sm placeholder:text-[#0B1221]/20 font-medium tracking-widest"
                  value={confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-black/10 hover:text-[#0B1221] transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {renderError(validationErrors.confirmPassword)}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0B1221] text-white h-16 rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-black/10 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className="mt-12 text-center pt-8 border-t border-black/5">
            <Link
              href="/login"
              className="text-[10px] font-black uppercase tracking-widest text-black/20 hover:text-blue-600 transition-colors"
            >
              Cancel Update
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
