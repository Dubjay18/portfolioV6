"use client";
import { useEffect, useRef, useState } from "react";

export default function TypewriterRole({ roles }: { roles: string[] }) {
  const [typed, setTyped] = useState("");
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      roles.length === 0
    ) {
      setTyped(roles[0] ?? "");
      return;
    }

    const tick = () => {
      const full = roles[roleIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setTyped(full.slice(0, charIdx.current));
        if (charIdx.current === full.length) {
          deleting.current = true;
          timer.current = setTimeout(tick, 1400);
          return;
        }
      } else {
        charIdx.current--;
        setTyped(full.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % roles.length;
        }
      }
      timer.current = setTimeout(tick, deleting.current ? 45 : 75);
    };
    timer.current = setTimeout(tick, 75);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="font-mono text-lg text-ink-muted h-[26px]">
      <span>{typed}</span>
      <span className="animate-blink">|</span>
    </div>
  );
}
