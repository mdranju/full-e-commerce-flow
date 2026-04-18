"use client";

import { useState, useEffect, useMemo } from "react";
import { ProductCard } from "../product/ProductCard";
import { Carousel } from "./Carousel";

interface BatchProductSliderProps {
  products: any[];
  desktopBatchSize?: number;
  mobileBatchSize?: number;
  autoSlide?: boolean;
}

export function BatchProductSlider({
  products = [],
  desktopBatchSize = 8,
  mobileBatchSize = 4,
  autoSlide = true,
}: BatchProductSliderProps) {
  const [currentBatchSize, setCurrentBatchSize] = useState(desktopBatchSize);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setCurrentBatchSize(window.innerWidth < 768 ? mobileBatchSize : desktopBatchSize);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [desktopBatchSize, mobileBatchSize]);

  const effectiveBatchSize = isMounted ? currentBatchSize : desktopBatchSize;

  // Memoize batches so they don't recompute on every render
  const batches = useMemo(() => {
    const result = [];
    for (let i = 0; i < products.length; i += effectiveBatchSize) {
      result.push(products.slice(i, i + effectiveBatchSize));
    }
    return result;
  }, [products, effectiveBatchSize]);

  if (batches.length === 0) return null;

  return (
    <div className="relative group/slider w-full h-full min-h-[400px]">
      <Carousel
        autoplay={autoSlide}
        autoplayDelay={6000}
        showDots
        showArrows
        className="w-full h-full"
        dotColor="bg-[#0B1221]"
        containerClassName="w-full h-full"
        options={{ loop: batches.length > 1, align: "start" }}
        arrowClassName="hidden lg:flex"
      >
        {batches.map((batch, batchIdx) => (
          <div key={`${effectiveBatchSize}-${batchIdx}`} className="pb-12 flex-[0_0_100%] min-w-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {batch.map((product: any) => (
                <div
                  key={product._id || product.id}
                  className="product-card-container h-full"
                >
                  <ProductCard product={product} />
                </div>
              ))}
              {/* Fill empty spots to maintain grid layout on desktop */}
              {batch.length < effectiveBatchSize &&
                Array(effectiveBatchSize - batch.length)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="hidden md:block opacity-0 pointer-events-none"
                    />
                  ))}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
