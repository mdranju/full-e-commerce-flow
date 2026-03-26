"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Desktop-only GSAP cursor with magnetic lag effect
export function DesktopCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Guard: only run on desktop
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;

      let mouseX = 0, mouseY = 0;
      let ringX = 0, ringY = 0;

      const onMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Dot snaps instantly
        gsap.set(dot, { x: mouseX, y: mouseY });
      };

      // Lag ring with ticker
      const ticker = gsap.ticker.add(() => {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        gsap.set(ring, { x: ringX, y: ringY });
      });

      // Hover expansion
      const addHover = (el: Element) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(ring, { scale: 1.8, borderColor: "rgba(59,130,246,0.9)", duration: 0.25 });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(ring, { scale: 1, borderColor: "rgba(59,130,246,0.6)", duration: 0.25 });
        });
      };
      document.querySelectorAll("a, button, [role='button']").forEach(addHover);

      window.addEventListener("mousemove", onMove);

      return () => {
        window.removeEventListener("mousemove", onMove);
        gsap.ticker.remove(ticker);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <div id="cursor-ring" ref={ringRef} />
      <div id="cursor-dot" ref={dotRef} />
    </>
  );
}
