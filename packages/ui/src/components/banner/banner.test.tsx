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

  it("floats as a card inset from the edge", () => {
    render(<Banner floating>Card</Banner>);
    expect(screen.getByRole("region")).toHaveClass("rounded-lg", "shadow-md", "inset-x-4");
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
