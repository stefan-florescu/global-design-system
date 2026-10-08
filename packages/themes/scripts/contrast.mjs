/**
 * WCAG 2.2 contrast checks for semantic colour pairings, in every theme.
 * Colours are OKLCH (or hex); converted to sRGB for relative luminance.
 */

/** Pairings every theme must satisfy: [foreground, background, minimum ratio, label]. */
export const PAIRS = [
  ...["heading", "body", "body-subtle", "brand", "success", "danger", "warning"].flatMap((fg) =>
    ["default", "subtle"].map((bg) => [`text.${fg}`, `background.${bg}`, 4.5, "Text"]),
  ),
  ["text.brand-strong", "background.brand-soft", 4.5, "Text"],
  ["text.success", "background.success-soft", 4.5, "Text"],
  ["text.danger", "background.danger-soft", 4.5, "Text"],
  ["text.warning", "background.warning-soft", 4.5, "Text"],
  ["text.on-brand", "background.brand", 4.5, "Text"],
  ["text.on-brand", "background.brand-strong", 4.5, "Text"],
  ["text.on-brand", "background.success", 4.5, "Text"],
  ["text.on-brand", "background.danger", 4.5, "Text"],
  ["text.on-brand", "background.inverse", 4.5, "Text"],
  ["border.focus", "background.default", 3, "Non-text"],
  ["border.focus", "background.subtle", 3, "Non-text"],
  ["border.control", "background.default", 3, "Non-text"],
  ["border.control", "background.subtle", 3, "Non-text"],
];

function oklchToLinearRgb(l, c, h) {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ].map((channel) => Math.min(1, Math.max(0, channel)));
}

function hexToLinearRgb(hex) {
  const full = hex.length === 4 ? hex.replace(/^#(.)(.)(.)$/, "#$1$1$2$2$3$3") : hex;
  return [1, 3, 5].map((i) => {
    const v = parseInt(full.slice(i, i + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
}

export function luminance(color) {
  const oklch = color.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/);
  const [r, g, b] = oklch
    ? oklchToLinearRgb(Number(oklch[1]) / (oklch[2] ? 100 : 1), Number(oklch[3]), Number(oklch[4]))
    : hexToLinearRgb(color.trim());
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Check every pair in every theme. `themes` maps theme → Map(path → value). */
export function checkPairs(themes) {
  return PAIRS.map(([fg, bg, min, kind]) => {
    const results = Object.fromEntries(
      Object.entries(themes).map(([theme, values]) => {
        const ratio = contrast(values.get(`color.${fg}`), values.get(`color.${bg}`));
        return [theme, { ratio: Math.round(ratio * 100) / 100, pass: ratio >= min }];
      }),
    );
    return { foreground: fg, background: bg, minimum: min, kind, results };
  });
}
