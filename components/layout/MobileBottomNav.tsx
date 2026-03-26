"use client";

import { Home, LayoutGrid, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store/store";
import { setCartOpen } from "@/src/store/slices/uiSlice";

export function MobileBottomNav() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity,
  );

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      name: "Categories",
      href: "/categories",
      icon: LayoutGrid,
      isActive: pathname === "/categories" || pathname?.startsWith("/category/"),
    },
    {
      name: "Cart",
      href: "#", // Handled by onClick
      icon: ShoppingBag,
      isActive: false, // Cart is a slide-over, so it doesn't have an active route state
      badge: totalQuantity > 0 ? totalQuantity : null,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(setCartOpen(true));
      },
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      isActive: pathname?.startsWith("/profile") || pathname === "/login",
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-safe">
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const activeClass = item.isActive ? "text-black" : "text-gray-400 hover:text-gray-600";
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={item.onClick}
              className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeClass}`}
            >
              <div className="relative">
                <Icon size={22} className={item.isActive ? "stroke-[2.5px]" : "stroke-2"} />
                {item.badge !== null && item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${item.isActive ? "font-bold" : ""}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
