"use client";

import dynamic from "next/dynamic";
import { DesktopAnimations } from "@/components/desktop/DesktopAnimations";
import HeroBanner from "@/components/home/HeroBanner";

const MarqueeTicker = dynamic(() => import("@/components/home/MarqueeTicker"), {
  ssr: true,
});
const TopCategories = dynamic(() => import("@/components/home/TopCategories"), {
  ssr: true,
});
const ProductItemsSection = dynamic(
  () => import("@/components/home/ProductItemsSection"),
  { ssr: true },
);
const CTABanner = dynamic(() => import("@/components/home/CTABanner"), {
  ssr: true,
});

export default function Home() {
  return (
    <>
      {/* GSAP animations — desktop only, pure side-effect */}
      <DesktopAnimations />

      <div className="flex flex-col lg:gap-12 gap-8 lg:pb-12 pb-20 ">
        {/* ── Hero Banner ─────────────────────────────────────── */}
        <HeroBanner />

        {/* ── Marquee Ticker (Desktop Only) ──────────────────── */}
        <MarqueeTicker />

        {/* ── Top Categories ──────────────────────────────────── */}
        <TopCategories />

        {/* ── Filter Products Section ─────────────────────────────────── */}
        <ProductItemsSection />

        {/* ── CTA Banner (Desktop Only) ────────────────────────── */}
        <CTABanner />
      </div>
    </>
  );
}
