import { ImageResponse } from "next/og";

// Colors are plain hex, not the site's oklch() tokens — ImageResponse
// renders via Satori, which doesn't parse CSS Color Level 4 syntax (the
// same class of bug that broke the GitHub contribution graph theme).
const CHIP_BG = "#242220";
const ACCENT = "#059669";
const INK = "#ececec";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: CHIP_BG,
          borderRadius: 6,
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: -1,
        }}
      >
        <span style={{ color: ACCENT }}>&gt;</span>
        <span style={{ color: INK, marginLeft: 1 }}>j</span>
      </div>
    ),
    { ...size }
  );
}
