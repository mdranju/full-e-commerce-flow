"use client";

import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function Home() {
  const panjabiProducts = products.filter((p) => p.category === "panjabi");
  const tshirtProducts = products.filter((p) => p.category === "t-shirt");

  const heroSlides = [
    {
      id: 1,
      image: "https://picsum.photos/seed/hero1/1920/900",
      alt: "Eid Special Collection 1",
    },
    {
      id: 2,
      image: "/banner-ranju.jpg",
      alt: "Eid Special Collection 2",
    },
    {
      id: 3,
      image: "https://picsum.photos/seed/hero3/1920/900",
      alt: "Eid Special Collection 3",
    },
    {
      id: 4,
      image: "https://picsum.photos/seed/hero4/1920/900",
      alt: "Eid Special Collection 3",
    },
    {
      id: 5,
      image: "https://picsum.photos/seed/hero7/1920/900",
      alt: "Eid Special Collection 3",
    },
    {
      id: 6,
      // image: "https://picsum.photos/seed/hero8/1920/900",
      image: "/banner.jpg",
      alt: "Eid Special Collection 3",
    },
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto w-full px-4">
        <div className="relative w-full aspect-[20.8/9.8] md:aspect-[3/1.4] bg-gray-200 rounded-lg overflow-hidden mt-5">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            speed={800}
            loop={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            className="w-full h-full hero-swiper group"
          >
            {/* Custom Navigation Arrows */}
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
                  // fill
                  className="object-cover cursor-pointer w-full h-full"
                  priority={slide.id === 1}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Top Categories */}
      <section className="max-w-7xl mx-auto w-full px-4">
        <div className="flex items-center justify-between">
          <h2 className=" text-xl font-bold mb-6 uppercase tracking-wider lg:mt-10 mt-2">
            Top Categories
          </h2>
          <Link
            href="/categories"
            className=" text-base font-semibold mb-6 tracking-wider lg:mt-10 mt-2 underline hover:text-gray-500"
          >
            All Categories
          </Link>
        </div>
        <div className="grid lg:grid-cols-9 md:grid-cols-6 grid-cols-3 pb-4 gap-4 hide-scrollbar justify-start md:justify-center">
          {[
            {
              name: "Panjabi",
              // img: "https://picsum.photos/seed/cat1/1000/1000",
              img: "/mini.jpg",
            },
            // { name: "Shirt", img: "https://picsum.photos/seed/cat2/1000/1000" },
            { name: "Shirt", img: "/template.jpg" },
            {
              name: "T-shirt",
              img: "https://picsum.photos/seed/cat3/1000/1000",
            },
            { name: "Polo", img: "https://picsum.photos/seed/cat4/1000/1000" },
            { name: "Pant", img: "https://picsum.photos/seed/cat5/1000/1000" },
            {
              name: "Perfume",
              img: "https://picsum.photos/seed/cat6/1000/1000",
            },
            {
              name: "Gadget",
              img: "https://picsum.photos/seed/cat7/1000/1000",
            },
            {
              name: "Sneaker",
              img: "https://picsum.photos/seed/cat8/1000/1000",
            },
            { name: "Food", img: "https://picsum.photos/seed/cat9/1000/1000" },
          ].map((cat, i) => (
            <Link
              key={i}
              href={`/products?category=${cat.name.toLowerCase()}`}
              className="flex flex-col items-center gap-2 min-w-[90px]"
            >
              <div className="w-32 h-32 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-gray-100 relative">
                <Image
                  width={500}
                  height={500}
                  src={cat.img}
                  alt={cat.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-xs font-medium text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Showroom Banner */}
      {/* <section className="max-w-7xl mx-auto w-full px-4">
        <div className="relative w-full lg:aspect-[4/1] aspect-[3/1] bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src="https://picsum.photos/seed/showroom/1400/300"
            alt="Showroom Direction"
            width={1000}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>
      </section> */}

      {/* Panjabi Section */}
      <section className="max-w-7xl mx-auto w-full px-4">
        <div className="relative w-full lg:aspect-[4/1] aspect-[3/1] bg-gray-200 mb-6 rounded-lg overflow-hidden">
          <Image
            src="https://picsum.photos/seed/panjabibanner/1200/300"
            alt="Panjabi Collection"
            width={600}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {panjabiProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* T-Shirt Section */}
      <section className="max-w-7xl mx-auto w-full px-4">
        <div className="relative w-full aspect-[4/1] bg-gray-200 mb-6 rounded-lg overflow-hidden">
          <Image
            src="https://picsum.photos/seed/tshirtbanner/1200/300"
            alt="T-Shirt Collection"
            fill
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tshirtProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Polo Section */}
      <section className="max-w-7xl mx-auto w-full px-4">
        <div className="relative w-full aspect-[4/1] bg-gray-200 mb-6 rounded-lg overflow-hidden">
          <Image
            src="https://picsum.photos/seed/polobanner/1200/300"
            alt="Polo Collection"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </div>
  );
}
