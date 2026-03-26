"use client";

import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { DesktopAnimations } from "@/components/desktop/DesktopAnimations";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { ArrowRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const MARQUEE_ITEMS = [
  "New Arrivals",
  "Premium Quality",
  "Free Delivery",
  "Islamic Lifestyle",
  "Eid Collection",
  "Authentic Designs",
  "Trusted by 10,000+",
  "Bangladesh's Finest",
  "New Arrivals",
  "Premium Quality",
  "Free Delivery",
  "Islamic Lifestyle",
  "Eid Collection",
  "Authentic Designs",
  "Trusted by 10,000+",
  "Bangladesh's Finest",
];

export default function Home() {
  const panjabiProducts = products.filter((p) => p.category === "panjabi");
  const tshirtProducts = products.filter((p) => p.category === "t-shirt");

  const heroSlides = [
    {
      id: 1,
      image: "https://picsum.photos/seed/hero1/1920/900",
      alt: "Eid Special Collection 1",
    },
    { id: 2, image: "/banner-ranju.jpg", alt: "Eid Special Collection 2" },
    {
      id: 3,
      image: "https://picsum.photos/seed/hero3/1920/900",
      alt: "Eid Special Collection 3",
    },
    {
      id: 4,
      image: "https://picsum.photos/seed/hero4/1920/900",
      alt: "New Season 4",
    },
    {
      id: 5,
      image: "https://picsum.photos/seed/hero7/1920/900",
      alt: "New Season 5",
    },
    { id: 6, image: "/banner.jpg", alt: "Believers Banner" },
  ];

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
  ];

  return (
    <>
      {/* GSAP animations — desktop only, pure side-effect */}
      <DesktopAnimations />

      <div className="flex flex-col gap-8 pb-12">
        {/* ── Hero Banner ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto w-full px-4">
          <div className="relative w-full aspect-[20.8/9.8] md:aspect-[3/1.4] bg-gray-200 rounded-lg overflow-hidden mt-5">
            <Swiper
              spaceBetween={0}
              centeredSlides={true}
              speed={800}
              loop={true}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              modules={[Autoplay, Pagination, Navigation, EffectFade]}
              className="w-full h-full hero-swiper group"
            >
              <div className="swiper-button-prev swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 !text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-md after:content-none">
                <IoIosArrowBack size={15} />
              </div>
              <div className="swiper-button-next swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 !text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-md after:content-none">
                <IoIosArrowForward size={15} />
              </div>

              {heroSlides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    width={1920}
                    height={900}
                    className="object-cover cursor-pointer w-full h-full"
                    priority={slide.id === 1}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ── Desktop: Text overlay on hero ── */}
            <div className="hidden lg:flex absolute inset-0 z-20 items-end pointer-events-none">
              <div className="w-full h-full absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
              <div className="relative px-12 pb-14 max-w-xl">
                <p className="hero-text-line text-blue-300 text-sm font-bold tracking-[0.3em] uppercase mb-3 opacity-0">
                  New Season · 2026
                </p>
                <h1 className="hero-text-line hero-display text-white text-5xl xl:text-6xl mb-4 opacity-0">
                  Believers
                  <br />
                  <span className="text-blue-400">New Collection</span>
                </h1>
                <p className="hero-text-line text-white/75 text-base mb-8 leading-relaxed opacity-0">
                  Premium Islamic lifestyle clothing. Crafted for the modern
                  believer.
                </p>
                <Link
                  href="/products"
                  className="hero-cta-btn btn-glow pointer-events-auto inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm opacity-0 border border-blue-500/40"
                >
                  Shop Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Marquee Ticker (Desktop Only) ──────────────────── */}
        <div className="hidden lg:block overflow-hidden border-y border-gray-100 bg-[#0B1221] py-3 select-none">
          <div className="marquee-track">
            {MARQUEE_ITEMS.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-6 px-8 text-sm font-bold text-white/70 tracking-widest uppercase whitespace-nowrap"
              >
                {item}
                <span className="text-blue-500 opacity-60">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Top Categories ──────────────────────────────────── */}
        <section className="max-w-7xl mx-auto w-full px-4">
          <div className="flex items-center justify-between ">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wider lg:mt-10 mt-2">
              Top Categories
            </h2>
            <Link
              href="/categories"
              className="lg:text-base text-sm font-semibold mb-6 tracking-wider lg:mt-10 mt-2 underline hover:text-gray-500"
            >
              All Categories
            </Link>
          </div>
          <div className="category-grid-desktop grid lg:grid-cols-9 md:grid-cols-6 grid-cols-3 pb-4 gap-4 hide-scrollbar justify-start md:justify-center">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={`/products?category=${cat.name.toLowerCase()}`}
                className="category-item-desktop flex flex-col items-center gap-2 min-w-[90px] group"
              >
                <div className="w-32 h-32 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-gray-100 relative lg:group-hover:border-blue-300 lg:group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <Image
                    width={500}
                    height={500}
                    src={cat.img}
                    alt={cat.name}
                    className="object-cover w-full h-full lg:group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-xs font-medium text-center">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Panjabi Section ─────────────────────────────────── */}
        <section className="max-w-7xl mx-auto w-full px-4">
          <div className="relative w-full lg:aspect-[4/1] aspect-[3/1] bg-gray-200 mb-6 rounded-lg overflow-hidden section-reveal">
            <Image
              src="https://picsum.photos/seed/panjabibanner/1200/300"
              alt="Panjabi Collection"
              width={600}
              height={600}
              className="object-cover w-full h-full"
            />
            {/* Desktop label overlay */}
            <div className="hidden lg:flex absolute inset-0 items-center px-10 pointer-events-none bg-gradient-to-r from-black/50 to-transparent">
              <div>
                <p className="text-blue-300 text-xs font-bold tracking-[0.25em] uppercase mb-1">
                  Featured
                </p>
                <h2 className="hero-display text-white text-3xl">
                  Panjabi Collection
                </h2>
              </div>
            </div>
          </div>
          <div className="product-grid-desktop grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {panjabiProducts.map((product) => (
              <div key={product.id} className="product-card-desktop">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* ── T-Shirt Section ─────────────────────────────────── */}
        <section className="max-w-7xl mx-auto w-full px-4">
          <div className="relative w-full aspect-[4/1] bg-gray-200 mb-6 rounded-lg overflow-hidden section-reveal">
            <Image
              src="https://picsum.photos/seed/tshirtbanner/1200/300"
              alt="T-Shirt Collection"
              fill
              className="object-cover"
            />
            <div className="hidden lg:flex absolute inset-0 items-center px-10 pointer-events-none bg-gradient-to-r from-black/50 to-transparent">
              <div>
                <p className="text-blue-300 text-xs font-bold tracking-[0.25em] uppercase mb-1">
                  Trending
                </p>
                <h2 className="hero-display text-white text-3xl">
                  T-Shirt Collection
                </h2>
              </div>
            </div>
          </div>
          <div className="product-grid-desktop grid grid-cols-2 md:grid-cols-4 gap-4">
            {tshirtProducts.map((product) => (
              <div key={product.id} className="product-card-desktop">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Polo Banner Section ─────────────────────────────── */}
        <section className="max-w-7xl mx-auto w-full px-4">
          <div className="relative w-full aspect-[4/1] bg-gray-200 mb-6 rounded-lg overflow-hidden section-reveal">
            <Image
              src="https://picsum.photos/seed/polobanner/1200/300"
              alt="Polo Collection"
              fill
              className="object-cover"
            />
            <div className="hidden lg:flex absolute inset-0 items-center px-10 pointer-events-none bg-gradient-to-r from-black/50 to-transparent">
              <div>
                <p className="text-blue-300 text-xs font-bold tracking-[0.25em] uppercase mb-1">
                  Classic
                </p>
                <h2 className="hero-display text-white text-3xl">
                  Polo Collection
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Banner (Desktop Only) ────────────────────────── */}
        <section className="cta-banner-desktop hidden lg:block max-w-7xl mx-auto w-full px-4">
          <div className="relative overflow-hidden rounded-2xl bg-[#0B1221] px-12 py-16 text-center border border-blue-900/40">
            {/* Ambient glow blobs */}
            <div className="desktop-glow-blob w-72 h-72 bg-blue-600 -top-20 -left-20" />
            <div className="desktop-glow-blob w-72 h-72 bg-indigo-600 -bottom-20 -right-20" />
            <div className="relative z-10">
              <p className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">
                Limited Time
              </p>
              <h2 className="hero-display text-white text-4xl xl:text-5xl mb-4">
                Eid Collection 2026
                <br />
                <span className="text-blue-400">Is Here</span>
              </h2>
              <p className="text-white/60 text-base max-w-md mx-auto mb-8">
                Explore our exclusive Eid range — premium fabrics, timeless
                designs, crafted for the celebration.
              </p>
              <Link
                href="/products"
                className="btn-glow inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors border border-blue-500/40"
              >
                Explore the Collection <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
