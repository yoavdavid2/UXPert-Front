export const TIMELINE_COLORS = {
  primary: "#1A237E",
  secondary: "#7E69AC",
  accent: "#9C6ADE",
  success: "rgba(26, 35, 126, 0.95)",
  error: "rgba(214, 17, 17, 0.95)",
  errorBorder: "rgb(42, 4, 4)",
  errorUnselected: "rgba(162, 39, 39, 0.7)",
} as const;

export const TIMELINE_SIZES = {
  selected: 82,
  default: 72,
  verticalOffset: 8,
} as const;

export const TIMELINE_ANIMATIONS = {
  duration: 0.2,
  easing: "easeInOut",
} as const;
