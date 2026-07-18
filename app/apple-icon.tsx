import { ImageResponse } from "next/og";

// Plain hex, not oklch() — see icon.tsx for why.
const CHIP_BG = "#242220";
const ACCENT = "#059669";
const INK = "#ececec";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 36,
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: 58,
          letterSpacing: -2,
        }}
      >
        <span style={{ color: ACCENT }}>&gt;</span>
        <span style={{ color: INK, marginLeft: 4 }}>jay</span>
        <span
          style={{
            display: "block",
            width: 26,
            height: 52,
            background: ACCENT,
            marginLeft: 10,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
