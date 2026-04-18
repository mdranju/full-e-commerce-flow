"use client";

import { Plus } from "lucide-react";
import React from "react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export function AdminModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = "max-w-2xl",
}: AdminModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B1221]/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className={`bg-white w-full ${maxWidth} max-h-[90vh] flex flex-col rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden`}>
        {/* Modal Header */}
        <div className="flex justify-between items-center p-8 border-b border-black/5 shrink-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-black text-[#0B1221] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[10px] font-bold text-[#0B1221]/30 uppercase tracking-[0.2em] mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-2xl transition-colors text-black/20 hover:text-red-500"
          >
            <Plus size={24} className="rotate-45" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="p-8 border-t border-black/5 bg-gray-50/50 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
