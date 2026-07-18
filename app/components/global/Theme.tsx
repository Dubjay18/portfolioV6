"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Theme() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  function toggleTheme() {
    return currentTheme === "light" ? setTheme("dark") : setTheme("light");
  }
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted)
    return (
      <span className="animate-pulse w-[42px] h-[23px] rounded-xl border border-border bg-border block" />
    );

  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`w-[42px] h-[23px] rounded-xl border border-border relative flex-shrink-0 transition-colors duration-300 active:scale-[0.94] ${
        isDark ? "bg-accent" : "bg-border"
      }`}
    >
      <span
        className={`absolute top-[1px] w-[17px] h-[17px] rounded-full transition-[left] duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] ${
          isDark ? "left-[21px] bg-bg" : "left-[1px] bg-card-bg"
        }`}
      />
    </button>
  );
}
