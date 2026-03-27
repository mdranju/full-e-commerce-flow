import { DesktopCursor } from "@/components/desktop/DesktopCursor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { TopBar } from "@/components/layout/TopBar";
import { PremiumToaster } from "@/components/ui/PremiumToast";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Believers - Islamic Lifestyle Brand",
  description: "One of the largest Islamic Lifestyle brands in Bangladesh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${sora.className} min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <StoreProvider>
          {/* Desktop-only glowing cursor */}
          <DesktopCursor />
          <TopBar />
          <Header />
          <main className="flex-grow w-full pb-[65px] lg:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
          <PremiumToaster />
        </StoreProvider>
      </body>
    </html>
  );
}
