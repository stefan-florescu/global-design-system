import { render, screen } from "@testing-library/react";

import { Card, CardDescription, CardTitle } from "./card";

describe("Card", () => {
  it("renders a title and description on the card surface", () => {
    render(
      <Card data-testid="card">
        <CardTitle>Release notes</CardTitle>
        <CardDescription>What changed this week.</CardDescription>
      </Card>,
    );
    expect(screen.getByRole("heading", { level: 3, name: "Release notes" })).toBeInTheDocument();
    expect(screen.getByText("What changed this week.")).toHaveClass("text-body");
    expect(screen.getByTestId("card")).toHaveClass(
      "bg-neutral-primary-soft",
      "border-default",
      "rounded-base",
      "shadow-xs",
    );
  });

  it("becomes a single link with href", () => {
    render(
      <Card href="/changelog">
        <CardTitle>Changelog</CardTitle>
      </Card>,
    );
    const link = screen.getByRole("link", { name: "Changelog" });
    expect(link).toHaveAttribute("href", "/changelog");
    expect(link).toHaveClass("hover:bg-neutral-secondary-medium");
  });

  it("shows an image with alt text, decorative by default", () => {
    const { rerender } = render(<Card imgSrc="/a.svg" imgAlt="Mountains at dawn" />);
    expect(screen.getByRole("img", { name: "Mountains at dawn" })).toHaveAttribute("src", "/a.svg");
    rerender(<Card imgSrc="/a.svg" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("lays out horizontally from md", () => {
    render(<Card horizontal data-testid="card" imgSrc="/a.svg" />);
    expect(screen.getByTestId("card")).toHaveClass("md:flex-row");
  });

  it("uses the heading level it is given", () => {
    render(<CardTitle headingLevel={2}>Plans</CardTitle>);
    expect(screen.getByRole("heading", { level: 2, name: "Plans" })).toBeInTheDocument();
  });
});
