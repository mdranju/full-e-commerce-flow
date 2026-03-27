import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { BackButton } from "@/components/common/BackButton";
import { Lock as LockIcon } from "lucide-react";
import Image from "next/image";

export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]/50 pb-20 lg:pb-32">
      {/* 1. Security Hero */}
      <div className="relative h-[35vh] lg:h-[45vh] flex items-center justify-center overflow-hidden bg-[#0B1221] mb-12 lg:mb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-900/40 opacity-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-60" />
        
        <div className="relative z-10 text-center px-6">
          <p className="text-blue-400 text-[10px] font-black tracking-[0.6em] uppercase mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
            Account Security
          </p>
          <h1 className="hero-display text-4xl lg:text-7xl tracking-tighter text-white mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 uppercase">
            Change Password.
          </h1>
          <div className="flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
             <div className="h-6 w-px bg-white/20" />
             <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic leading-none">
                 Keep your account secure
             </span>
             <div className="h-6 w-px bg-white/20" />
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start relative">
          <ProfileSidebar />

          <div className="flex-1 w-full relative space-y-12">
            <div className="flex items-center justify-between mb-8">
                <BackButton className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-black/5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#0B1221]/40 hover:text-[#0B1221] transition-all hover:bg-gray-50/50" />
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-blue-600" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0B1221]/30">
                      Standard Security protocol v2.4
                  </p>
                </div>
            </div>

            {/* Redesigned Update Password Form (Glass-Card) */}
            <div className="glass-card rounded-[3.5rem] border border-black/5 bg-white p-10 lg:p-16 animate-in slide-in-from-bottom-12 duration-700 shadow-2xl shadow-black/5 max-w-3xl">
                <div className="mb-12">
                    <p className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase mb-4">Update Password</p>
                    <h2 className="hero-display text-4xl lg:text-5xl tracking-tighter text-[#0B1221]">
                        New Password.
                    </h2>
                </div>

                <form className="space-y-10">
                    <div className="group space-y-3">
                      <label className="text-[10px] font-black text-[#0B1221]/40 uppercase tracking-[0.4em] ml-4 group-focus-within:text-blue-600 transition-colors">Current Password *</label>
                      <div className="relative">
                        <LockIcon size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0B1221]/10 group-focus-within:text-blue-600 transition-all duration-500" strokeWidth={1.5} />
                        <input
                          type="password"
                          className="w-full bg-gray-50/50 border border-black/5 rounded-[1.8rem] pl-16 pr-8 py-5 outline-none transition-all duration-500 placeholder:text-[#0B1221]/10 text-sm font-bold text-[#0B1221] focus:bg-white focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500/20"
                          placeholder="Current Password"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="group space-y-3">
                            <label className="text-[10px] font-black text-[#0B1221]/40 uppercase tracking-[0.4em] ml-4 group-focus-within:text-blue-600 transition-colors">New Password *</label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0B1221]/10 group-focus-within:text-blue-600 transition-all duration-500">
                                    <LockIcon size={18} strokeWidth={1.5} />
                                </span>
                                <input
                                    type="password"
                                    className="w-full bg-gray-50/50 border border-black/5 rounded-[1.8rem] pl-16 pr-8 py-5 outline-none transition-all duration-500 placeholder:text-[#0B1221]/10 text-sm font-bold text-[#0B1221] focus:bg-white focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500/20"
                                    placeholder="8+ characters"
                                />
                            </div>
                        </div>

                        <div className="group space-y-3">
                            <label className="text-[10px] font-black text-[#0B1221]/40 uppercase tracking-[0.4em] ml-4 group-focus-within:text-blue-600 transition-colors">Confirm Password *</label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0B1221]/10 group-focus-within:text-blue-600 transition-all duration-500">
                                    <LockIcon size={18} strokeWidth={1.5} />
                                </span>
                                <input
                                    type="password"
                                    className="w-full bg-gray-50/50 border border-black/5 rounded-[1.8rem] pl-16 pr-8 py-5 outline-none transition-all duration-500 placeholder:text-[#0B1221]/10 text-sm font-bold text-[#0B1221] focus:bg-white focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500/20"
                                    placeholder="Confirm your password"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <button
                        type="button"
                        className="btn-glow w-full lg:w-auto px-12 py-5 bg-blue-600 text-white rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20"
                        >
                        Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {/* Illustration on the right */}
            <div className="hidden xl:block absolute top-40 right-0 w-80 h-80 -z-10 opacity-20">
                <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full" />
                <Image
                    src="https://picsum.photos/seed/secure/400/400"
                    alt="Security Illustration"
                    fill
                    className="object-contain grayscale mix-blend-overlay"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
