"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";

export function SearchBar({ isMobile = false }: { isMobile?: boolean }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter products based on query
  const suggestions = query.trim()
    ? products
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
      setIsFocused(false);
    }
  };

  return (
    <div className={`relative w-full ${!isMobile && "max-w-2xl mx-8"}`} ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for Products..."
          className={`w-full pl-4 pr-12 py-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black ${
            isMobile ? "text-sm" : ""
          }`}
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 bg-[#0B1221] text-white rounded-r-md hover:bg-gray-800 transition-colors"
        >
          <Search size={isMobile ? 18 : 20} />
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {isFocused && query.trim() && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-xl border border-gray-100 z-50 overflow-hidden">
          {suggestions.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              onClick={() => setIsFocused(false)}
              className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
            >
              <div className="relative w-12 h-12 bg-gray-100 rounded shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover rounded" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 truncate">
                  {product.name}
                </p>
                <p className="text-xs text-blue-600 font-bold mt-1">
                  ৳{product.price}
                </p>
              </div>
            </Link>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full p-3 text-center text-sm text-gray-600 hover:text-black hover:bg-gray-50 bg-gray-50 border-t border-gray-100 font-medium transition-colors"
          >
            See all matching products →
          </button>
        </div>
      )}
    </div>
  );
}
