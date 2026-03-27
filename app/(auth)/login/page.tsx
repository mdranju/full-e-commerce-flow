"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "@/src/store/slices/authSlice";
import { RootState, AppDispatch } from "@/src/store/store";
import { premiumToast as toast } from "@/components/ui/PremiumToast";
import { Eye, EyeOff, Smartphone } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // Email or Phone
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      toast.error("Login Failed", {
        description: error,
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || !password) {
      toast.warning("Incomplete Fields", {
        description: "Please enter both your identifier and password.",
      });
      return;
    }

    const resultAction = await dispatch(login({ identifier, password }));
    if (login.fulfilled.match(resultAction)) {
      toast.success("Welcome Back! 👋", {
        description: "You have successfully logged into your account.",
      });
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-[#F8FAFC]">
      {/* Soft Ambient Glow Elements */}
      <div className="absolute top-0 right-0 w-[1000px] h-[700px] bg-blue-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-16 relative z-10">
        {/* Left Side: Brand Visual */}
        <div className="hidden md:block w-1/2">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[3rem] blur-xl opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-black/5 shadow-2xl">
              <Image
                src="https://picsum.photos/seed/loginlight/800/1000"
                alt="Believers Brand"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 p-8">
                <p className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase mb-4">
                  User Login
                </p>
                <h2 className="hero-display text-[#0B1221] text-5xl mb-2">
                  Welcome to <br /> Believers.
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Light Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <div className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-black/5 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.06)] backdrop-blur-3xl">
            <div className="text-center mb-10">
              <p className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase mb-4">
                Welcome Back
              </p>
              <h1 className="hero-display text-[#0B1221] text-4xl mb-3 tracking-tighter">
                Login to Account.
              </h1>
              <p className="text-[#0B1221]/40 text-sm font-medium">
                New to the collection?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:text-blue-700 font-bold underline-offset-4 hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>

            <div className="relative mb-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-black/5"></div>
              <span className="text-[9px] uppercase tracking-[0.4em] text-black/20 font-black">
                Secure Access
              </span>
              <div className="h-px flex-1 bg-black/5"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group space-y-1.5">
                <label className="text-[10px] font-black text-[#0B1221]/40 uppercase tracking-widest ml-4 group-focus-within:text-blue-600 transition-colors">
                  Mobile Number
                </label>
                <div className="flex items-center bg-gray-50 border border-black/5 rounded-2xl px-5 py-4 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-blue-500/5 transition-all duration-300">
                  <input
                    type="text"
                    placeholder="017XXXXXXXX"
                    className="w-full bg-transparent outline-none text-[#0B1221] text-sm placeholder:text-[#0B1221]/20 font-medium"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    disabled={isLoading}
                  />
                  <Smartphone size={18} className="text-black/10 group-focus-within:text-blue-600/30 transition-colors" />
                </div>
              </div>

              <div className="group space-y-1.5">
                <div className="flex justify-between items-center ml-4">
                  <label className="text-[10px] font-black text-[#0B1221]/40 uppercase tracking-widest group-focus-within:text-blue-600 transition-colors">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[9px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest transition-colors"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="flex items-center bg-gray-50 border border-black/5 rounded-2xl px-5 py-4 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-blue-500/5 transition-all duration-300">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="******"
                    className="w-full bg-transparent outline-none text-[#0B1221] text-sm placeholder:text-[#0B1221]/20 font-medium tracking-widest"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0B1221] text-white h-16 rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-black/10 active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Initiate Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
