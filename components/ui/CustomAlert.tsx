"use client";

import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, Trash2, Info, X } from "lucide-react";

export type CustomAlertConfig = {
  isOpen: boolean;
  title: string;
  message: string;
  type?: "danger" | "warning" | "info";
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CustomAlert({
  isOpen,
  title,
  message,
  type = "danger",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: CustomAlertConfig) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0B1221]/40 backdrop-blur-sm z-[100]"
            onClick={onCancel}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl border border-black/5 pointer-events-auto relative"
            >
              <button
                onClick={onCancel}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 
                  ${type === "danger" ? "bg-red-50 text-red-500" : type === "warning" ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-500"}`}
                >
                  {type === "danger" ? <Trash2 size={32} /> : type === "warning" ? <AlertCircle size={32} /> : <Info size={32} />}
                </div>
                
                <h3 className="text-xl font-black text-[#0B1221] mb-2">{title}</h3>
                <p className="text-sm font-medium text-[#0B1221]/60 mb-8">{message}</p>

                <div className="flex gap-4 w-full">
                  <button
                     onClick={onCancel}
                    className="flex-1 bg-gray-50 text-[#0B1221] font-bold text-xs uppercase tracking-widest py-4 rounded-2xl hover:bg-gray-100 transition-colors"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={() => { onConfirm(); onCancel(); }}
                    className={`flex-1 font-bold text-xs uppercase tracking-widest py-4 rounded-2xl text-white shadow-lg transition-all hover:-translate-y-1 ${
                      type === "danger" 
                        ? "bg-red-500 shadow-red-500/20 hover:bg-red-600" 
                        : type === "warning" 
                        ? "bg-amber-500 shadow-amber-500/20 hover:bg-amber-600"
                        : "bg-blue-600 shadow-blue-500/20 hover:bg-blue-700"
                    }`}
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
