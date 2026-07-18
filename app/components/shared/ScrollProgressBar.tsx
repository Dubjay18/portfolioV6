"use client";
import { useEffect, useRef } from "react";

// rAF-throttled scroll listener — the one deliberate exception (alongside
// Pet) to "no scroll-position listeners", since this genuinely needs
// continuous scroll position.
export default function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const pct = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0;
        if (ref.current) ref.current.style.width = `${pct}%`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed top-0 left-0 h-[3px] w-0 bg-accent z-[60] transition-[width] duration-100 ease-linear"
    />
  );
}
