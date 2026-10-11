"use client";

import { useId, useState } from "react";

import { Check, X } from "@stefan-florescu/icons";
import { Button, Checkbox, Input, Label, Popover, PopoverTitle } from "@stefan-florescu/ui";

const RULES = [
  {
    label: "Upper & lower case letters",
    test: (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value),
  },
  { label: "A symbol (#$&)", test: (value: string) => /[^A-Za-z0-9\s]/.test(value) },
  { label: "A longer password (min. 12 chars.)", test: (value: string) => value.length >= 12 },
];

export default function PopoverPassword() {
  const id = useId();
  const [password, setPassword] = useState("");
  const met = RULES.map((rule) => rule.test(password));
  // One bar for the minimum length, one for each rule met.
  const score = (password.length >= 6 ? 1 : 0) + met.filter(Boolean).length;

  return (
    <form className="w-full" onSubmit={(event) => event.preventDefault()}>
      <div className="mb-6">
        <Label htmlFor={`${id}-email`}>Your email</Label>
        <Input type="email" id={`${id}-email`} placeholder="name@example.com" required />
      </div>
      <div className="mb-6">
        <Label htmlFor={`${id}-password`}>Your password</Label>
        <Popover
          trigger="hover"
          placement="bottom"
          className="w-72 p-3"
          content={
            <div>
              <PopoverTitle className="mb-3 font-semibold">
                Must have at least 6 characters
              </PopoverTitle>
              <div className="mb-3 grid grid-cols-4 gap-2" aria-hidden>
                {[0, 1, 2, 3].map((bar) => (
                  <div
                    key={bar}
                    className={`h-1 rounded-full ${bar < score ? (score === 4 ? "bg-success" : "bg-warning") : "bg-neutral-quaternary"}`}
                  />
                ))}
              </div>
              <p className="sr-only">Strength: {score} of 4.</p>
              <p className="mb-2">It’s better to have:</p>
              <ul>
                {RULES.map((rule, index) => (
                  <li key={rule.label} className="mb-1 flex items-center last:mb-0">
                    {met[index] ? (
                      <Check aria-hidden className="text-fg-success me-1.5 size-4 shrink-0" />
                    ) : (
                      <X aria-hidden className="me-1.5 size-4 shrink-0" />
                    )}
                    {rule.label}
                    <span className="sr-only">{met[index] ? " (done)" : " (missing)"}</span>
                  </li>
                ))}
              </ul>
            </div>
          }
        >
          <Input
            type="password"
            id={`${id}-password`}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Popover>
      </div>
      <Checkbox
        required
        className="mb-6"
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
      <Button type="submit">Submit</Button>
    </form>
  );
}
