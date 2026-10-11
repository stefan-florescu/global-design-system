import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "../button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "../dropdown";

import { Popover, PopoverBody, PopoverHeader, PopoverTitle, type PopoverProps } from ".";

function Example(props: Partial<PopoverProps>) {
  return (
    <>
      <Popover
        content={
          <>
            <PopoverHeader>
              <PopoverTitle>Popover title</PopoverTitle>
            </PopoverHeader>
            <PopoverBody>
              <p>And here&apos;s some amazing content.</p>
              <a href="#more">Read more</a>
            </PopoverBody>
          </>
        }
        {...props}
      >
        <Button>Default popover</Button>
      </Popover>
      <button type="button">After</button>
    </>
  );
}

const trigger = () => screen.getByRole("button", { name: "Default popover" });

describe("Popover (click)", () => {
  it("is a non-modal dialog named by its title, controlled by the trigger", async () => {
    const user = userEvent.setup();
    render(<Example />);
    expect(trigger()).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(trigger());
    const dialog = screen.getByRole("dialog", { name: "Popover title" });
    expect(dialog).not.toHaveAttribute("aria-modal");
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(trigger()).toHaveAttribute("aria-controls", dialog.id);
    expect(screen.getByRole("link", { name: "Read more" })).toHaveFocus();
  });

  it("closes with a second click, Escape (returning focus) and a click outside", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(trigger());
    await user.click(trigger());
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(trigger());
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger()).toHaveFocus();

    await user.click(trigger());
    await user.click(screen.getByRole("button", { name: "After" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when focus moves out of it", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(trigger());
    await user.tab();
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("focuses the panel itself when it has no controls", async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<p>Plain text</p>} aria-label="Details">
        <Button>Open</Button>
      </Popover>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog", { name: "Details" })).toHaveFocus();
  });

  it("is named by the trigger when it has no title", async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<p>Plain text</p>}>
        <Button>Storage status</Button>
      </Popover>,
    );
    await user.click(screen.getByRole("button", { name: "Storage status" }));
    expect(screen.getByRole("dialog", { name: "Storage status" })).toBeInTheDocument();
  });

  it("lets Escape close a menu inside it before closing itself", async () => {
    const user = userEvent.setup();
    render(
      <Popover
        aria-label="Company"
        content={
          <Dropdown>
            <DropdownTrigger>More</DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>Report</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        }
      >
        <Button>Company profile</Button>
      </Popover>,
    );
    await user.click(screen.getByRole("button", { name: "Company profile" }));
    await user.click(screen.getByRole("button", { name: "More" }));
    expect(screen.getByRole("menuitem", { name: "Report" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "Company" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "More" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Company profile" })).toHaveFocus();
  });

  it("supports the controlled open state", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(<Example open={false} onOpenChange={onOpenChange} />);
    await user.click(trigger());
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(<Example open onOpenChange={onOpenChange} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("keeps the trigger's own props and handlers", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Popover content="Hi">
        <Button id="mine" className="extra" onClick={onClick}>
          Open
        </Button>
      </Popover>,
    );
    const button = screen.getByRole("button", { name: "Open" });
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute("id", "mine");
    expect(button).toHaveClass("extra");
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-labelledby", "mine");
  });

  it("styles the panel and merges className", () => {
    render(<Example defaultOpen className="w-80 p-3" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass(
      "w-80",
      "p-3",
      "z-popover",
      "rounded-base",
      "border-default",
      "bg-neutral-primary-soft",
      "text-body",
      "shadow-xs",
      "motion-reduce:transition-none",
    );
    expect(dialog).not.toHaveClass("w-64", "p-0");
  });

  it("draws an arrow unless arrow is false", () => {
    const { container, rerender } = render(<Example defaultOpen />);
    const arrow = container.querySelector("[data-slot=popover-arrow]");
    expect(arrow).toHaveAttribute("aria-hidden", "true");
    expect(arrow).toHaveClass("rotate-45", "bg-inherit", "border-neutral-tertiary");
    rerender(<Example defaultOpen arrow={false} />);
    expect(container.querySelector("[data-slot=popover-arrow]")).toBeNull();
  });
});

describe("Popover (hover)", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("opens on hover, stays open over the panel and closes after leaving", () => {
    render(<Example trigger="hover" />);
    expect(trigger()).not.toHaveAttribute("aria-expanded");
    const dialog = document.getElementById(trigger().getAttribute("aria-describedby")!)!;
    expect(dialog).toHaveAttribute("role", "dialog");

    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    expect(screen.getByRole("dialog", { name: "Popover title" })).toBeVisible();

    // Crossing the gap from the trigger to the panel keeps it open.
    fireEvent.pointerLeave(trigger(), { pointerType: "mouse" });
    fireEvent.pointerEnter(dialog, { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.pointerLeave(dialog, { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(500));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on keyboard focus and lets Tab reach its content", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Example trigger="hover" />);
    await user.tab();
    expect(trigger()).toHaveFocus();
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.tab();
    expect(screen.getByRole("link", { name: "Read more" })).toHaveFocus();
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.tab();
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("is dismissed with Escape without moving the pointer", () => {
    render(<Example trigger="hover" />);
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    fireEvent.keyDown(trigger(), { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens with a click or tap and stays open until a press outside", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Example trigger="hover" />);
    fireEvent.click(trigger());
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.pointer({ keys: "[MouseLeft]", target: document.body });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
