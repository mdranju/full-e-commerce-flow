"use client";

import Image, { ImageProps } from "next/image";
import { useState, useCallback } from "react";
import { resolveImageUrl, IMAGE_SIZES, IMAGE_QUALITY } from "@/src/utils/image";

type ImageContext = "thumbnail" | "card" | "banner" | "detail" | "hero";

interface OptimizedImageProps extends Omit<ImageProps, "src" | "alt" | "onError"> {
  /** Raw image path from the API (relative or absolute) */
  src: string | undefined | null;
  alt: string;
  /** Context determines quality, sizes, and loading strategy automatically */
  context?: ImageContext;
  /** Custom fallback image path */
  fallback?: string;
  /** Show a shimmer skeleton while loading */
  showSkeleton?: boolean;
}

/**
 * A drop-in replacement for Next.js `<Image>` that automatically:
 * - Resolves relative server paths to full URLs
 * - Selects appropriate quality and sizes based on context
 * - Shows a skeleton shimmer placeholder while loading
 * - Gracefully falls back to a placeholder on error
 */
export function OptimizedImage({
  src,
  alt,
  context = "card",
  fallback = "/placeholder.jpg",
  showSkeleton = true,
  className = "",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const resolvedSrc = hasError ? fallback : resolveImageUrl(src, fallback);

  const qualityMap: Record<ImageContext, number> = {
    thumbnail: IMAGE_QUALITY.low,
    card: IMAGE_QUALITY.medium,
    banner: IMAGE_QUALITY.medium,
    detail: IMAGE_QUALITY.high,
    hero: IMAGE_QUALITY.high,
  };

  const sizesMap: Record<ImageContext, string> = {
    thumbnail: IMAGE_SIZES.thumbnail,
    card: IMAGE_SIZES.card,
    banner: IMAGE_SIZES.banner,
    detail: IMAGE_SIZES.detail,
    hero: IMAGE_SIZES.hero,
  };

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  return (
    <div className={`relative ${props.fill ? "w-full h-full" : ""} ${showSkeleton && isLoading ? "overflow-hidden" : ""}`}>
      {/* Skeleton shimmer while loading */}
      {showSkeleton && isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-inherit z-[1]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </div>
      )}

      <Image
        src={resolvedSrc}
        alt={alt}
        quality={props.quality || qualityMap[context]}
        sizes={props.sizes || sizesMap[context]}
        loading={context === "hero" || props.priority ? undefined : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-500 ${
          isLoading && showSkeleton ? "opacity-0" : "opacity-100"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
