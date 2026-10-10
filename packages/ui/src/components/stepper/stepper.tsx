import { ArrowRight, Check, ChevronsRight, CircleCheck } from "@stefan-florescu/icons";
import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

import {
  stepperCardTitleClassName,
  stepperCardVariants,
  stepperChevronClassName,
  stepperConnectorVariants,
  stepperDescriptionClassName,
  stepperItemVariants,
  stepperMarkerVariants,
  stepperSlashClassName,
  stepperTitleClassName,
  stepperVariants,
  type StepperStatus,
  type StepperVariant,
} from "./stepper.variants";

export type StepperProps = ComponentProps<"ol"> & {
  /** Flowbite's stepper style. `vertical` and `timeline` run top to bottom. */
  variant?: StepperVariant;
};

/**
 * Shows the steps of a process and how far along it is: an ordered list of `StepperItem`s, each
 * `complete`, `current` or `upcoming`. Name it with `aria-label`, such as "Registration progress".
 */
export function Stepper({ variant = "default", className, children, ...props }: StepperProps) {
  const steps = Children.toArray(children).filter(isValidElement);
  return (
    <ol
      data-slot="stepper"
      data-variant={variant}
      className={cn(stepperVariants({ variant }), className)}
      {...props}
    >
      {steps.map((child, index) => {
        const step = child as ReactElement<StepperItemProps>;
        return cloneElement(step, {
          variant: step.props.variant ?? variant,
          index: step.props.index ?? index,
          last: step.props.last ?? index === steps.length - 1,
        });
      })}
    </ol>
  );
}

const defaultStatusLabels: Record<StepperStatus, string> = {
  complete: ", completed",
  current: "",
  upcoming: ", not started",
};

export type StepperItemProps = ComponentProps<"li"> & {
  /** Where the step stands. The `current` step gets `aria-current="step"`. */
  status?: StepperStatus;
  /** Icon in the marker of `progress`, `detailed` and `timeline` steps (a check once complete). */
  icon?: ReactNode;
  /** Text under the name in `detailed` and `timeline` steppers. */
  description?: ReactNode;
  /**
   * Visually hidden text after the name that says where the step stands, for screen readers.
   * Defaults to ", completed" and ", not started"; the current step is announced through
   * `aria-current`. Pass translated text, or `""` to leave it out.
   */
  statusLabel?: string;
  /** Set by `Stepper`. */
  variant?: StepperVariant;
  /** Set by `Stepper`: the step's position, from 0. */
  index?: number;
  /** Set by `Stepper`: whether this is the final step, which has no connector. */
  last?: boolean;
};

/** One step. The children are its name. */
export function StepperItem({
  status = "upcoming",
  icon,
  description,
  statusLabel,
  variant = "default",
  index = 0,
  last = false,
  className,
  children,
  ...props
}: StepperItemProps) {
  const complete = status === "complete";
  const number = index + 1;
  const hidden = statusLabel ?? defaultStatusLabels[status];
  const statusText = hidden ? <span className="sr-only">{hidden}</span> : null;
  const marker = (content: ReactNode, decorative = true) => (
    <span
      aria-hidden={decorative || undefined}
      data-slot="stepper-marker"
      className={stepperMarkerVariants({ variant, status })}
    >
      {content}
    </span>
  );
  const iconMarker = marker(complete ? <Check /> : (icon ?? number));

  let content: ReactNode;
  switch (variant) {
    case "progress":
      content = (
        <>
          {iconMarker}
          <span className="sr-only">
            {children}
            {hidden}
          </span>
          {last ? null : (
            <span aria-hidden className={stepperConnectorVariants({ variant, status })} />
          )}
        </>
      );
      break;
    case "detailed":
      content = (
        <>
          {iconMarker}
          <span className="block">
            <span className={stepperTitleClassName}>
              {children}
              {statusText}
            </span>
            {description ? (
              <span className={stepperDescriptionClassName}>{description}</span>
            ) : null}
          </span>
        </>
      );
      break;
    case "vertical":
      content = (
        <div className={stepperCardVariants({ status })}>
          <span className={stepperCardTitleClassName}>
            {number}. {children}
            {statusText}
          </span>
          {complete ? (
            <Check aria-hidden className={stepperMarkerVariants({ variant })} />
          ) : (
            <ArrowRight
              aria-hidden
              className={cn(stepperMarkerVariants({ variant }), "rtl:rotate-180")}
            />
          )}
        </div>
      );
      break;
    case "breadcrumb":
      content = (
        <>
          {marker(number, false)}
          {children}
          {statusText}
          {last ? null : <ChevronsRight aria-hidden className={stepperChevronClassName} />}
        </>
      );
      break;
    case "timeline":
      content = (
        <>
          {iconMarker}
          <span className={stepperTitleClassName}>
            {children}
            {statusText}
          </span>
          {description ? <span className={stepperDescriptionClassName}>{description}</span> : null}
        </>
      );
      break;
    default:
      content = (
        <>
          <span className="flex items-center">
            {complete ? (
              <CircleCheck aria-hidden className={stepperMarkerVariants({ variant, status })} />
            ) : (
              marker(number, false)
            )}
            {children}
            {statusText}
            {last ? null : (
              <span aria-hidden className={stepperSlashClassName}>
                /
              </span>
            )}
          </span>
          {last ? null : (
            <span aria-hidden className={stepperConnectorVariants({ variant, status })} />
          )}
        </>
      );
  }

  return (
    <li
      aria-current={status === "current" ? "step" : undefined}
      data-slot="stepper-item"
      data-status={status}
      className={cn(stepperItemVariants({ variant, status, last }), className)}
      {...props}
    >
      {content}
    </li>
  );
}
