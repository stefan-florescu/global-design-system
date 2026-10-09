import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  type DrawerProps,
} from "./drawer";

// jsdom has no <dialog> methods: a minimal stand-in that tracks `open` and `:modal`.
const modal = new WeakSet<HTMLDialogElement>();
beforeAll(() => {
  const proto = HTMLDialogElement.prototype;
  proto.showModal = function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
    modal.add(this);
  };
  proto.show = function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  proto.close = function (this: HTMLDialogElement) {
    this.removeAttribute("open");
    modal.delete(this);
    this.dispatchEvent(new Event("close"));
  };
  const matches = Element.prototype.matches;
  proto.matches = function (this: HTMLDialogElement, selector: string) {
    if (selector === ":modal") return modal.has(this);
    return matches.call(this, selector);
  };
});

function Example(props: DrawerProps) {
  return (
    <Drawer {...props}>
      <DrawerTrigger>Show drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer heading</DrawerTitle>
          <DrawerClose label="Close drawer" />
        </DrawerHeader>
        <DrawerDescription>Some details.</DrawerDescription>
        <button type="button">Get access</button>
      </DrawerContent>
    </Drawer>
  );
}

const dialog = () => screen.getByRole("dialog", { hidden: true });

describe("Drawer", () => {
  it("is closed by default and wires the trigger to the dialog", () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Show drawer" });
    expect(dialog()).not.toHaveAttribute("open");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-controls", dialog().id);
  });

  it("opens as a modal dialog named by its title and described by its description", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Show drawer" }));
    const drawer = screen.getByRole("dialog", { name: "Drawer heading" });
    expect(drawer).toHaveAttribute("open");
    expect(drawer).toHaveAccessibleDescription("Some details.");
    expect(drawer.matches(":modal")).toBe(true);
    expect(screen.getByRole("button", { name: "Show drawer", hidden: true })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("closes with the close button and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Show drawer" });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Close drawer" }));
    expect(dialog()).not.toHaveAttribute("open");
    expect(trigger).toHaveFocus();
  });

  it("closes on Escape (the dialog's cancel event)", async () => {
    const user = userEvent.setup();
    render(<Example defaultOpen />);
    expect(dialog()).toHaveAttribute("open");
    const cancel = new Event("cancel", { cancelable: true });
    act(() => {
      dialog().dispatchEvent(cancel);
    });
    expect(cancel.defaultPrevented).toBe(true);
    expect(dialog()).not.toHaveAttribute("open");
    await user.click(screen.getByRole("button", { name: "Show drawer" }));
    expect(dialog()).toHaveAttribute("open");
  });

  it("closes on a click on the backdrop, but not inside the panel", () => {
    render(<Example defaultOpen />);
    const drawer = dialog();
    drawer.getBoundingClientRect = () => DOMRect.fromRect({ x: 0, y: 0, width: 384, height: 800 });
    fireEvent.click(drawer, { clientX: 100, clientY: 100 });
    expect(drawer).toHaveAttribute("open");
    fireEvent.click(screen.getByText("Some details."));
    expect(drawer).toHaveAttribute("open");
    fireEvent.click(drawer, { clientX: 600, clientY: 100 });
    expect(drawer).not.toHaveAttribute("open");
  });

  it("is non-modal without a backdrop and closes on Escape from inside", async () => {
    const user = userEvent.setup();
    render(<Example backdrop={false} />);
    await user.click(screen.getByRole("button", { name: "Show drawer" }));
    expect(dialog()).toHaveAttribute("open");
    expect(dialog().matches(":modal")).toBe(false);
    expect(dialog()).toHaveClass("z-modal");
    // No light dismiss without a backdrop.
    fireEvent.click(dialog(), { clientX: 2000, clientY: 10 });
    expect(dialog()).toHaveAttribute("open");
    screen.getByRole("button", { name: "Get access" }).focus();
    await user.keyboard("{Escape}");
    expect(dialog()).not.toHaveAttribute("open");
    expect(screen.getByRole("button", { name: "Show drawer" })).toHaveFocus();
  });

  it("locks page scrolling while open unless scrollLock is off", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Example />);
    await user.click(screen.getByRole("button", { name: "Show drawer" }));
    expect(document.documentElement.style.overflow).toBe("hidden");
    await user.click(screen.getByRole("button", { name: "Close drawer" }));
    expect(document.documentElement.style.overflow).toBe("");
    unmount();

    render(<Example scrollLock={false} />);
    await user.click(screen.getByRole("button", { name: "Show drawer" }));
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("supports controlled use", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open
          </button>
          <Example
            open={open}
            onOpenChange={(next) => {
              onOpenChange(next);
              setOpen(next);
            }}
          />
        </>
      );
    }
    render(<Controlled />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(dialog()).toHaveAttribute("open");
    await user.click(screen.getByRole("button", { name: "Close drawer" }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(dialog()).not.toHaveAttribute("open");
  });

  it("stays open when a controlled parent refuses to close", async () => {
    const user = userEvent.setup();
    render(<Example open onOpenChange={() => {}} />);
    await user.click(screen.getByRole("button", { name: "Close drawer" }));
    expect(dialog()).toHaveAttribute("open");
  });

  it("applies the placement", () => {
    render(<Example placement="right" />);
    expect(dialog()).toHaveAttribute("data-placement", "right");
    expect(dialog()).toHaveClass("right-0", "translate-x-full");
  });

  it("keeps a handle on screen with the swipeable edge", async () => {
    const user = userEvent.setup();
    render(
      <Drawer edge>
        <DrawerContent>
          <DrawerHandle>Add widget</DrawerHandle>
          <button type="button">Chart</button>
        </DrawerContent>
      </Drawer>,
    );
    const handle = screen.getByRole("button", { name: "Add widget" });
    expect(handle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("button", { name: "Chart" })).not.toBeInTheDocument();
    await user.click(handle);
    const drawer = screen.getByRole("dialog", { name: "Add widget" });
    expect(drawer).toHaveAttribute("data-placement", "bottom");
    const inner = screen.getByRole("button", { name: "Add widget", expanded: true });
    expect(inner).toHaveAttribute("aria-controls", drawer.id);
    await user.click(inner);
    expect(drawer).not.toHaveAttribute("open");
    expect(screen.getByRole("button", { name: "Add widget", expanded: false })).toBeVisible();
  });

  it("merges className and forwards attributes", () => {
    render(
      <Drawer>
        <DrawerContent className="w-80" aria-label="Menu" data-testid="panel" />
      </Drawer>,
    );
    expect(screen.getByTestId("panel")).toHaveClass("w-80");
    expect(screen.getByTestId("panel")).not.toHaveClass("w-96");
  });
});
