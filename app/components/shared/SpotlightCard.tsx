"use client";
import { useRef } from "react";

// Cursor-tracked radial glow. The position is written straight to a CSS var
// via a ref on mousemove — never React state — so 60fps tracking never
// triggers a re-render.
export default function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const spotRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    spotRef.current?.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    spotRef.current?.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={onMouseMove}
      className={`group relative rounded-[13px] p-[1px] bg-border overflow-hidden ${className}`}
    >
      <div className="relative rounded-[13px] bg-card-bg p-7 h-full box-border">
        <div
          ref={spotRef}
          aria-hidden
          className="absolute inset-0 rounded-[13px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), oklch(var(--accent-soft)), transparent 70%)",
          }}
        />
        {children}
      </div>
    </div>
  );
}
