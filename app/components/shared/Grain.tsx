"use client";
import { useEffect, useRef } from "react";

// Set imperatively rather than as a static CSS/inline-style string: some
// build pipelines mangle camelCase SVG filter attributes (baseFrequency,
// numOctaves, stitchTiles) when they pass through a JSX/string transform.
export default function Grain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const svg =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch' result='t'/%3E%3CfeColorMatrix in='t' type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 8 -3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";
    el.style.backgroundImage = `url("${svg}")`;
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-40 pointer-events-none opacity-[0.06]"
    />
  );
}
