import { useState, useEffect, useRef } from "react";

export function useScroll(threshold = 0) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 1024;

      // Check if at top
      setIsAtTop(currentScrollY <= threshold);

      // Traditional scrolled state (with buffer)
      setScrolled(currentScrollY > 60);

      // Visibility logic (hide on scroll down, show on scroll up - mostly for mobile)
      if (isMobile) {
        const delta = currentScrollY - lastScrollY.current;
        const scrollThreshold = 10;

        if (Math.abs(delta) > scrollThreshold) {
          if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { isAtTop, scrolled, isVisible };
}
