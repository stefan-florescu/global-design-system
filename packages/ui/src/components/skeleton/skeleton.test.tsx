import { render, screen } from "@testing-library/react";

import {
  Skeleton,
  SkeletonAvatar,
  SkeletonBlock,
  SkeletonImage,
  SkeletonLine,
  SkeletonVideo,
} from "./skeleton";

describe("Skeleton", () => {
  it("is a status region that says it is loading", () => {
    render(
      <Skeleton className="max-w-sm">
        <SkeletonLine />
      </Skeleton>,
    );
    const status = screen.getByRole("status", { name: "" });
    expect(status).toHaveTextContent("Loading…");
    expect(status).toHaveClass("animate-pulse", "motion-reduce:animate-none", "max-w-sm");
    expect(screen.getByText("Loading…")).toHaveClass("sr-only");
  });

  it("takes a custom label and can stop pulsing", () => {
    render(<Skeleton label="Loading articles" animated={false} />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Loading articles");
    expect(status).not.toHaveClass("animate-pulse");
  });

  it("hides every placeholder from assistive technology", () => {
    const { container } = render(
      <Skeleton>
        <SkeletonBlock className="h-72" />
        <SkeletonLine />
        <SkeletonImage />
        <SkeletonVideo />
        <SkeletonAvatar />
      </Skeleton>,
    );
    const placeholders = container.querySelectorAll("[data-slot^=skeleton-]");
    expect(placeholders).toHaveLength(5);
    placeholders.forEach((el) => expect(el).toHaveAttribute("aria-hidden", "true"));
    expect(screen.getByRole("status")).toHaveAccessibleName("");
  });

  it("draws Flowbite's text lines", () => {
    const { container } = render(
      <>
        <SkeletonLine className="w-48" />
        <SkeletonLine size="sm" subtle />
      </>,
    );
    const [heading, line] = container.querySelectorAll("[data-slot=skeleton-line]");
    expect(heading).toHaveClass("h-2.5", "rounded-full", "bg-neutral-quaternary", "w-48");
    expect(line).toHaveClass("h-2", "bg-default");
    expect(line).not.toHaveClass("bg-neutral-quaternary");
  });

  it("draws image and video blocks with an icon", () => {
    const { container } = render(
      <>
        <SkeletonImage className="sm:w-96" />
        <SkeletonVideo className="h-56" />
      </>,
    );
    const image = container.querySelector("[data-slot=skeleton-image]");
    expect(image).toHaveClass("h-48", "rounded-base", "bg-neutral-quaternary", "sm:w-96");
    expect(image?.querySelector("svg")).toHaveClass("size-11", "text-fg-disabled");
    const video = container.querySelector("[data-slot=skeleton-video]");
    expect(video).toHaveClass("h-56");
    expect(video).not.toHaveClass("h-48");
  });

  it("sizes the avatar icon", () => {
    const { container } = render(<SkeletonAvatar className="size-7" />);
    const avatar = container.querySelector("[data-slot=skeleton-avatar]");
    expect(avatar).toHaveClass("size-7", "text-fg-disabled");
    expect(avatar).not.toHaveClass("size-8");
  });
});
