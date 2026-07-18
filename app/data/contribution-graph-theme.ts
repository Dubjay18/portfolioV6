// react-github-calendar parses these colors internally (even during SSR at
// build time) and does not support CSS Color Level 4 syntax like oklch() —
// hex only here. Values are hand-picked to match the emerald accent ramp
// used elsewhere (oklch(58% 0.13 155) light / oklch(70% 0.14 155) dark).
export const github: any = {
  light: ["#e4e2dc", "#a7f3d0", "#6ee7b7", "#34d399", "#059669"],
  dark: ["#302d28", "#065f46", "#059669", "#10b981", "#34d399"],
};
