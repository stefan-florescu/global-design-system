import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  useModal,
  type ModalProps,
} from "./modal";

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

function Example(props: ModalProps) {
  return (
    <Modal {...props}>
      <ModalTrigger>Toggle modal</ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Terms of Service</ModalTitle>
          <ModalClose label="Close modal" />
        </ModalHeader>
        <ModalBody>
          <p>Some terms.</p>
        </ModalBody>
        <ModalFooter>
          <button type="button">I accept</button>
          <ModalClose asChild>
            <button type="button">Decline</button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const dialog = () => screen.getByRole("dialog", { hidden: true });

describe("Modal", () => {
  it("is closed by default and wires the trigger to the dialog", () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Toggle modal" });
    expect(dialog()).not.toHaveAttribute("open");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-controls", dialog().id);
  });

  it("opens as a modal dialog named by its title", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Toggle modal" }));
    const box = screen.getByRole("dialog", { name: "Terms of Service" });
    expect(box).toHaveAttribute("open");
    expect(box.matches(":modal")).toBe(true);
    expect(screen.getByRole("heading", { level: 2, name: "Terms of Service" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Toggle modal", hidden: true })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("closes with the × button and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Toggle modal" });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Close modal" }));
    expect(dialog()).not.toHaveAttribute("open");
    expect(trigger).toHaveFocus();
  });

  it("closes from a footer button with ModalClose asChild", async () => {
    const user = userEvent.setup();
    render(<Example defaultOpen />);
    const decline = screen.getByRole("button", { name: "Decline" });
    expect(decline).toHaveAttribute("type", "button");
    await user.click(decline);
    expect(dialog()).not.toHaveAttribute("open");
  });

  it("moves focus to the element with data-autofocus when it opens", async () => {
    const user = userEvent.setup();
    render(
      <Modal>
        <ModalTrigger>Delete</ModalTrigger>
        <ModalContent role="alertdialog">
          <ModalClose label="Close modal" />
          <ModalTitle>Delete this product?</ModalTitle>
          <button type="button">Yes, I&apos;m sure</button>
          <ModalClose asChild>
            <button type="button" data-autofocus>
              No, cancel
            </button>
          </ModalClose>
        </ModalContent>
      </Modal>,
    );
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByRole("alertdialog", { name: "Delete this product?" })).toHaveAttribute(
      "open",
    );
    expect(screen.getByRole("button", { name: "No, cancel" })).toHaveFocus();
  });

  it("closes on Escape (the dialog's cancel event), even when static", () => {
    render(<Example defaultOpen dismissible={false} />);
    const cancel = new Event("cancel", { cancelable: true });
    act(() => {
      dialog().dispatchEvent(cancel);
    });
    expect(cancel.defaultPrevented).toBe(true);
    expect(dialog()).not.toHaveAttribute("open");
  });

  it("closes on a click on the backdrop, but not inside the box", () => {
    render(<Example defaultOpen />);
    const box = dialog();
    box.getBoundingClientRect = () => DOMRect.fromRect({ x: 200, y: 100, width: 672, height: 400 });
    fireEvent.click(box, { clientX: 300, clientY: 200 });
    expect(box).toHaveAttribute("open");
    fireEvent.click(screen.getByText("Some terms."));
    expect(box).toHaveAttribute("open");
    fireEvent.click(box, { clientX: 10, clientY: 10 });
    expect(box).not.toHaveAttribute("open");
  });

  it("stays open on a backdrop click when not dismissible (static modal)", () => {
    render(<Example defaultOpen dismissible={false} />);
    const box = dialog();
    box.getBoundingClientRect = () => DOMRect.fromRect({ x: 200, y: 100, width: 672, height: 400 });
    fireEvent.click(box, { clientX: 10, clientY: 10 });
    expect(box).toHaveAttribute("open");
  });

  it("locks page scrolling while open", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Toggle modal" }));
    expect(document.documentElement.style.overflow).toBe("hidden");
    await user.click(screen.getByRole("button", { name: "Close modal" }));
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("syncs the state when the browser closes the dialog", () => {
    render(<Example defaultOpen />);
    act(() => {
      (dialog() as HTMLDialogElement).close();
    });
    expect(screen.getByRole("button", { name: "Toggle modal" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
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
    await user.click(screen.getByRole("button", { name: "Close modal" }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(dialog()).not.toHaveAttribute("open");
  });

  it("stays open when a controlled parent refuses to close", async () => {
    const user = userEvent.setup();
    render(<Example open onOpenChange={() => {}} />);
    await user.click(screen.getByRole("button", { name: "Close modal" }));
    expect(dialog()).toHaveAttribute("open");
  });

  it("applies the size and placement", () => {
    render(<Example size="md" placement="top-right" />);
    expect(dialog()).toHaveAttribute("data-placement", "top-right");
    expect(dialog()).toHaveClass("max-w-md", "mt-4", "me-4", "ms-auto");
    expect(dialog()).not.toHaveClass("max-w-2xl");
  });

  it("renders a custom trigger with asChild and exposes the state with useModal", async () => {
    const user = userEvent.setup();
    function Status() {
      const { open, setOpen } = useModal();
      return (
        <button type="button" onClick={() => setOpen(false)}>
          {open ? "Done" : "Idle"}
        </button>
      );
    }
    render(
      <Modal>
        <ModalTrigger asChild>
          <a href="#terms">Read the terms</a>
        </ModalTrigger>
        <ModalContent aria-label="Terms">
          <Status />
        </ModalContent>
      </Modal>,
    );
    const link = screen.getByRole("link", { name: "Read the terms" });
    expect(link).toHaveAttribute("aria-haspopup", "dialog");
    await user.click(link);
    expect(screen.getByRole("dialog", { name: "Terms" })).toHaveAttribute("open");
    await user.click(screen.getByRole("button", { name: "Done" }));
    expect(dialog()).not.toHaveAttribute("open");
  });

  it("merges className and forwards attributes", () => {
    render(
      <Modal>
        <ModalContent className="p-0" role="alertdialog" aria-label="Delete" data-testid="box" />
      </Modal>,
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("p-0");
    expect(box).not.toHaveClass("p-4");
    expect(box).toHaveAttribute("role", "alertdialog");
  });

  it("throws when a part is used outside <Modal>", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ModalTitle>Lost</ModalTitle>)).toThrow(/inside <Modal>/);
    spy.mockRestore();
  });
});
