import { ArrowRight, BadgePercent } from "@stefan-florescu/icons";
import { Banner } from "@stefan-florescu/ui";

export default function BannerBottom() {
  return (
    <div className="border-default bg-neutral-primary rounded-base relative h-60 w-full transform-gpu overflow-hidden border">
      {/* The frame stands in for the browser window, so the fixed banner stays inside it. */}
      <Banner position="bottom" dismissible>
        <div className="mx-auto flex items-center">
          <p className="flex items-center">
            <span className="bg-neutral-tertiary me-2.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full">
              <BadgePercent aria-hidden className="text-body size-3.5" />
            </span>
            <span>
              Get 5% commission per sale{" "}
              <a
                href="/components"
                className="text-fg-brand ms-0 flex items-center font-medium hover:underline md:ms-1 md:inline-flex"
              >
                Become a partner
                <ArrowRight aria-hidden className="ms-1 size-4" />
              </a>
            </span>
          </p>
        </div>
      </Banner>
    </div>
  );
}
