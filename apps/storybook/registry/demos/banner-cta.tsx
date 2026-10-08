import { Banner, Button } from "@stefan-florescu/ui";

export default function BannerCta() {
  return (
    <div className="border-border bg-background relative h-60 w-full transform-gpu overflow-hidden rounded-lg border">
      {/* The frame stands in for the browser window, so the fixed banner stays inside it. */}
      <Banner floating dismissible aria-label="Sign up">
        <div className="min-w-0 flex-1">
          <p className="font-semibold">Stefan Design System</p>
          <p className="text-muted-foreground">Build accessible, token-driven interfaces faster.</p>
        </div>
        <Button size="sm">Get started</Button>
      </Banner>
    </div>
  );
}
