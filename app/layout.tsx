import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";

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
        className={`${sora.className} min-h-screen flex flex-col bg-gray-50`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <TopBar />
          <Header />
          <Navigation />
          <main className="flex-grow w-full">{children}</main>
          <Footer />
          <Toaster position="top-right" richColors closeButton />
        </StoreProvider>
      </body>
    </html>
  );
}
