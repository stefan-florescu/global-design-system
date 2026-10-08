import primitives from "@stefan-florescu/tokens/src/primitive/color.json";

import { H3 } from "@/components/heading";

import { SwatchButton } from "./swatch-button";

type Step = { $value: string };
type Scale = { $description?: string } & Record<string, Step | string | undefined>;

const color = (primitives as { color: Record<string, Scale | Step | string> }).color;

/** Every hue with a 50–900 scale, in source order. */
export const SCALES = Object.entries(color).filter(
  (entry): entry is [string, Scale] =>
    typeof entry[1] === "object" && entry[1] !== null && !("$value" in entry[1]),
);

const title = (hue: string) => hue.charAt(0).toUpperCase() + hue.slice(1);

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
              {steps.map(([step, token]) => (
                <li className="scale__step" key={step}>
                  <SwatchButton
                    hex={token.$value}
                    label={`${hue} ${step}`}
                    style={{ background: `var(--sds-color-${hue}-${step})` }}
                  />
                  <span className="scale__shade">{step}</span>
                  <span className="scale__hex">{token.$value}</span>
                </li>
              ))}
            </ol>
          </div>
        );
      })}
    </>
  );
}
