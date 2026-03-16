'use client';

import { X, ChevronRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { categories } from '@/lib/data';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (slug: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  // Define subcategories for Panjabi as an example based on the screenshot
  const panjabiSubcategories = [
    { name: 'Superior Panjabi', slug: 'superior-panjabi' },
    { name: 'As-Shabab', slug: 'as-shabab' },
    { name: 'Gracious Panjabi', slug: 'gracious-panjabi' },
    { name: 'Semi Luxury', slug: 'semi-luxury' },
    { name: 'chikankar', slug: 'chikankar' },
    { name: 'Platinum', slug: 'platinum' },
    { name: 'Elegent', slug: 'elegent' },
    { name: 'Printed', slug: 'printed' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-[300px] max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center text-white font-bold text-xl">
              b
            </div>
            <span className="text-2xl font-bold tracking-tight">believers</span>
          </Link>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-2">
          <ul className="flex flex-col">
            {categories.map((category) => {
              const hasSubcategories = category.slug === 'panjabi';
              const hasRightArrow = ['t-shirt', 'pant-trouser', 'attar', 'gadgets', 'sneakers', 'natural-foods', 'winter', 'combo-offers'].includes(category.slug);
              const isExpanded = expandedCategories[category.slug];

              return (
                <li key={category.id} className="border-b border-gray-50 last:border-0">
                  <div className="flex items-center justify-between px-4 py-3">
                    <Link 
                      href={`/category/${category.slug}`}
                      onClick={onClose}
                      className="flex-1 font-medium text-gray-800 hover:text-black"
                    >
                      {category.name}
                    </Link>
                    {hasSubcategories ? (
                      <button 
                        onClick={() => toggleCategory(category.slug)}
                        className={`p-1 border rounded ${isExpanded ? 'bg-[#0B1221] text-white border-[#0B1221]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                      >
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                    ) : hasRightArrow ? (
                      <div className="p-1 border border-gray-200 rounded text-gray-300">
                        <ChevronRight size={16} />
                      </div>
                    ) : null}
                  </div>
                  
                  {/* Subcategories */}
                  {hasSubcategories && isExpanded && (
                    <ul className="bg-white py-2">
                      {panjabiSubcategories.map((sub) => (
                        <li key={sub.slug} className="border-b border-gray-50 last:border-0">
                          <Link
                            href={`/category/${sub.slug}`}
                            onClick={onClose}
                            className="block px-8 py-3 text-sm font-medium text-gray-800 hover:text-black hover:bg-gray-50"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-white space-y-3">
          <Link 
            href="/track-order" 
            onClick={onClose}
            className="block w-full bg-[#0B1221] text-white text-center py-3 rounded font-bold hover:bg-gray-800 transition-colors"
          >
            Track My Order
          </Link>
          <Link 
            href="/about" 
            onClick={onClose}
            className="block w-full bg-[#0B1221] text-white text-center py-3 rounded font-bold hover:bg-gray-800 transition-colors"
          >
            Our Showroom
          </Link>
        </div>
      </div>
    </>
  );
}
