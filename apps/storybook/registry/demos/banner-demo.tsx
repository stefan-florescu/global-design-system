import { Megaphone } from "@stefan-florescu/icons";
import { Banner } from "@stefan-florescu/ui";

export default function BannerDemo() {
  return (
    <div className="border-border bg-background relative h-60 w-full transform-gpu overflow-hidden rounded-lg border">
      {/* The frame stands in for the browser window, so the fixed banner stays inside it. */}
      <Banner dismissible>
        <p className="flex items-center gap-3">
          <span className="bg-brand-subtle text-brand-subtle-foreground inline-flex size-7 shrink-0 items-center justify-center rounded-full [&_svg]:size-4">
            <Megaphone aria-hidden />
          </span>
          <span>
            New: the Button and Accordion components are available.{" "}
            <a
              href="/changelog"
              className="text-brand-subtle-foreground font-medium underline underline-offset-2 hover:no-underline"
            >
              See what&apos;s new
            </a>
          </span>
        </p>
      </Banner>
    </div>
  );
}
