"use client";
import { useEffect, useRef } from "react";

// Perimeter walk driven by requestAnimationFrame + elapsed time, applied via
// translate3d on a ref (never React state) so the loop never re-renders.
// Frozen at its start position under prefers-reduced-motion.
export default function Pet() {
  const petRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const margin = 34;
    const speed = 68;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const el = petRef.current;
      const flip = flipRef.current;
      if (el) {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const topLen = Math.max(1, W - 2 * margin);
        const sideLen = Math.max(1, H - 2 * margin);
        const total = 2 * topLen + 2 * sideLen;
        const elapsed = (now - start) / 1000;
        const dist = (elapsed * speed) % total;
        let x: number, y: number;
        let facingLeft = false;
        if (dist < topLen) {
          x = margin + dist;
          y = margin;
        } else if (dist < topLen + sideLen) {
          x = W - margin;
          y = margin + (dist - topLen);
        } else if (dist < topLen + sideLen + topLen) {
          x = W - margin - (dist - topLen - sideLen);
          y = H - margin;
          facingLeft = true;
        } else {
          x = margin;
          y = H - margin - (dist - 2 * topLen - sideLen);
        }
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (flip) flip.style.transform = facingLeft ? "scaleX(-1)" : "scaleX(1)";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const color = "oklch(58% 0.15 150)";
  const colorDark = "oklch(46% 0.14 150)";
  const eyeColor = "oklch(20% 0.01 85)";

  return (
    <div
      ref={petRef}
      aria-hidden
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[45]"
    >
      <div ref={flipRef} className="relative w-[34px] h-[22px]">
        <div className="relative w-full h-full animate-petBob">
          <div
            className="absolute left-[-6px] top-[2px] w-[9px] h-[5px] rounded-[4px] origin-right animate-tailWag"
            style={{ background: color }}
          />
          <div
            className="absolute left-0 top-[3px] w-[26px] h-[13px] rounded-[8px]"
            style={{ background: color }}
          />
          <div
            className="absolute left-[3px] top-[13px] w-[4px] h-[8px] rounded-[2px] origin-top animate-legWiggle"
            style={{ background: colorDark }}
          />
          <div
            className="absolute left-[9px] top-[13px] w-[4px] h-[8px] rounded-[2px] origin-top animate-legWiggleAlt"
            style={{ background: colorDark }}
          />
          <div
            className="absolute left-[15px] top-[13px] w-[4px] h-[8px] rounded-[2px] origin-top animate-legWiggle"
            style={{ background: colorDark }}
          />
          <div
            className="absolute left-[21px] top-[13px] w-[4px] h-[8px] rounded-[2px] origin-top animate-legWiggleAlt"
            style={{ background: colorDark }}
          />
          <div
            className="absolute left-[20px] top-[-3px] w-[16px] h-[16px] rounded-full"
            style={{ background: color }}
          >
            <div
              className="absolute left-[1px] top-[-4px] w-[5px] h-[7px] rounded-[3px] -rotate-[18deg]"
              style={{ background: color }}
            />
            <div
              className="absolute right-[1px] top-[-4px] w-[5px] h-[7px] rounded-[3px] rotate-[18deg]"
              style={{ background: color }}
            />
            <div
              className="absolute right-[2px] top-[6px] w-[3px] h-[3px] rounded-full"
              style={{ background: eyeColor }}
            />
            <div
              className="absolute right-[-2px] top-[9px] w-[6px] h-[4px] rounded-b-[6px]"
              style={{ background: colorDark }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
