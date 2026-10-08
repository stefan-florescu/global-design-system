import { useId } from "react";

import { Button, Checkbox, Input, Label } from "@stefan-florescu/ui";

export default function InputFieldDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-first-name`}>First name</Label>
        <Input id={`${id}-first-name`} placeholder="Ana" autoComplete="given-name" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-last-name`}>Last name</Label>
        <Input id={`${id}-last-name`} placeholder="Popescu" autoComplete="family-name" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-company`}>Company</Label>
        <Input id={`${id}-company`} placeholder="Design Co." autoComplete="organization" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-website`}>Website</Label>
        <Input
          id={`${id}-website`}
          type="url"
          placeholder="https://example.com"
          autoComplete="url"
        />
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor={`${id}-email`}>Email address</Label>
        <Input
          id={`${id}-email`}
          type="email"
          placeholder="ana@example.com"
          autoComplete="email"
          required
        />
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor={`${id}-password`}>Password</Label>
        <Input id={`${id}-password`} type="password" autoComplete="new-password" required />
      </div>
      <Checkbox className="sm:col-span-2" label="I agree with the terms and conditions" required />
      <Button type="submit" className="sm:col-span-2 sm:justify-self-start">
        Create account
      </Button>
    </form>
  );
}
