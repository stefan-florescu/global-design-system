import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Banner } from "./banner";

describe("Banner", () => {
  it("is a region named Announcement by default", () => {
    render(<Banner>New brand identity has been launched.</Banner>);
    expect(screen.getByRole("region", { name: "Announcement" })).toHaveTextContent(
      "New brand identity has been launched.",
    );
  });

  it("takes a custom name", () => {
    render(<Banner aria-label="Cookie notice">We use cookies.</Banner>);
    expect(screen.getByRole("region", { name: "Cookie notice" })).toBeInTheDocument();
  });

  it("pins to the top by default and to the bottom on request", () => {
    const { rerender } = render(<Banner>Top</Banner>);
    expect(screen.getByRole("region")).toHaveClass("fixed", "top-0", "border-b", "z-fixed");
    rerender(<Banner position="bottom">Bottom</Banner>);
    expect(screen.getByRole("region")).toHaveClass("fixed", "bottom-0", "border-t");
  });

  it("uses a soft neutral bar", () => {
    render(<Banner>Top</Banner>);
    expect(screen.getByRole("region")).toHaveClass(
      "bg-neutral-primary-soft",
      "border-default",
      "p-4",
      "text-sm",
      "text-body",
    );
  });

  it("floats as a card inset from the edge", () => {
    render(<Banner floating>Card</Banner>);
    expect(screen.getByRole("region")).toHaveClass(
      "rounded-base",
      "border",
      "shadow-xs",
      "inset-x-4",
      "top-6",
    );
  });

  it("closes from the keyboard", async () => {
    const user = userEvent.setup();
    render(<Banner dismissible>Hello</Banner>);
    await user.tab();
    const close = screen.getByRole("button", { name: "Close banner" });
    expect(close).toHaveFocus();
    expect(close).toHaveClass("size-7", "rounded-sm", "focus-visible:outline-2");
    await user.keyboard("{Enter}");
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("dismisses itself and reports it", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Banner dismissible onDismiss={onDismiss}>
        Hello
      </Banner>,
    );
    await user.click(screen.getByRole("button", { name: "Close banner" }));
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
