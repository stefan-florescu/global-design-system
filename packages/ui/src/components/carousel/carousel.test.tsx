import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Carousel } from "./carousel";

function Slides(props: Partial<Parameters<typeof Carousel>[0]>) {
  return (
    <Carousel aria-label="Featured trips" {...props}>
      <p>Mountains</p>
      <p>Coast</p>
      <p>Forest</p>
    </Carousel>
  );
}

// Hidden slides have no accessible name, so look them up by their label attribute.
const slide = (label: string) => {
  const element = document.querySelector(`[aria-roledescription="slide"][aria-label="${label}"]`);
  if (!element) throw new Error(`No slide labelled ${label}`);
  return element;
};

describe("Carousel", () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  it("is a labelled carousel of slides", () => {
    render(<Slides />);
    const carousel = screen.getByRole("region", { name: "Featured trips" });
    expect(carousel).toHaveAttribute("aria-roledescription", "carousel");
    expect(screen.getByRole("group", { name: "1 of 3" })).toHaveTextContent("Mountains");
    expect(slide("1 of 3")).toHaveAttribute("aria-roledescription", "slide");
    expect(slide("1 of 3")).not.toHaveAttribute("aria-hidden", "true");
    expect(slide("2 of 3")).toHaveAttribute("aria-hidden", "true");
  });

  it("moves with the previous and next buttons, wrapping around", async () => {
    const user = userEvent.setup();
    const onSlideChange = vi.fn();
    render(<Slides onSlideChange={onSlideChange} />);
    await user.click(screen.getByRole("button", { name: "Next slide" }));
    expect(slide("2 of 3")).not.toHaveAttribute("aria-hidden", "true");
    await user.click(screen.getByRole("button", { name: "Previous slide" }));
    await user.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(slide("3 of 3")).not.toHaveAttribute("aria-hidden", "true");
    expect(onSlideChange).toHaveBeenLastCalledWith(2);
  });

  it("jumps with the indicators and marks the current one", async () => {
    const user = userEvent.setup();
    render(<Slides />);
    await user.click(screen.getByRole("button", { name: "Go to slide 3" }));
    expect(screen.getByRole("button", { name: "Go to slide 3" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(screen.getByRole("button", { name: "Go to slide 1" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("announces slide changes politely when not rotating", () => {
    render(<Slides />);
    expect(slide("1 of 3").parentElement).toHaveAttribute("aria-live", "polite");
  });

  it("rotates automatically, pauses on hover and can be stopped", () => {
    vi.useFakeTimers();
    render(<Slides autoPlay interval={1000} />);
    const carousel = screen.getByRole("region");
    expect(slide("1 of 3").parentElement).toHaveAttribute("aria-live", "off");

    act(() => vi.advanceTimersByTime(1000));
    expect(slide("2 of 3")).not.toHaveAttribute("aria-hidden", "true");

    fireEvent.pointerEnter(carousel);
    act(() => vi.advanceTimersByTime(3000));
    expect(slide("2 of 3")).not.toHaveAttribute("aria-hidden", "true");
    fireEvent.pointerLeave(carousel);

    fireEvent.click(screen.getByRole("button", { name: "Stop automatic slide show" }));
    act(() => vi.advanceTimersByTime(3000));
    expect(slide("2 of 3")).not.toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("button", { name: "Start automatic slide show" })).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("never rotates for people who prefer reduced motion", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    vi.useFakeTimers();
    render(<Slides autoPlay interval={1000} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(slide("1 of 3")).not.toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("button", { name: /automatic slide show/ })).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("hides controls and indicators on request", () => {
    render(<Slides controls={false} indicators={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("uses Flowbite's slide window and transition speeds", () => {
    const { rerender } = render(<Slides />);
    const track = slide("1 of 3").parentElement;
    expect(track?.parentElement).toHaveClass("h-56", "md:h-96", "rounded-base", "overflow-hidden");
    expect(track).toHaveClass("duration-700", "ease-in-out", "motion-reduce:transition-none");
    rerender(<Slides transition="fast" />);
    expect(slide("1 of 3").parentElement).toHaveClass("duration-200", "ease-linear");
  });
});
