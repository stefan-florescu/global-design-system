import { Banner } from "@stefan-florescu/ui";

export default function BannerBottom() {
  return (
    <div className="border-border bg-background relative h-60 w-full transform-gpu overflow-hidden rounded-lg border">
      {/* The frame stands in for the browser window, so the fixed banner stays inside it. */}
      <Banner position="bottom" dismissible>
        <p>
          Design tokens are now published as DTCG JSON.{" "}
          <a
            href="/foundation/color"
            className="text-brand-subtle-foreground font-medium underline underline-offset-2 hover:no-underline"
          >
            Learn more
          </a>
        </p>
      </Banner>
    </div>
  );
}
