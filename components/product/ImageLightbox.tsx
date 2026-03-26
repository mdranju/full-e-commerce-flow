"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

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

  // isGesturing drives the CSS transition (true = no transition during active gesture)
  const [isGesturing, setIsGesturing] = useState(false);

  // Touch tracking refs (no re-renders during gesture)
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const lastTouchDist = useRef<number | null>(null);
  const lastScale = useRef(1);
  const lastTranslate = useRef({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const resetTransform = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    lastScale.current = 1;
    lastTranslate.current = { x: 0, y: 0 };
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(images.length - 1, index));
      setCurrentIndex(clamped);
      resetTransform();
    },
    [images.length, resetTransform],
  );

  // ── Touch handlers ──────────────────────────────────────────────────────────

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
        // Begin pan
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
      // ── Pinch-to-zoom ──────────────────────────────────────────────────────
      e.preventDefault(); // only works with passive:false; handled below via ref
      const newDist = getDist(e.touches);
      const delta = newDist / lastTouchDist.current;
      const newScale = Math.min(4, Math.max(1, lastScale.current * delta));
      setScale(newScale);
      if (newScale === 1) resetTransform();
    } else if (e.touches.length === 1 && isPanning.current) {
      // ── Pan ────────────────────────────────────────────────────────────────
      const nx = e.touches[0].clientX - panStart.current.x;
      const ny = e.touches[0].clientY - panStart.current.y;
      setTranslate({ x: nx, y: ny });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches.length === 1 && !isPanning.current) {
      // ── Swipe detection ────────────────────────────────────────────────────
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;

      // Only treat as swipe when scale is 1 and horizontal dominates
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
      // Finalise pinch
      lastScale.current = scale;
      lastTranslate.current = translate;
      lastTouchDist.current = null;

      // Snap back to 1× if near reset
      if (scale < 1.05) resetTransform();
    }
    if (e.touches.length === 0) {
      lastTranslate.current = translate;
      isPanning.current = false;
      setIsGesturing(false);
    }
  };

  // Attach passive:false touch listener to allow preventDefault in pinch
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

  if (!isOpen) return null;

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < images.length - 1;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/90 flex flex-col"
      aria-modal
      role="dialog"
    >
      {/* Top bar */}
      <div className="relative flex items-center justify-between px-4 py-3 shrink-0">
        <span className="text-white/60 text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Close image viewer"
        >
          <X size={22} />
        </button>
      </div>

      {/* Image area */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden flex items-center justify-center select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          // Close on backdrop tap only when at 1× scale
          if (e.target === e.currentTarget && scale === 1) onClose();
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
            transformOrigin: "center center",
            transition: isGesturing ? "none" : "transform 0.15s ease-out",
          }}
        >
          <Image
            src={images[currentIndex]}
            alt={`Product image ${currentIndex + 1}`}
            fill
            className="object-contain pointer-events-none"
            priority
            draggable={false}
          />
        </div>

        {/* Left arrow */}
        {canGoPrev && (
          <button
            onClick={() => goTo(currentIndex - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Right arrow */}
        {canGoNext && (
          <button
            onClick={() => goTo(currentIndex + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 py-4 shrink-0">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`rounded-full transition-all duration-200 ${
                idx === currentIndex
                  ? "w-5 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
