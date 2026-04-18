"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode;
  options?: any;
  autoplay?: boolean;
  autoplayDelay?: number;
  fade?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  containerClassName?: string;
  onSelect?: (index: number) => void;
  dotColor?: string;
  arrowClassName?: string;
  prevEl?: string;
  nextEl?: string;
}

export const Carousel = ({
  children,
  options = { loop: true, align: "start" },
  autoplay = false,
  autoplayDelay = 4000,
  fade = false,
  showArrows = false,
  showDots = false,
  className = "",
  containerClassName = "",
  onSelect,
  dotColor = "bg-white",
  arrowClassName = "",
}: CarouselProps) => {
  const plugins = [];
  if (autoplay) {
    plugins.push(Autoplay({ delay: autoplayDelay, stopOnInteraction: false }));
  }
  if (fade) {
    plugins.push(Fade());
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const selectHandler = useCallback((emblaApi: any) => {
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    if (onSelect) onSelect(index);
  }, [onSelect]);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    selectHandler(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", selectHandler);
  }, [emblaApi, onInit, selectHandler]);

  return (
    <div className={`relative ${containerClassName}`}>
      <div className={`overflow-hidden ${className}`} ref={emblaRef}>
        <div className={`flex ${fade ? "[&>*]:flex-[0_0_100%] [&>*]:min-w-0" : "touch-pan-y"}`}>
          {children}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 transition-all hover:bg-white hover:text-black focus:outline-none ${arrowClassName}`}
            onClick={scrollPrev}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 transition-all hover:bg-white hover:text-black focus:outline-none ${arrowClassName}`}
            onClick={scrollNext}
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {showDots && scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                index === selectedIndex
                  ? `${dotColor} w-6`
                  : `${dotColor}/20 w-1.5`
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
