import { useId } from "react";

import { Button, Card, CardTitle, Checkbox, Input, Label } from "@stefan-florescu/ui";

export default function CardForm() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <Card className="w-full max-w-sm">
      <form action="#">
        <CardTitle className="mb-6 text-xl">Sign in to our platform</CardTitle>
        <div className="mb-4">
          <Label htmlFor={`${id}-email`}>Your email</Label>
          <Input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            placeholder="example@company.com"
            required
          />
        </div>
        <div>
          <Label htmlFor={`${id}-password`}>Your password</Label>
          <Input
            id={`${id}-password`}
            type="password"
            autoComplete="current-password"
            placeholder="•••••••••"
            required
          />
        </div>
        <div className="my-6 flex items-start">
          <Checkbox label="Remember me" />
          <a
            href="/forms/input-field"
            className="text-fg-brand ms-auto text-sm font-medium hover:underline"
          >
            Lost Password?
          </a>
        </div>
        <Button type="submit" fullWidth className="mb-3">
          Login to your account
        </Button>
        <div className="text-body text-sm font-medium">
          Not registered?{" "}
          <a href="/forms/input-field" className="text-fg-brand hover:underline">
            Create account
          </a>
        </div>
      </form>
    </Card>
  );
}
