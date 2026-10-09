"use client";

import { useId, useRef, type ClipboardEvent, type KeyboardEvent } from "react";

import { HelperText, Input } from "@stefan-florescu/ui";

const positions = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];

export default function NumberInputPin() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // Move to the next box after a digit, and back after clearing one.
  const onKeyUp = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab" || event.key === "Shift") return;
    const next = event.currentTarget.value ? index + 1 : index - 1;
    inputs.current[next]?.focus();
  };

  // Spread a pasted code over the boxes.
  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    digits.split("").forEach((digit, index) => {
      const input = inputs.current[index];
      if (input) input.value = digit;
    });
    inputs.current[Math.min(digits.length, 5)]?.focus();
  };

  return (
    <form className="mx-auto w-full max-w-sm">
      <div className="mb-2 flex gap-2">
        {positions.map((position, index) => (
          <Input
            key={position}
            ref={(element) => {
              inputs.current[index] = element;
            }}
            aria-label={`${position} code`}
            aria-describedby={`${id}-pin-help`}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            pattern="[0-9]"
            className="size-10 p-0 text-center"
            onKeyUp={onKeyUp(index)}
            onPaste={onPaste}
            required
          />
        ))}
      </div>
      <HelperText id={`${id}-pin-help`}>
        Please introduce the 6 digit code we sent via email.
      </HelperText>
    </form>
  );
}
