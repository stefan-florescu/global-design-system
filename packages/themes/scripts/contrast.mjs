/**
 * WCAG 2.2 contrast checks for semantic colour pairings, in every theme.
 * Colours are OKLCH (or hex); converted to sRGB for relative luminance.
 */

/** Pairings every theme must satisfy: [foreground, background, minimum ratio, kind]. */
const TEXT = 4.5;
const NON_TEXT = 3;
const pair = (fg, bg, min = TEXT) => [
  `color.${fg}`,
  `color.${bg}`,
  min,
  min === TEXT ? "Text" : "Non-text",
];

export const PAIRS = [
  // Text on the surfaces it sits on
  ...[
    "neutral-primary",
    "neutral-primary-soft",
    "neutral-primary-medium",
    "neutral-secondary-medium",
    "neutral-tertiary",
    "neutral-tertiary-medium",
  ].map((surface) => pair("heading", surface)),
  // Body text; on neutral-tertiary-medium (a hover fill) the label switches to heading
  ...[
    "neutral-primary",
    "neutral-primary-soft",
    "neutral-primary-medium",
    "neutral-secondary-medium",
    "neutral-tertiary",
  ].map((surface) => pair("body", surface)),
  pair("body-subtle", "neutral-primary"),
  pair("body-subtle", "neutral-primary-soft"),
  pair("fg-brand", "neutral-primary"),
  pair("fg-brand", "neutral-primary-soft"),
  pair("fg-success", "neutral-primary"),
  pair("fg-danger", "neutral-primary"),
  // Labels on filled buttons, at rest and on hover
  ...["brand", "success", "danger", "warning", "dark"].flatMap((name) => [
    pair(`${name}-foreground`, name),
    pair(`${name}-foreground`, `${name}-strong`),
  ]),
  // Text on soft (tinted) surfaces: badges, alerts
  pair("fg-brand-strong", "brand-softer"),
  pair("fg-success-strong", "success-soft"),
  pair("fg-danger-strong", "danger-soft"),
  pair("fg-warning", "warning-soft"),
  // Code surface
  pair("code-foreground", "code-bg"),
  ...["tag", "attr", "string", "keyword", "fn", "comment"].map((name) =>
    pair(`syntax-${name}`, "code-bg"),
  ),
  // Focus indicators. The `input` border is a light gray-200 by design and is not checked.
  ...["neutral-primary", "neutral-primary-soft", "neutral-secondary-medium"].flatMap((surface) => [
    pair("ring", surface, NON_TEXT),
  ]),
  // Checked controls and active indicators on the page and on cards
  pair("brand", "neutral-primary", NON_TEXT),
  pair("brand", "neutral-primary-soft", NON_TEXT),
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
        const ratio = contrast(values.get(fg), values.get(bg));
        return [theme, { ratio: Math.round(ratio * 100) / 100, pass: ratio >= min }];
      }),
    );
    return {
      foreground: fg.replace(/^color\./, ""),
      background: bg.replace(/^color\./, ""),
      minimum: min,
      kind,
      results,
    };
  });
}
