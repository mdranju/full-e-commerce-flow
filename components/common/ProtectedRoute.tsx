"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { RootState } from "@/src/store/store";
import { premiumToast } from "@/components/ui/PremiumToast";
import { Skeleton } from "@/components/ui/skeleton";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !token) {
        premiumToast.error("Authentication Required", { description: "Please login to access this page." });
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else {
        setIsChecking(false);
      }
    }
  }, [isAuthenticated, isLoading, token, router, pathname]);

  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen bg-[#f8fafc] p-8 space-y-8">
        <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
           <div className="flex justify-between items-center">
              <div className="space-y-3">
                <Skeleton className="h-10 w-64 rounded-xl" />
                <Skeleton className="h-4 w-96 rounded-lg" />
              </div>
              <Skeleton className="h-14 w-48 rounded-2xl" />
           </div>
           <Skeleton className="h-20 w-full rounded-3xl" />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Skeleton className="h-40 w-full rounded-[2.5rem]" />
              <Skeleton className="h-40 w-full rounded-[2.5rem]" />
              <Skeleton className="h-40 w-full rounded-[2.5rem]" />
           </div>
           <Skeleton className="h-[400px] w-full rounded-[3rem]" />
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
