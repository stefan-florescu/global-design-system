import { render, screen } from "@testing-library/react";

import { Rating } from "./rating";

describe("Rating", () => {
  it("is an image named after the score", () => {
    render(<Rating value={4} />);
    expect(screen.getByRole("img", { name: "Rated 4 out of 5" })).toBeInTheDocument();
  });

  it("hides the stars from assistive technology", () => {
    render(<Rating value={4} />);
    const stars = screen.getByRole("img").querySelectorAll("svg");
    expect(stars).toHaveLength(5);
    for (const star of stars) expect(star).toHaveAttribute("aria-hidden", "true");
  });

  it("fills a star for each whole point", () => {
    render(<Rating value={4.95} />);
    const stars = [...screen.getByRole("img").querySelectorAll("svg")];
    expect(stars.filter((star) => star.hasAttribute("data-filled"))).toHaveLength(4);
    expect(stars[0]).toHaveClass("text-fg-yellow");
    expect(stars[4]).toHaveClass("text-fg-disabled");
    expect(screen.getByRole("img")).toHaveAccessibleName("Rated 4.95 out of 5");
  });

  it("clamps the value and supports another scale and label", () => {
    render(<Rating value={12} max={10} label="Ten stars" />);
    const stars = [...screen.getByRole("img", { name: "Ten stars" }).querySelectorAll("svg")];
    expect(stars).toHaveLength(10);
    expect(stars.every((star) => star.hasAttribute("data-filled"))).toBe(true);
  });

  it("applies the size", () => {
    render(<Rating value={3} size="lg" />);
    expect(screen.getByRole("img")).toHaveClass("[&_svg]:size-7");
  });
});
