import { render, screen, within } from "@testing-library/react";

import {
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
} from "./timeline";

function Example({ horizontal = false }: { horizontal?: boolean }) {
  return (
    <Timeline horizontal={horizontal} aria-label="Releases">
      <TimelineItem>
        <TimelinePoint />
        <TimelineContent>
          <TimelineTime dateTime="2022-02">February 2022</TimelineTime>
          <TimelineTitle>Application UI</TimelineTitle>
          <TimelineBody>Over 20 pages.</TimelineBody>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelinePoint icon={<svg data-testid="icon" />} />
        <TimelineContent>
          <TimelineTime dateTime="2022-03">March 2022</TimelineTime>
          <TimelineTitle>Marketing UI</TimelineTitle>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

describe("Timeline", () => {
  it("is an ordered list of events", () => {
    render(<Example />);
    const list = screen.getByRole("list", { name: "Releases" });
    expect(list.tagName).toBe("OL");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(list).toHaveClass("border-s", "border-default");
    expect(list).not.toHaveAttribute("data-horizontal");
  });

  it("marks a horizontal timeline so its parts can lay out in a row", () => {
    render(<Example horizontal />);
    const list = screen.getByRole("list");
    expect(list).toHaveAttribute("data-horizontal");
    expect(list).toHaveClass("sm:flex");
  });

  it("renders the date as a <time> with a machine-readable value", () => {
    render(<Example />);
    const time = screen.getByText("February 2022");
    expect(time.tagName).toBe("TIME");
    expect(time).toHaveAttribute("dateTime", "2022-02");
  });

  it("uses h3 titles by default and lets the level be set", () => {
    const { rerender } = render(<TimelineTitle>Release</TimelineTitle>);
    expect(screen.getByRole("heading", { level: 3, name: "Release" })).toBeInTheDocument();
    rerender(<TimelineTitle headingLevel={4}>Release</TimelineTitle>);
    expect(screen.getByRole("heading", { level: 4, name: "Release" })).toBeInTheDocument();
  });

  it("draws a dot, an icon or custom content as the point", () => {
    const { container } = render(
      <Timeline>
        <TimelineItem>
          <TimelinePoint />
        </TimelineItem>
        <TimelineItem>
          <TimelinePoint icon={<svg data-testid="icon" />} />
        </TimelineItem>
        <TimelineItem>
          <TimelinePoint>
            <img src="/a.png" alt="Bonnie Green" />
          </TimelinePoint>
        </TimelineItem>
      </Timeline>,
    );
    const points = container.querySelectorAll("[data-slot=timeline-point]");
    expect([...points].map((p) => p.getAttribute("data-marker"))).toEqual([
      "dot",
      "icon",
      "custom",
    ]);
    const markers = container.querySelectorAll("[data-slot=timeline-marker]");
    expect(markers[0]).toHaveClass("size-3", "bg-neutral-quaternary");
    expect(markers[1]).toHaveClass("size-6", "bg-brand-softer");
    expect(markers[1]).toHaveAttribute("aria-hidden", "true");
    // Custom content stays available to assistive technology.
    expect(markers[2]).not.toHaveAttribute("aria-hidden");
    expect(screen.getByRole("img", { name: "Bonnie Green" })).toBeInTheDocument();
  });

  it("hides the decorative connector line", () => {
    const { container } = render(<Example horizontal />);
    for (const line of container.querySelectorAll("[data-slot=timeline-connector]")) {
      expect(line).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("merges className and forwards attributes", () => {
    render(
      <Timeline className="mt-8" data-testid="tl">
        <TimelineItem className="mb-6" data-testid="item">
          <TimelineBody className="text-sm">Text</TimelineBody>
        </TimelineItem>
      </Timeline>,
    );
    expect(screen.getByTestId("tl")).toHaveClass("mt-8");
    expect(screen.getByTestId("item")).toHaveClass("mb-6");
    expect(screen.getByTestId("item")).not.toHaveClass("mb-10");
    expect(screen.getByText("Text")).toHaveClass("text-sm", "text-body");
    expect(screen.getByText("Text")).not.toHaveClass("text-base");
  });
});
