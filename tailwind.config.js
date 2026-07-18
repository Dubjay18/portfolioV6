/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        bg: "oklch(var(--bg))",
        "bg-alt": "oklch(var(--bg-alt))",
        ink: "oklch(var(--ink))",
        "ink-muted": "oklch(var(--ink-muted))",
        "ink-faint": "oklch(var(--ink-faint))",
        border: "oklch(var(--border))",
        accent: "oklch(var(--accent))",
        "accent-soft": "oklch(var(--accent-soft))",
        "card-bg": "oklch(var(--card-bg))",
        // Legacy aliases: many peripheral components (Table, Accordion,
        // Comments, EmptyState, etc.) reference these red-accent names.
        // Remapping them onto the new palette keeps the whole app in one
        // consistent color system without a full file-by-file sweep.
        "primary-color": "oklch(var(--accent))",
        "secondary-color": "oklch(var(--accent))",
        "tertiary-color": "oklch(var(--accent))",
        "primary-bg": "oklch(var(--card-bg))",
        "secondary-bg": "oklch(var(--bg-alt))",
      },
      boxShadow: {
        "line-light": "rgba(17, 17, 26, 0.1) 0px 1px 0px",
        "line-dark": "rgb(29, 29, 32) 0px 1px 0px",
      },
      gridTemplateColumns: {
        custom: "1.2fr 1fr",
        asymmetric: "1.3fr 1fr",
      },
      gridTemplateRows: {
        fit: "min-content 0fr",
        full: "min-content 1fr",
      },
      backgroundPosition: {
        zero: "0 0",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(18px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        floatBlob: {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(14px,-18px)" },
        },
        blink: {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
        cellIn: {
          from: { opacity: 0, transform: "scale(.5)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        ringSpin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        ringPulse: {
          "0%": { transform: "scale(1)", opacity: 0.5 },
          "70%": { transform: "scale(1.5)", opacity: 0 },
          "100%": { opacity: 0 },
        },
        legWiggle: {
          "0%, 100%": { transform: "rotate(-20deg)" },
          "50%": { transform: "rotate(20deg)" },
        },
        legWiggleAlt: {
          "0%, 100%": { transform: "rotate(20deg)" },
          "50%": { transform: "rotate(-20deg)" },
        },
        tailWag: {
          "0%, 100%": { transform: "rotate(-24deg)" },
          "50%": { transform: "rotate(24deg)" },
        },
        petBob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp .7s cubic-bezier(.16,1,.3,1) forwards",
        floatBlob: "floatBlob 9s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        cellIn: "cellIn .4s ease forwards",
        marquee: "marquee 26s linear infinite",
        ringSpin: "ringSpin 40s linear infinite",
        ringPulse: "ringPulse 2.4s ease-out infinite",
        legWiggle: "legWiggle .35s ease-in-out infinite",
        legWiggleAlt: "legWiggleAlt .35s ease-in-out infinite",
        tailWag: "tailWag .6s ease-in-out infinite",
        petBob: "petBob .5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
