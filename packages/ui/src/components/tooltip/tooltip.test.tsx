import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "../button";

import { Tooltip, type TooltipProps } from ".";

function Example(props: Partial<TooltipProps>) {
  return (
    <>
      <button type="button">Before</button>
      <Tooltip content="Tooltip content" {...props}>
        <Button>Default tooltip</Button>
      </Tooltip>
      <button type="button">After</button>
    </>
  );
}

const trigger = () => screen.getByRole("button", { name: "Default tooltip" });
const tooltip = () => document.getElementById(trigger().getAttribute("aria-describedby")!)!;

describe("Tooltip", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("describes its trigger with a hidden role=tooltip", () => {
    render(<Example />);
    expect(trigger()).toHaveAccessibleDescription("Tooltip content");
    expect(tooltip()).toHaveAttribute("role", "tooltip");
    expect(tooltip()).not.toBeVisible();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("keeps the trigger's own description", () => {
    render(
      <>
        <p id="hint">Saves a draft.</p>
        <Tooltip content="Ctrl + S">
          <Button aria-describedby="hint">Save</Button>
        </Tooltip>
      </>,
    );
    expect(screen.getByRole("button", { name: "Save" })).toHaveAccessibleDescription(
      "Saves a draft. Ctrl + S",
    );
  });

  it("shows on hover, stays open over the tooltip and hides after leaving", () => {
    render(<Example />);
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    expect(screen.getByRole("tooltip")).toHaveTextContent("Tooltip content");
    expect(screen.getByRole("tooltip")).toHaveAttribute("data-state", "open");

    // Crossing the gap from the trigger to the tooltip keeps it open (hoverable).
    fireEvent.pointerLeave(trigger(), { pointerType: "mouse" });
    fireEvent.pointerEnter(tooltip(), { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    fireEvent.pointerLeave(tooltip(), { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(500));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("waits for the delay before showing on hover", () => {
    render(<Example delay={300} />);
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(300));
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("ignores touch hovers", () => {
    render(<Example />);
    fireEvent.pointerEnter(trigger(), { pointerType: "touch" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows on keyboard focus and hides when focus leaves", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Example />);
    await user.tab();
    await user.tab();
    expect(trigger()).toHaveFocus();
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    await user.tab();
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("stays open while focused, even after the pointer leaves (persistent)", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Example />);
    await user.tab();
    await user.tab();
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    fireEvent.pointerLeave(trigger(), { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("hides with Escape without moving focus, and doesn't let Escape go further", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onKeyDown = vi.fn((event: KeyboardEvent) => event.defaultPrevented);
    document.addEventListener("keydown", onKeyDown);
    render(<Example />);
    await user.tab();
    await user.tab();
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(trigger()).toHaveFocus();
    expect(onKeyDown).toHaveLastReturnedWith(true);

    // Once hidden, Escape is left alone.
    await user.keyboard("{Escape}");
    expect(onKeyDown).toHaveLastReturnedWith(false);
    document.removeEventListener("keydown", onKeyDown);
  });

  it("hides with Escape while only hovered", () => {
    render(<Example />);
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    fireEvent.keyDown(document.body, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("doesn't show on focus that follows a click", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime, skipHover: true });
    render(<Example />);
    fireEvent.pointerDown(trigger(), { pointerType: "mouse" });
    act(() => trigger().focus());
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "After" }));
  });

  it("toggles on click with trigger=click and hides on a press outside or blur", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Example trigger="click" />);
    await user.hover(trigger());
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await user.click(trigger());
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    await user.click(trigger());
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await user.click(trigger());
    await user.pointer({ keys: "[MouseLeft]", target: document.body });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await user.click(trigger());
    await user.tab();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("names an icon-only trigger with mode=label", () => {
    render(
      <Tooltip content="Align left" mode="label">
        <Button iconOnly>
          <svg aria-hidden />
        </Button>
      </Tooltip>,
    );
    const button = screen.getByRole("button", { name: "Align left" });
    expect(button).toHaveAttribute("aria-labelledby");
    expect(button).not.toHaveAttribute("aria-describedby");
    expect(document.getElementById(button.getAttribute("aria-labelledby")!)).toHaveAttribute(
      "role",
      "tooltip",
    );
  });

  it("supports the controlled open state", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(<Example open={false} onOpenChange={onOpenChange} />);
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    rerender(<Example open onOpenChange={onOpenChange} />);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("keeps the trigger's own props and handlers", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onClick = vi.fn();
    const ref = { current: null as HTMLButtonElement | null };
    render(
      <Tooltip content="Tooltip content">
        <Button ref={ref} id="own-id" className="own-class" onClick={onClick}>
          Trigger
        </Button>
      </Tooltip>,
    );
    const button = screen.getByRole("button", { name: "Trigger" });
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute("id", "own-id");
    expect(button).toHaveClass("own-class");
    expect(ref.current).toBe(button);
  });

  it("renders at the end of the page, outside the trigger's parent", () => {
    render(
      <div data-testid="group">
        <Tooltip content="Tooltip content" defaultOpen>
          <Button>One</Button>
        </Tooltip>
      </div>,
    );
    expect(screen.getByTestId("group").children).toHaveLength(1);
    expect(screen.getByRole("tooltip").parentElement).toBe(document.body);
  });

  it("styles the tooltip like Flowbite and merges className", () => {
    render(<Example defaultOpen className="max-w-xs" />);
    expect(screen.getByRole("tooltip")).toHaveClass(
      "bg-dark",
      "text-dark-foreground",
      "rounded-base",
      "px-3",
      "py-2",
      "text-sm",
      "font-medium",
      "shadow-xs",
      "transition-opacity",
      "duration-300",
      "z-tooltip",
      "max-w-xs",
    );
  });

  it("has a light variant and a configurable animation", () => {
    const { rerender } = render(<Example defaultOpen variant="light" animation="duration-500" />);
    expect(screen.getByRole("tooltip")).toHaveClass(
      "bg-neutral-primary-medium",
      "text-heading",
      "border-default",
      "duration-500",
    );
    expect(screen.getByRole("tooltip")).not.toHaveClass("duration-300");

    rerender(<Example defaultOpen animation={false} />);
    expect(screen.getByRole("tooltip")).toHaveClass("transition-none");
  });

  it("draws an arrow unless arrow is false", () => {
    const { rerender } = render(<Example defaultOpen />);
    const arrow = screen.getByRole("tooltip").querySelector("[data-slot=tooltip-arrow]");
    expect(arrow).toHaveAttribute("aria-hidden", "true");
    rerender(<Example defaultOpen arrow={false} />);
    expect(screen.getByRole("tooltip").querySelector("[data-slot=tooltip-arrow]")).toBeNull();
  });
});
