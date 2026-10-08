import { useId } from "react";

import { Banner, Button, Input, Label } from "@stefan-florescu/ui";

export default function BannerNewsletter() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="border-border bg-background relative h-60 w-full transform-gpu overflow-hidden rounded-lg border">
      {/* The frame stands in for the browser window, so the fixed banner stays inside it. */}
      <Banner dismissible aria-label="Newsletter">
        <form className="flex w-full flex-col gap-3 md:flex-row md:items-center">
          <p className="m-0 flex-1 text-sm">
            Get design-system updates in your inbox, once a month.
          </p>
          <Label htmlFor={`${id}-newsletter-email`} className="sr-only">
            Email address
          </Label>
          <Input
            id={`${id}-newsletter-email`}
            type="email"
            autoComplete="email"
            placeholder="ana@example.com"
            size="sm"
            className="md:w-64"
            required
          />
          <Button type="submit" size="sm">
            Subscribe
          </Button>
        </form>
      </Banner>
    </div>
  );
}
