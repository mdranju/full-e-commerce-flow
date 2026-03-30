"use client";

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

interface PremiumToastProps {
  message: string;
  description?: string;
  type: ToastType;
  id: string | number;
}

const getStyles = (type: ToastType) => {
  switch (type) {
    case "success":
      return {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        glow: "shadow-[0_0_20px_rgba(16,185,129,0.1)]",
      };
    case "error":
      return {
        icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
        glow: "shadow-[0_0_20px_rgba(244,63,94,0.1)]",
      };
    case "warning":
      return {
        icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        glow: "shadow-[0_0_20px_rgba(245,158,11,0.1)]",
      };
    default:
      return {
        icon: <Info className="w-5 h-5 text-blue-500" />,
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        glow: "shadow-[0_0_20px_rgba(59,130,246,0.1)]",
      };
  }
};

export const PremiumToast = ({
  message,
  description,
  type,
  id,
}: PremiumToastProps) => {
  const styles = getStyles(type);

  return (
    <div
      className={`relative group w-full sm:w-[350px] lg:w-[400px] flex items-start gap-4 p-4 rounded-[20px] bg-white/95 backdrop-blur-xl text-[#0B1221] border border-white/20 ${styles.border} ${styles.glow} shadow-2xl transition-all duration-500`}
    >
      <div
        className={`shrink-0 w-10 h-10 rounded-xl ${styles.bg} flex items-center justify-center`}
      >
        {styles.icon}
      </div>

      <div className="flex-1 flex flex-col justify-center min-w-0 py-1">
        <h3 className="text-[13px] font-black uppercase tracking-[0.05em] leading-tight truncate">
          {message}
        </h3>
        {description && (
          <p className="text-[11px] font-medium text-[#0B1221]/60 mt-0.5 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <button
        onClick={() => sonnerToast.dismiss(id)}
        className="shrink-0 p-1.5 rounded-lg hover:bg-black/5 text-[#0B1221]/20 hover:text-[#0B1221] transition-all"
      >
        <X size={14} />
      </button>

      <div
        className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full ${styles.bg} overflow-hidden opacity-30`}
      >
        <div
          className={`h-full w-full ${styles.glow.replace("shadow-", "bg-")} animate-progress-shrink`}
        />
      </div>
    </div>
  );
};

export function PremiumToaster() {
  const [position, setPosition] = useState<
    "top-center" | "top-right" | "bottom-center"
  >("top-center");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleResize = () => {
      setPosition(window.innerWidth >= 1024 ? "top-right" : "bottom-center");
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <SonnerToaster
      position={position}
      expand={false}
      visibleToasts={3}
      gap={12}
      offset={24}
      toastOptions={{
        unstyled: true,
        className: "w-full flex justify-center lg:justify-end",
      }}
    />
  );
}

export const showToast = (
  message: string,
  options?: { description?: string; type?: ToastType },
) => {
  const type = options?.type || "info";
  return sonnerToast.custom(
    (t) => (
      <PremiumToast
        id={t}
        message={message}
        description={options?.description}
        type={type}
      />
    ),
    {
      duration: 4000,
    },
  );
};

export const premiumToast = {
  success: (message: string, options?: { description?: string }) =>
    showToast(message, { ...options, type: "success" }),
  error: (message: string, options?: { description?: string }) =>
    showToast(message, { ...options, type: "error" }),
  warning: (message: string, options?: { description?: string }) =>
    showToast(message, { ...options, type: "warning" }),
  info: (message: string, options?: { description?: string }) =>
    showToast(message, { ...options, type: "info" }),
  custom: sonnerToast.custom,
  dismiss: sonnerToast.dismiss,
};
