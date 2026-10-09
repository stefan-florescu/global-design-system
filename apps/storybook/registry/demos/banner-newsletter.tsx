import { useId } from "react";

import { Banner, Button, Input, Label } from "@stefan-florescu/ui";

export default function BannerNewsletter() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="border-default bg-neutral-primary rounded-base relative h-60 w-full transform-gpu overflow-hidden border">
      {/* The frame stands in for the browser window, so the fixed banner stays inside it. */}
      <Banner dismissible aria-label="Newsletter">
        <div className="mx-auto flex w-full shrink-0 items-center sm:w-auto">
          <form className="flex w-full flex-col items-center gap-4 md:flex-row">
            <Label htmlFor={`${id}-email`} className="me-auto mb-0 shrink-0 md:me-0">
              Sign up now
            </Label>
            <Input
              id={`${id}-email`}
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full md:w-64"
              required
            />
            <Button type="submit" className="w-full md:w-auto">
              Subscribe
            </Button>
          </form>
        </div>
      </Banner>
    </div>
  );
}
