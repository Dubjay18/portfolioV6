// Terminal-prompt brand mark: a fixed dark chip reading `>jay` + a blinking
// cursor block, optionally paired with the `jay.dev` wordmark. The chip
// background is intentionally fixed dark charcoal regardless of page
// light/dark mode — it's a self-contained mark, not a theme-adaptive one.
// `accent`/`ink` (wordmark only) do follow the page theme via the site's
// existing CSS var tokens.
type Variant = "mark" | "wordmark" | "lockup" | "stacked";
type Size = "sm" | "md" | "lg";

const SCALE: Record<Size, number> = { sm: 0.7, md: 1, lg: 1.6 };
const MARK_INK = "oklch(93% 0.006 85)";
const CHIP_BG = "oklch(22% 0.012 85)";

export default function Logo({
  variant = "lockup",
  size = "md",
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const scale = SCALE[size];
  const showMark = variant !== "wordmark";
  const showWordmark = variant !== "mark";
  const stacked = variant === "stacked";

  const fontSize = Math.round(15 * scale);
  const wordmarkSize = Math.round(20 * scale);
  const gap = stacked ? Math.round(4 * scale) : Math.round(10 * scale);
  const padV = Math.round(7 * scale);
  const padH = Math.round(11 * scale);
  const radius = Math.round(8 * scale);
  const cursorW = Math.max(2, Math.round(fontSize * 0.5));
  const cursorH = Math.round(fontSize * 0.95);

  return (
    <span
      className={`inline-flex items-center ${stacked ? "flex-col" : "flex-row"} ${className}`}
      style={{ gap }}
    >
      {showMark && (
        <span
          className="inline-flex items-center leading-none flex-shrink-0 font-mono font-semibold"
          style={{
            fontSize,
            letterSpacing: "-0.01em",
            background: CHIP_BG,
            padding: `${padV}px ${padH}px`,
            borderRadius: radius,
          }}
        >
          <span className="text-accent">&gt;</span>
          <span style={{ color: MARK_INK, marginLeft: 2 }}>jay</span>
          <span
            aria-hidden
            className="inline-block bg-accent opacity-100 motion-safe:animate-blink"
            style={{ width: cursorW, height: cursorH, marginLeft: 3 }}
          />
        </span>
      )}
      {showWordmark && (
        <span
          className="font-mono font-semibold tracking-[-0.02em] text-ink leading-none whitespace-nowrap"
          style={{ fontSize: wordmarkSize }}
        >
          jay<span className="text-accent">.</span>dev
        </span>
      )}
    </span>
  );
}
