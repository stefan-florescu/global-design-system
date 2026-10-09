import { useId } from "react";

import { Button, Checkbox, Input, Label } from "@stefan-florescu/ui";

export default function InputFieldDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="w-full">
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor={`${id}-first-name`}>First name</Label>
          <Input id={`${id}-first-name`} placeholder="John" autoComplete="given-name" required />
        </div>
        <div>
          <Label htmlFor={`${id}-last-name`}>Last name</Label>
          <Input id={`${id}-last-name`} placeholder="Doe" autoComplete="family-name" required />
        </div>
        <div>
          <Label htmlFor={`${id}-company`}>Company</Label>
          <Input id={`${id}-company`} placeholder="Flowbite" autoComplete="organization" required />
        </div>
        <div>
          <Label htmlFor={`${id}-phone`}>Phone number</Label>
          <Input
            id={`${id}-phone`}
            type="tel"
            placeholder="123-45-678"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            autoComplete="tel"
            required
          />
        </div>
        <div>
          <Label htmlFor={`${id}-website`}>Website URL</Label>
          <Input id={`${id}-website`} type="url" placeholder="flowbite.com" required />
        </div>
        <div>
          <Label htmlFor={`${id}-visitors`}>Unique visitors (per month)</Label>
          <Input id={`${id}-visitors`} type="number" required />
        </div>
      </div>
      <div className="mb-6">
        <Label htmlFor={`${id}-email`}>Email address</Label>
        <Input
          id={`${id}-email`}
          type="email"
          placeholder="john.doe@company.com"
          autoComplete="email"
          required
        />
      </div>
      <div className="mb-6">
        <Label htmlFor={`${id}-password`}>Password</Label>
        <Input
          id={`${id}-password`}
          type="password"
          placeholder="•••••••••"
          autoComplete="new-password"
          required
        />
      </div>
      <div className="mb-6">
        <Label htmlFor={`${id}-confirm-password`}>Confirm password</Label>
        <Input
          id={`${id}-confirm-password`}
          type="password"
          placeholder="•••••••••"
          autoComplete="new-password"
          required
        />
      </div>
      <Checkbox
        className="mb-6"
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
      <Button type="submit">Submit</Button>
    </form>
  );
}
