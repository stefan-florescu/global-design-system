import { ArrowRight } from "@stefan-florescu/icons";
import { Banner, Button } from "@stefan-florescu/ui";

export default function BannerInformational() {
  return (
    <div className="border-border bg-background relative h-60 w-full transform-gpu overflow-hidden rounded-lg border">
      {/* The frame stands in for the browser window, so the fixed banner stays inside it. */}
      <Banner position="bottom" dismissible aria-label="Feature preview">
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-base font-semibold">Try the new docs search</p>
          <p className="text-muted-foreground">
            Find any token, component or prop in seconds. Press Ctrl K to open it.
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Learn more
          </Button>
          <Button size="sm">
            Try it
            <ArrowRight aria-hidden />
          </Button>
        </div>
      </Banner>
    </div>
  );
}
