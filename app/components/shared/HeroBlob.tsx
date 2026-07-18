"use client";
import { useEffect, useRef } from "react";

// Soft radial accent glow behind the hero text: floats via CSS keyframe and
// drifts with cursor position. The mousemove handler writes `transform`
// straight to the DOM node via a ref, never React state, so tracking never
// re-renders the page.
export default function HeroBlob() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const dx = (e.clientX / window.innerWidth - 0.5) * 30;
      const dy = (e.clientY / window.innerHeight - 0.5) * 30;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute top-[10%] right-[-5%] w-[480px] h-[480px] rounded-full pointer-events-none blur-[10px] animate-floatBlob will-change-transform"
      style={{
        background:
          "radial-gradient(circle, oklch(var(--accent-soft)), transparent 70%)",
      }}
    />
  );
}
