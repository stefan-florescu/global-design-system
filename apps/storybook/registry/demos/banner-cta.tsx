import { Banner, Button } from "@stefan-florescu/ui";

export default function BannerCta() {
  return (
    <div className="border-default bg-neutral-primary rounded-base relative h-60 w-full transform-gpu overflow-hidden border">
      {/* The frame stands in for the browser window, so the fixed banner stays inside it. */}
      <Banner floating dismissible aria-label="Sign up">
        <div className="me-2 flex flex-col items-start md:flex-row md:items-center">
          <a
            href="/components"
            className="border-default mb-2 flex items-center md:me-4 md:mb-0 md:border-e md:pe-4"
          >
            <span className="text-heading self-center text-lg font-semibold whitespace-nowrap">
              Stefan Design System
            </span>
          </a>
          <p className="flex items-center">
            Build websites even faster with components on top of Tailwind
          </p>
        </div>
        <div className="ms-auto flex shrink-0 items-center">
          <Button size="xs">Sign Up</Button>
        </div>
      </Banner>
    </div>
  );
}
