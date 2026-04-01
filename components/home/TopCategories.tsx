"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

const categories = [
  { name: "Panjabi", img: "/mini.jpg" },
  { name: "Shirt", img: "/template.jpg" },
  { name: "T-shirt", img: "https://picsum.photos/seed/cat3/1000/1000" },
  { name: "Polo", img: "https://picsum.photos/seed/cat4/1000/1000" },
  { name: "Pant", img: "https://picsum.photos/seed/cat5/1000/1000" },
  { name: "Perfume", img: "https://picsum.photos/seed/cat6/1000/1000" },
  { name: "Gadget", img: "https://picsum.photos/seed/cat7/1000/1000" },
  { name: "Sneaker", img: "https://picsum.photos/seed/cat8/1000/1000" },
  { name: "Food", img: "https://picsum.photos/seed/cat9/1000/1000" },
  { name: "Watch", img: "https://picsum.photos/seed/cat10/1000/1000" },
  { name: "Bag", img: "https://picsum.photos/seed/cat11/1000/1000" },
  { name: "Cap", img: "https://picsum.photos/seed/cat12/1000/1000" },
];

function TopCategories() {
  return (
    <>
      {/* ── Top Categories ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto w-full px-4 lg:px-0">
        <div className="flex items-end justify-between mb-8 lg:mb-12">
          <div>
            <p className="text-blue-600 text-[10px] lg:text-xs font-black tracking-[0.3em] uppercase mb-1.5 lg:mb-2 text-left">
              Browse
            </p>
            <h2 className="text-2xl lg:text-4xl font-black text-[#0B1221] tracking-tighter text-left">Explore Categories</h2>
          </div>
          <Link
            href="/categories"
            className="group flex items-center gap-2 text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 transition-colors"
          >
            View All{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* 1. Desktop Grid Layout (lg+) */}
        <div className="hidden lg:grid grid-cols-6 gap-8">
          {categories.map((cat, i) => (
            <CategoryCard key={`desktop-${i}`} cat={cat} />
          ))}
        </div>

        {/* 2. Mobile Horizontal Auto-Scrolling Marquee (lg hidden) */}
        <div className="lg:hidden -mx-4 relative group/marquee">
            <Swiper
                modules={[Autoplay, FreeMode]}
                slidesPerView="auto"
                spaceBetween={12}
                loop={true}
                speed={4000} // Speed for smooth movement
                freeMode={true}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                className="category-swiper-mobile !px-4"
            >
                {categories.map((cat, i) => (
                    <SwiperSlide key={`mobile-${i}`} className="!w-auto py-2">
                        <Link
                            href={`/category/${cat.name?.toLowerCase()?.replace(" ", "-")}`}
                            className="flex flex-col items-center gap-2 group active:scale-95 transition-all"
                        >
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-black/5 shadow-sm p-1.5 relative">
                                <div className="w-full h-full rounded-xl overflow-hidden relative">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={cat.img}
                                        alt={cat.name}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                            <span className="text-[11px] font-bold text-[#0B1221] tracking-tight">
                                {cat.name}
                            </span>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            {/* Subtle Gradient Fades for Premium Look */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>
      </section>
    </>
  );
}

// Reusable Desktop Card Component
function CategoryCard({ cat }: { cat: any }) {
    return (
        <Link
          href={`/category/${cat.name?.toLowerCase()?.replace(" ", "-")}`}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="w-full aspect-square rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 relative mb-5 transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.2)] group-hover:-translate-y-2">
            <Image
              width={500}
              height={500}
              src={cat.img}
              alt={cat.name}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-500" />
          </div>
          <span className="text-base font-bold text-gray-900 tracking-tight transition-colors group-hover:text-blue-600">
            {cat.name}
          </span>
          <div className="h-px w-0 bg-blue-600 mt-1.5 transition-all duration-500 group-hover:w-8" />
        </Link>
    );
}

export default TopCategories;
