import { Check } from "@stefan-florescu/icons";
import { Indicator } from "@stefan-florescu/ui";
import type { ReactNode } from "react";

const STEPS = ["Step 1", "Step 2", "Step 3", "Step 4"];

// From `sm` up, each marker sits on an 8px `buffer` ring that cuts the line around it.
const markerRing = "ring-buffer ring-0 sm:ring-8";

function Stepper({ marker }: { marker: (done: boolean) => ReactNode }) {
  return (
    <ol className="flex items-center">
      {STEPS.map((step, index) => {
        const done = index < STEPS.length - 1;
        return (
          <li key={step} className="relative mb-6 w-full">
            <div className="flex items-center">
              {marker(done)}
              {done ? <div className="bg-default flex h-0.5 w-full sm:ms-2" /> : null}
            </div>
            <p className="text-heading mt-3 font-medium">
              {step}
              <span className="sr-only">{done ? ", complete" : ", not started"}</span>
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export default function IndicatorStepper() {
  return (
    <div className="w-full space-y-8">
      <Stepper
        marker={(done) => (
          <Indicator
            variant={done ? "brand" : "gray"}
            className={done ? markerRing : `bg-neutral-tertiary ${markerRing}`}
          >
            <Check aria-hidden />
          </Indicator>
        )}
      />
      <Stepper
        marker={(done) => (
          <span
            className={`flex size-6 shrink-0 items-center justify-center rounded-full ${markerRing} ${done ? "bg-brand-subtle" : "bg-neutral-tertiary"}`}
          >
            <Indicator
              variant={done ? "brand" : "dark"}
              className={done ? undefined : "bg-heading"}
            />
          </span>
        )}
      />
    </div>
  );
}
