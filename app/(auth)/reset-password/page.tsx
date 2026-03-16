"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/src/store/slices/authSlice";
import { RootState, AppDispatch } from "@/src/store/store";
import { toast } from "sonner";
import { Eye, EyeOff, ShieldCheck, ShieldAlert, Shield } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const strength = useMemo(() => {
    if (!password) return { label: "", color: "bg-gray-200", percent: 0 };
    if (password.length < 6) return { label: "Weak", color: "bg-red-500", percent: 33 };
    if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/)) {
      return { label: "Strong", color: "bg-green-500", percent: 100 };
    }
    return { label: "Medium", color: "bg-yellow-500", percent: 66 };
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.warning("Empty Fields", {
        description: "Please fill in all fields.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password Mismatch", {
        description: "New passwords do not match.",
      });
      return;
    }

    if (password.length < 6) {
      toast.warning("Weak Password", {
        description: "Password must be at least 6 characters.",
      });
      return;
    }

    const resultAction = await dispatch(resetPassword({ email, otp, newPassword: password }));
    if (resetPassword.fulfilled.match(resultAction)) {
      toast.success("Password Reset Successfully! ✅", {
        description: "You can now login with your new password.",
      });
      router.push("/login");
    } else {
        toast.error("Reset Failed", {
            description: resultAction.payload as string || "Something went wrong. Please try again.",
        });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-24 h-24 opacity-10 pointer-events-none">
        <div className="w-full h-full border-2 border-[#0A1128] rotate-12"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600 px-4">
            Create a new strong password for your account <span className="font-bold text-black">{email}</span>
          </p>
        </div>

        <div className="bg-white p-2 md:p-4 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium">
                New Password
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-3.5 focus-within:border-black transition-colors bg-gray-50/30">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full outline-none text-gray-900 text-sm bg-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Password Strength Indicator */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Password Strength</span>
                <span className={`font-bold ${strength.percent === 33 ? 'text-red-500' : strength.percent === 66 ? 'text-yellow-500' : strength.percent === 100 ? 'text-green-500' : 'text-gray-300'}`}>
                    {strength.label || "None"}
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${strength.color}`} 
                  style={{ width: `${strength.percent}%` }}
                ></div>
              </div>
            </div>

            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium">
                Confirm New Password
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-3.5 focus-within:border-black transition-colors bg-gray-50/30">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full outline-none text-gray-900 text-sm bg-transparent"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
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
                "Reset Password"
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center pt-6 border-t border-gray-100">
            <Link href="/login" className="text-sm font-bold text-gray-500 hover:text-black">
                Never mind, I remembered it!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
