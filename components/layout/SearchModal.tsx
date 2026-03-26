"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recentSearches");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle open state: focus input and lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Small delay to ensure modal is rendered and transition started before focusing
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const saveSearch = (searchQuery: string) => {
    const term = searchQuery.trim();
    if (!term) return;
    
    setRecentSearches((prev) => {
      // Remove if already exists to move to top
      const filtered = prev.filter((s) => s.toLowerCase() !== term.toLowerCase());
      const updated = [term, ...filtered].slice(0, 5); // Keep last 5
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      saveSearch(query);
      router.push(`/products?search=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const clearSearchStr = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  // Filter products based on query
  const suggestions = query.trim()
    ? products
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-white flex flex-col sm:hidden animate-in fade-in slide-in-from-top-4 duration-200">
      {/* Header / Search Input */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-white shrink-0 shadow-sm">
        <form onSubmit={handleSubmit} className="flex-1 relative flex items-center">
          <Search size={18} className="absolute left-3 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for Products..."
            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-0 text-[15px]"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearchStr}
              className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X size={16} />
            </button>
          )}
        </form>
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-900 shrink-0 text-sm font-medium"
        >
          Cancel
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50">
        {/* State 1: Typing with results */}
        {query.trim() && suggestions.length > 0 && (
          <div className="bg-white">
            {suggestions.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={() => {
                  saveSearch(query);
                  onClose();
                }}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
              >
                <div className="relative w-12 h-12 bg-gray-100 rounded shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[15px] text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-[13px] text-blue-600 font-bold mt-1">
                    ৳{product.price}
                  </p>
                </div>
              </Link>
            ))}
            <button
              onClick={handleSubmit}
              className="w-full p-4 text-center text-[15px] text-gray-600 hover:text-black hover:bg-gray-50 bg-gray-50 border-t border-gray-100 font-medium transition-colors"
            >
              See all results for &quot;{query}&quot; 
            </button>
          </div>
        )}

        {/* State 2: Typing with NO results */}
        {query.trim() && suggestions.length === 0 && (
          <div className="px-4 py-8 text-center bg-white h-full flex flex-col items-center">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-gray-400" />
             </div>
            <p className="text-gray-900 font-medium text-[15px] mb-1">No products found</p>
            <p className="text-gray-500 text-sm">Try searching for something else.</p>
          </div>
        )}

        {/* State 3: Empty query, show recent searches */}
        {!query.trim() && recentSearches.length > 0 && (
          <div className="p-4 bg-white">
            <h3 className="text-sm font-medium text-gray-900 mb-3 px-1">Recent Searches</h3>
            <div className="flex flex-col">
              {recentSearches.map((term, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(term);
                    // Update order
                    saveSearch(term);
                    router.push(`/products?search=${encodeURIComponent(term)}`);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-left transition-colors group"
                >
                  <Clock size={16} className="text-gray-400 shrink-0" />
                  <span className="flex-1 text-[15px] text-gray-700 truncate">{term}</span>
                  <Search size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
