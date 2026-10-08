import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";

import { Button } from "./button";
import { buttonVariants } from "./button.variants";

describe("Button", () => {
  it("renders a native button that does not submit forms by default", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
  });

  it("keeps an explicit type", () => {
    render(<Button type="submit">Send</Button>);
    expect(screen.getByRole("button", { name: "Send" })).toHaveAttribute("type", "submit");
  });

  it("activates with a click, Enter and Space", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    await user.click(screen.getByRole("button", { name: "Save" }));
    await user.tab();
    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Save" })).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("does not fire when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("is busy and disabled while loading, and keeps its label", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Saving
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("replaces the icon of an icon-only button with the spinner while loading", () => {
    render(
      <Button iconOnly loading aria-label="Refresh">
        <svg data-testid="icon" />
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
  });

  it("names an icon-only button with aria-label", () => {
    render(
      <Button iconOnly aria-label="Add item">
        <svg aria-hidden />
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument();
  });

  it("forwards ref and native attributes", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button ref={ref} aria-describedby="hint">
        Save
      </Button>,
    );
    expect(ref.current).toBe(screen.getByRole("button", { name: "Save" }));
    expect(ref.current).toHaveAttribute("aria-describedby", "hint");
  });

  it("merges consumer classes, letting them win over defaults", () => {
    render(<Button className="w-full rounded-none">Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveClass("w-full", "rounded-none");
    expect(button).not.toHaveClass("rounded-lg");
  });

  it("uses semantic tokens for fills and outlines", () => {
    render(
      <>
        <Button>Brand</Button>
        <Button variant="destructive" outline>
          Delete
        </Button>
      </>,
    );
    expect(screen.getByRole("button", { name: "Brand" })).toHaveClass(
      "bg-brand",
      "text-brand-foreground",
    );
    const outline = screen.getByRole("button", { name: "Delete" });
    expect(outline).toHaveClass("border-current", "bg-transparent");
    expect(outline).toHaveClass("text-destructive-subtle-foreground");
    expect(outline).not.toHaveClass("bg-destructive", "text-destructive-foreground");
  });

  it("only allows outline on intents that have a filled surface", () => {
    render(
      // @ts-expect-error -- ghost has no fill to outline
      <Button variant="ghost" outline>
        Ghost
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Ghost" })).toBeInTheDocument();
  });
});

describe("buttonVariants", () => {
  it("styles other elements, such as links", () => {
    const classes = buttonVariants({ variant: "outline", size: "sm" });
    expect(classes).toContain("border-border");
    expect(classes).toContain("h-9");
  });

  it("lets the link variant size to its text", () => {
    const classes = buttonVariants({ variant: "link", size: "lg" }).split(" ");
    expect(classes).toContain("h-auto");
    expect(classes).not.toContain("h-12");
    expect(classes).toContain("px-0");
    expect(classes).not.toContain("px-5");
  });
});
