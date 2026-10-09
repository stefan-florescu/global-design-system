import { Megaphone } from "@stefan-florescu/icons";
import { Banner } from "@stefan-florescu/ui";

export default function BannerDemo() {
  return (
    <div className="border-default bg-neutral-primary rounded-base relative h-60 w-full transform-gpu overflow-hidden border">
      {/* The frame stands in for the browser window, so the fixed banner stays inside it. */}
      <Banner dismissible>
        <div className="mx-auto flex items-center">
          <p className="flex items-center">
            <span className="bg-neutral-tertiary me-2.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full">
              <Megaphone aria-hidden className="text-body size-3.5" />
            </span>
            <span>
              New brand identity has been launched for the{" "}
              <a
                href="/changelog"
                className="text-fg-brand inline font-medium underline hover:no-underline"
              >
                Stefan Design System
              </a>
            </span>
          </p>
        </div>
      </Banner>
    </div>
  );
}
