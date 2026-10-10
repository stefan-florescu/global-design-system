"use client";

import { ClipboardCheck, IdCard } from "@stefan-florescu/icons";
import { useId, useRef, useState, type FormEvent } from "react";

import { Button, Checkbox, Input, Label, Stepper, StepperItem } from "@stefan-florescu/ui";

const STEPS = ["Personal info", "Sign in details", "Payment info"];

export default function StepperForm() {
  const id = useId();
  // The first step is done; the form fills in the second.
  const [current, setCurrent] = useState(1);
  const heading = useRef<HTMLHeadingElement>(null);

  const go = (step: number) => {
    setCurrent(step);
    // Move focus to the new step's heading, so keyboard and screen reader users follow along.
    requestAnimationFrame(() => heading.current?.focus());
  };

  const next = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    go(2);
  };

  return (
    <div className="w-full">
      <Stepper variant="progress" aria-label="Registration progress" className="mb-8">
        {STEPS.map((step, index) => (
          <StepperItem
            key={step}
            status={index < current ? "complete" : index === current ? "current" : "upcoming"}
            icon={index === 1 ? <IdCard /> : <ClipboardCheck />}
          >
            {step}
          </StepperItem>
        ))}
      </Stepper>

      {current === 1 ? (
        <form className="max-w-sm" onSubmit={next}>
          <h3
            ref={heading}
            tabIndex={-1}
            className="text-heading mb-6 text-lg leading-none font-medium outline-none"
          >
            Sign In details
          </h3>
          <div className="mb-5">
            <Label htmlFor={`${id}-email`}>Your email</Label>
            <Input
              id={`${id}-email`}
              type="email"
              autoComplete="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <Label htmlFor={`${id}-password`}>Your password</Label>
            <Input
              id={`${id}-password`}
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              required
            />
          </div>
          <Checkbox
            className="mb-5"
            required
            label={
              <>
                I agree with the{" "}
                <a href="#terms" className="text-fg-brand hover:underline">
                  terms and conditions
                </a>
                .
              </>
            }
          />
          <Button type="submit">Next Step: Payment Info</Button>
        </form>
      ) : (
        <div className="max-w-sm">
          <h3
            ref={heading}
            tabIndex={-1}
            className="text-heading mb-6 text-lg leading-none font-medium outline-none"
          >
            Payment info
          </h3>
          <p className="text-body mb-5">Your sign in details are saved.</p>
          <Button variant="tertiary" onClick={() => go(1)}>
            Back to Sign In details
          </Button>
        </div>
      )}
    </div>
  );
}
