"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "@/src/store/slices/authSlice";
import { RootState, AppDispatch } from "@/src/store/store";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      toast.error("Registration Failed", {
        description: error,
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.warning("Empty Fields", {
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password Mismatch", {
        description: "Passwords do not match. Please try again.",
      });
      return;
    }

    if (password.length < 6) {
      toast.warning("Weak Password", {
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    const resultAction = await dispatch(register({ name, email, phone, password }));
    if (register.fulfilled.match(resultAction)) {
      toast.success("Account Created! ✅", {
        description: "Your account has been created successfully. Welcome!",
      });
      router.push("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 opacity-10 pointer-events-none">
        <div className="w-full h-full border-2 border-primary rotate-45"></div>
      </div>
      <div className="absolute bottom-20 right-10 w-32 h-32 opacity-10 pointer-events-none">
        <div className="w-full h-full rounded-full border-2 border-primary"></div>
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Left Side - Illustration (hidden on small) */}
        <div className="hidden md:block w-1/2">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <Image
              src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg"
              alt="Signup Illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up.</h1>
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>

          <div className="relative mb-8 text-center">
            <span className="bg-white px-4 text-sm text-gray-500 relative z-10">or Sign up with Email</span>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-0"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium">
                Your Full Name
              </label>
              <div className="flex items-center border border-gray-200 rounded px-3 py-3 focus-within:border-black transition-colors">
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full outline-none text-gray-900 text-sm"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium">
                Mobile Number
              </label>
              <div className="flex items-center border border-gray-200 rounded px-3 py-3 focus-within:border-black transition-colors">
                <input
                  type="text"
                  name="phone"
                  placeholder="Your 11 digit mobile number"
                  className="w-full outline-none text-gray-900 text-sm"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium">
                Your Email
              </label>
              <div className="flex items-center border border-gray-200 rounded px-3 py-3 focus-within:border-black transition-colors">
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="w-full outline-none text-gray-900 text-sm"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium">
                Password
              </label>
              <div className="flex items-center border border-gray-200 rounded px-3 py-3 focus-within:border-black transition-colors">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  className="w-full outline-none text-gray-900 text-sm"
                  value={formData.password}
                  onChange={handleChange}
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

            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium">
                Confirm Password
              </label>
              <div className="flex items-center border border-gray-200 rounded px-3 py-3 focus-within:border-black transition-colors">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="********"
                  className="w-full outline-none text-gray-900 text-sm"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
              className="w-full bg-[#0A1128] text-white py-3.5 rounded font-bold hover:bg-black transition-all flex items-center justify-center gap-2 group mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
