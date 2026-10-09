import { useId } from "react";

import { Button, Checkbox, Input, Label, PhoneInput } from "@stefan-florescu/ui";

export default function PhoneInputAuth() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto w-full max-w-sm">
      <Label htmlFor={`${id}-phone`}>Phone number</Label>
      <PhoneInput
        id={`${id}-phone`}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="123-456-7890"
        required
      />
      <div className="mt-4">
        <Label htmlFor={`${id}-password`}>Your password</Label>
        <Input
          id={`${id}-password`}
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
      </div>
      <Checkbox
        className="my-4"
        required
        label={
          <span className="text-body font-normal">
            I accept the{" "}
            <a href="#terms" className="text-fg-brand font-medium hover:underline">
              Terms and Conditions
            </a>
          </span>
        }
      />
      <Button type="submit" fullWidth>
        Sign Up
      </Button>
    </form>
  );
}
