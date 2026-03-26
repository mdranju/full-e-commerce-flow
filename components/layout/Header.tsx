"use client";

import { Search, User, ShoppingBag, Menu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store/store";
import { setCartOpen } from "@/src/store/slices/uiSlice";
import { MobileMenu } from "./MobileMenu";
import { CartSidebar } from "./CartSidebar";
import { SearchBar } from "./SearchBar";
import { SearchModal } from "./SearchModal";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity,
  );
  const isCartOpen = useSelector((state: RootState) => state.ui.isCartOpen);

  useEffect(() => {
    if (totalQuantity > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalQuantity]);

  // Desktop-only scroll glass effect
  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= 1024) setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerCls = [
    "sticky top-0 z-50 transition-all duration-500 w-full",
    "max-lg:bg-white max-lg:border-b max-lg:border-gray-100",
    scrolled
      ? [
          "lg:borderlg-b :border-blue-900/30",
          "lg:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]",
          "lg:bg-[rgba(11,18,33,0.75)]",
          "lg:[backdrop-filter:blur(20px)_saturate(180%)]",
          "lg:[-webkit-backdrop-filter:blur(20px)_saturate(180%)]",
        ].join(" ")
      : "lg:bg-white lg:border-b lg:border-gray-100",
  ].join(" ");

  return (
    <>
      <header className={headerCls}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden gap-1">
              <button
                className="p-2 -ml-2 text-gray-600"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center text-white font-bold text-xl">
                b
              </div>
              <span
                className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? "lg:text-white" : ""}`}
              >
                Bangladesh
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1">
              <SearchBar />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 lg:gap-8 shrink-0">
              <Link
                href="/login"
                className={`hidden lg:flex items-center gap-2 hover:text-gray-400 transition-colors ${scrolled ? "text-white/90" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${scrolled ? "border-white/20 bg-white/10" : "border-gray-200 bg-gray-50"}`}
                >
                  <User
                    size={20}
                    className={scrolled ? "text-white/80" : "text-gray-600"}
                  />
                </div>
                <div className="flex flex-col text-sm">
                  <span
                    className={`text-xs text-left transition-colors ${scrolled ? "text-white/60" : "text-gray-500"}`}
                  >
                    Sign In
                  </span>
                  <span
                    className={`font-medium ${scrolled ? "text-white" : ""}`}
                  >
                    Your Account
                  </span>
                </div>
              </Link>

              <button
                onClick={() => dispatch(setCartOpen(true))}
                className={`hidden lg:flex relative p-2 transition-colors ${isBouncing ? "animate-cart-bounce" : ""} ${scrolled ? "text-white/80 hover:text-white" : "hover:text-gray-600"}`}
              >
                <ShoppingBag size={24} />
                <span className="absolute top-0 right-0 w-5 h-5 bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {totalQuantity}
                </span>
              </button>

              {/* Mobile Search Icon (Replaces Cart) */}
              <button
                className="lg:hidden p-2 text-gray-600"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => dispatch(setCartOpen(false))}
        cartItems={cartItems}
      />

      {/* Mobile Search Modal for Product Page */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
}
