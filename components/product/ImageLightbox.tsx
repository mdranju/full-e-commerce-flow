/* eslint-disable react-hooks/immutability */
"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  // Touch tracking refs
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const lastTouchDist = useRef<number | null>(null);
  const lastScale = useRef(1);
  const lastTranslate = useRef({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const resetTransform = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    lastScale.current = 1;
    lastTranslate.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      resetTransform();
    }
  }, [isOpen, initialIndex, resetTransform]);

  const [isGesturing, setIsGesturing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo(currentIndex - 1);
      if (e.key === "ArrowRight") goTo(currentIndex + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, currentIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(images.length - 1, index));
      setCurrentIndex(clamped);
      resetTransform();
    },
    [images.length, resetTransform],
  );

  const getDist = (touches: React.TouchList) =>
    Math.hypot(
      touches[1].clientX - touches[0].clientX,
      touches[1].clientY - touches[0].clientY,
    );

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;

      if (lastScale.current > 1) {
        isPanning.current = true;
        setIsGesturing(true);
        panStart.current = {
          x: e.touches[0].clientX - lastTranslate.current.x,
          y: e.touches[0].clientY - lastTranslate.current.y,
        };
      } else {
        isPanning.current = false;
      }
    } else if (e.touches.length === 2) {
      isPanning.current = false;
      setIsGesturing(true);
      lastTouchDist.current = getDist(e.touches);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDist.current !== null) {
      e.preventDefault();
      const newDist = getDist(e.touches);
      const delta = newDist / lastTouchDist.current;
      const newScale = Math.min(4, Math.max(1, lastScale.current * delta));
      setScale(newScale);
      if (newScale === 1) resetTransform();
    } else if (e.touches.length === 1 && isPanning.current) {
      const nx = e.touches[0].clientX - panStart.current.x;
      const ny = e.touches[0].clientY - panStart.current.y;
      setTranslate({ x: nx, y: ny });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches.length === 1 && !isPanning.current) {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;

      if (
        lastScale.current === 1 &&
        Math.abs(deltaX) > Math.abs(deltaY) &&
        Math.abs(deltaX) > 50
      ) {
        if (deltaX < 0) goTo(currentIndex + 1);
        else goTo(currentIndex - 1);
      }
    }

    if (e.touches.length < 2) {
      lastScale.current = scale;
      lastTranslate.current = translate;
      lastTouchDist.current = null;
      if (scale < 1.05) resetTransform();
    }
    if (e.touches.length === 0) {
      lastTranslate.current = translate;
      isPanning.current = false;
      setIsGesturing(false);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prevent = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    el.addEventListener("touchmove", prevent, { passive: false });
    return () => el.removeEventListener("touchmove", prevent);
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < images.length - 1;

  const lightboxContent = (
    <div
      className="fixed inset-0 z-[9999] bg-[#0B1221]/95 backdrop-blur-3xl flex flex-col"
      aria-modal
      role="dialog"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-5 shrink-0 z-10">
        <div className="flex flex-col">
          <span className="text-white font-black text-xl tracking-tighter leading-none mb-1">
            Preview Gallery
          </span>
          <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white text-white hover:text-[#0B1221] active:scale-95 transition-all duration-500"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Image Viewport */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          if (e.target === e.currentTarget && scale === 1) onClose();
        }}
      >
        <div
          className="relative w-full h-[60vh] md:h-[70vh] max-w-5xl mx-auto pointer-events-none"
          style={{
            transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
            transformOrigin: "center center",
            transition: isGesturing
              ? "none"
              : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="absolute inset-4 rounded-[3rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-3xl overflow-hidden">
            <Image
              src={images[currentIndex]}
              alt={`Product view ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
              draggable={false}
            />
            {/* Subtle ambient light for dark images */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Navigation Arrows (Desktop) */}
        <div className="hidden lg:block">
          {canGoPrev && (
            <button
              onClick={() => goTo(currentIndex - 1)}
              className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-[2rem] bg-white/5 hover:bg-white text-white hover:text-[#0B1221] border border-white/10 backdrop-blur-xl transition-all duration-500 shadow-2xl"
            >
              <ChevronLeft size={32} />
            </button>
          )}
          {canGoNext && (
            <button
              onClick={() => goTo(currentIndex + 1)}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-[2rem] bg-white/5 hover:bg-white text-white hover:text-[#0B1221] border border-white/10 backdrop-blur-xl transition-all duration-500 shadow-2xl"
            >
              <ChevronRight size={32} />
            </button>
          )}
        </div>
      </div>

      {/* Preview Gallery / Thumbnails */}
      <div className="shrink-0 w-full px-6 py-8 overflow-x-auto hide-scrollbar z-10 flex justify-center bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                resetTransform();
              }}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-500 shrink-0 ${
                idx === currentIndex
                  ? "border-white scale-110 shadow-2xl shadow-white/20"
                  : "border-white/10 opacity-40 hover:opacity-100 hover:border-white/30"
              }`}
            >
              <Image
                src={img}
                alt={`Preview ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(lightboxContent, document.body);
}
