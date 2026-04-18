"use client";

import { Bell, Search, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

export function Header() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-black/5 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-12">
        {/* Breadcrumbs or Page Title could go here */}
        <h2 className="text-xl font-black text-[#0B1221] tracking-tight">Dashboard Overview</h2>
        
        <div className="hidden lg:flex items-center bg-gray-50 border border-black/5 rounded-2xl px-5 py-3 w-96 group focus-within:border-blue-500 transition-all">
          <Search size={18} className="text-black/20 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="bg-transparent border-none outline-none ml-4 text-sm font-medium w-full placeholder:text-black/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-3 bg-gray-50 border border-black/5 rounded-2xl text-black/40 hover:text-blue-600 hover:bg-white transition-all">
          <Bell size={20} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-black/5">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-[#0B1221]">{user?.name || "Admin"}</p>
            <p className="text-[10px] uppercase tracking-widest text-[#0B1221]/40 font-bold">{user?.role || "Administrator"}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 overflow-hidden">
            {user?.image ? (
              <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User size={20} className="text-blue-600" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
