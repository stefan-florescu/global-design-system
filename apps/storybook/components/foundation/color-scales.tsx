import primitives from "@stefan-florescu/tokens/src/primitive/color.json";

import { H3 } from "@/components/heading";

import { SwatchButton } from "./swatch-button";

type Step = { $value: string };
type Scale = { $description?: string } & Record<string, Step | string | undefined>;

const color = (primitives as { color: Record<string, Scale | Step | string> }).color;

/** Every hue with a 50–950 scale, in source order. */
export const SCALES = Object.entries(color).filter(
  (entry): entry is [string, Scale] =>
    typeof entry[1] === "object" && entry[1] !== null && !("$value" in entry[1]),
);

const title = (hue: string) => hue.charAt(0).toUpperCase() + hue.slice(1);

/**
 * "oklch(62.3% 0.214 259.815)" → "#3080FF": the sRGB hex of an OKLCH token, clipped to the sRGB
 * gamut as browsers render it on standard screens. Hex values pass through unchanged.
 */
export function toHex(value: string) {
  const match = value.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/);
  if (!match) return value.toUpperCase();
  const l = Number(match[1]) / (match[2] ? 100 : 1);
  const c = Number(match[3]);
  const h = (Number(match[4]) * Math.PI) / 180;
  const [a, b] = [c * Math.cos(h), c * Math.sin(h)];
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const linear = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
  return (
    "#" +
    linear
      .map((v) => Math.min(1, Math.max(0, v)))
      .map((v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055))
      .map((v) =>
        Math.round(v * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
      .toUpperCase()
  );
}

/** The primitive colour scales, rendered from @stefan-florescu/tokens. Click a swatch to copy its hex. */
export function ColorScales() {
  return (
    <>
      {SCALES.map(([hue, scale]) => {
        const steps = Object.entries(scale).filter(
          (entry): entry is [string, Step] =>
            !entry[0].startsWith("$") && typeof entry[1] === "object",
        );
        return (
          <div className="scale" key={hue}>
            <H3 id={hue}>{title(hue)}</H3>
            {scale.$description ? <p className="scale__note">{scale.$description}</p> : null}
            <ol className="scale__steps">
              {steps.map(([step, token]) => {
                const hex = toHex(token.$value);
                return (
                  <li className="scale__step" key={step}>
                    <SwatchButton
                      hex={hex}
                      label={`${hue} ${step}`}
                      style={{ background: `var(--sds-color-${hue}-${step})` }}
                    />
                    <span className="scale__shade">{step}</span>
                    <span className="scale__hex" title={token.$value}>
                      {hex}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </>
  );
}
