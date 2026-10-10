import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

import {
  progressBarVariants,
  progressLabelClassName,
  progressTrackVariants,
  type ProgressVariantProps,
} from "./progress.variants";

type LabelPosition = "inside" | "outside";

/** A progress bar needs an accessible name: `textLabel`, `aria-label` or `aria-labelledby`. */
type ProgressName =
  | { textLabel: string; "aria-label"?: string; "aria-labelledby"?: string }
  | { textLabel?: string; "aria-label": string; "aria-labelledby"?: string }
  | { textLabel?: string; "aria-label"?: string; "aria-labelledby": string };

export type ProgressProps = Omit<
  ComponentProps<"div">,
  "children" | "aria-label" | "aria-labelledby"
> &
  ProgressVariantProps &
  ProgressName & {
    /** The current value, from 0 to `max`. Values outside the range are clamped. */
    value: number;
    /** The value that means "complete". */
    max?: number;
    /** Show `textLabel` on screen as well as using it as the accessible name. */
    labelText?: boolean;
    /** Where the visible `textLabel` goes. */
    textLabelPosition?: LabelPosition;
    /** Show the value (`valueText`, or the percentage) on screen. */
    labelProgress?: boolean;
    /** Where the visible value goes. */
    progressLabelPosition?: LabelPosition;
    /**
     * The value as text, such as "376.3 of 500 GB". Shown by `labelProgress` and announced as
     * `aria-valuetext`. Defaults to the rounded percentage, such as "45%".
     */
    valueText?: string;
  };

/** Shows how far a task or a quantity has got, as a filled bar (`role="progressbar"`). */
export function Progress({
  value,
  max = 100,
  size,
  variant,
  textLabel,
  labelText = false,
  textLabelPosition = "inside",
  labelProgress = false,
  progressLabelPosition = "inside",
  valueText,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  className,
  ...props
}: ProgressProps) {
  const safeMax = max > 0 ? max : 100;
  const now = Math.min(Math.max(value, 0), safeMax);
  const percent = (now / safeMax) * 100;
  const valueLabel = valueText ?? `${Math.round(percent)}%`;

  const showText = Boolean(textLabel) && labelText;
  const textInside = showText && textLabelPosition === "inside";
  const textOutside = showText && textLabelPosition === "outside";
  const progressInside = labelProgress && progressLabelPosition === "inside";
  const progressOutside = labelProgress && progressLabelPosition === "outside";
  const labelledInside = textInside || progressInside;

  return (
    <div data-slot="progress" className={cn("w-full", className)} {...props}>
      {textOutside || progressOutside ? (
        // The visible labels repeat the accessible name and value, so they are hidden from
        // assistive technology to avoid reading them twice.
        <div aria-hidden data-slot="progress-label" className={progressLabelClassName}>
          {textOutside ? <span>{textLabel}</span> : null}
          {progressOutside ? <span className="ms-auto">{valueLabel}</span> : null}
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-label={ariaLabelledBy ? undefined : (ariaLabel ?? textLabel)}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={now}
        aria-valuetext={valueLabel}
        data-slot="progress-track"
        // A label inside the bar needs Flowbite's 16px "With label inside" height.
        className={progressTrackVariants({ size: labelledInside ? "xl" : size })}
      >
        <div
          data-slot="progress-bar"
          className={progressBarVariants({ variant, labelled: labelledInside })}
          style={{ width: `${percent}%` }}
        >
          {textInside ? <span>{textLabel}</span> : null}
          {progressInside ? <span>{valueLabel}</span> : null}
        </div>
      </div>
    </div>
  );
}
