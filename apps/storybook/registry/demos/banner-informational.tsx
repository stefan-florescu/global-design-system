import { Banner, Button } from "@stefan-florescu/ui";

export default function BannerInformational() {
  return (
    <div className="border-default bg-neutral-primary rounded-base relative h-60 w-full transform-gpu overflow-hidden border">
      {/* The frame stands in for the browser window, so the fixed banner stays inside it. */}
      <Banner
        dismissible
        aria-label="Integrations"
        className="bg-neutral-secondary-soft flex-col md:flex-row"
      >
        <div className="mb-2 md:me-2 md:mb-0">
          <p className="text-heading mb-1 text-base font-semibold">Integration is the key</p>
          <p className="flex items-center">
            You can integrate Stefan Design System with many tools to make your work even more
            efficient and lightning fast based on Tailwind.
          </p>
        </div>
        <div className="flex shrink-0 items-center">
          <Button size="xs">Sign Up</Button>
        </div>
      </Banner>
    </div>
  );
}
