"use client";

import { Search, User, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store/store";
import { setCartOpen } from "@/src/store/slices/uiSlice";
import dynamic from "next/dynamic";
import { SearchBar } from "./SearchBar";
import Image from "next/image";

const MobileMenu = dynamic(
  () => import("./MobileMenu").then((mod) => mod.MobileMenu),
  { ssr: false },
);
const CartSidebar = dynamic(
  () => import("./CartSidebar").then((mod) => mod.CartSidebar),
  { ssr: false },
);
const SearchModal = dynamic(
  () => import("./SearchModal").then((mod) => mod.SearchModal),
  { ssr: false },
);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  // Combined scroll logic: Desktop glass effect + Mobile smart hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 1024;

      // Update glass theme effect
      setScrolled(currentScrollY > 60);

      // Smart hide/show for mobile only
      if (isMobile) {
        const delta = currentScrollY - lastScrollY;
        const scrollThreshold = 10;

        if (Math.abs(delta) > scrollThreshold) {
          if (currentScrollY > lastScrollY && currentScrollY > 120) {
            // Scrolling Down - Hide
            setIsVisible(false);
          } else {
            // Scrolling Up - Show
            setIsVisible(true);
          }
        }
      } else {
        setIsVisible(true); // Ensure visible on desktop resize
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const showGlass = scrolled || isSearchFocused;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${
          showGlass
            ? "bg-white/70 backdrop-blur-lg shadow-md border-b border-white/20"
            : "bg-white border-b border-gray-100"
        } ${!isVisible ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div
          className={`transition-all duration-700 ${showGlass ? "py-3" : "py-5"}`}
        >
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center lg:hidden">
                <button
                  className="p-3.5 -ml-2 text-gray-900 bg-gray-50/80 backdrop-blur-xl border border-black/5 rounded-2xl hover:bg-white active:scale-95 transition-all duration-300"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="Open navigation menu"
                >
                  <div className="flex flex-col gap-1.5 items-start">
                    <div className="w-6 h-0.5 bg-[#0B1221] rounded-full" />
                    <div className="w-4 h-0.5 bg-[#0B1221] rounded-full group-hover:w-6 transition-all" />
                    <div className="w-6 h-0.5 bg-[#0B1221] rounded-full" />
                  </div>
                </button>
              </div>

              <Link href="/" className="flex items-center gap-3 shrink-0 group">
                <div className=" rounded-[14px] flex items-center justify-center text-white font-black text-2xl  shadow-black/10 group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/logo.svg"
                    alt="Avlora Wear Logo"
                    width={150}
                    height={150}
                    priority
                    className="w-full lg:h-14 h-12 object-cover"
                  />
                </div>
              </Link>

              <div className="hidden lg:flex flex-1 max-w-xl mx-auto">
                <SearchBar
                  scrolled={scrolled}
                  onFocusChange={(focused) => setIsSearchFocused(focused)}
                />
              </div>

              <div className="flex items-center gap-3 lg:gap-10 shrink-0">
                <Link
                  href="/login"
                  className="hidden lg:flex items-center gap-4 group transition-all"
                >
                  <div className="w-12 h-12 rounded-[18px] bg-gray-50 border border-black/5 flex items-center justify-center group-hover:bg-white group-hover:shadow-xl group-hover:shadow-black/5 transition-all duration-500">
                    <User
                      size={20}
                      className="text-[#0B1221]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1221]/40 leading-none mb-1">
                      Log In
                    </span>
                    <span className="text-sm font-bold text-[#0B1221]">
                      Profile
                    </span>
                  </div>
                </Link>

                <div className="w-px h-8 bg-gray-100 hidden lg:block" />

                <button
                  onClick={() => dispatch(setCartOpen(true))}
                  className={`relative p-3 rounded-2xl bg-gray-50 border border-black/5 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-500 ${isBouncing ? "animate-cart-bounce" : ""}`}
                  aria-label={`Open shopping cart. ${totalQuantity} items in cart.`}
                >
                  <ShoppingBag
                    size={22}
                    className="text-[#0B1221]"
                    strokeWidth={1.5}
                  />
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#0B1221] text-white text-[11px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110">
                    {totalQuantity}
                  </span>
                </button>

                <button
                  className="lg:hidden p-3 text-[#0B1221] bg-gray-50 rounded-xl"
                  onClick={() => setIsSearchModalOpen(true)}
                  aria-label="Open search modal"
                >
                  <Search size={20} strokeWidth={1.5} />
                </button>
              </div>
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
