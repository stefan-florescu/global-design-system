import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ChatBubble } from "./chat-bubble";
import { ChatBubbleMenu, ChatBubbleMenuItem } from "./chat-bubble-menu";

describe("ChatBubble", () => {
  it("shows the sender, time, message and status", () => {
    render(
      <ChatBubble name="Bonnie Green" time="11:46" dateTime="2026-10-08T11:46" status="Delivered">
        That&apos;s awesome.
      </ChatBubble>,
    );
    expect(screen.getByText("Bonnie Green")).toHaveClass("font-semibold", "text-heading");
    expect(screen.getByText("11:46").tagName).toBe("TIME");
    expect(screen.getByText("11:46")).toHaveAttribute("dateTime", "2026-10-08T11:46");
    expect(screen.getByText("That's awesome.")).toHaveClass("text-sm", "text-body", "py-2.5");
    expect(screen.getByText("Delivered")).toHaveClass("text-body");
  });

  it("renders the avatar and actions it is given", () => {
    render(
      <ChatBubble
        avatar={<img src="/a.svg" alt="Bonnie Green" />}
        actions={<button type="button">More</button>}
      >
        Hi
      </ChatBubble>,
    );
    expect(screen.getByRole("img", { name: "Bonnie Green" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "More" })).toBeInTheDocument();
  });

  it("draws the default, outline and clean styles", () => {
    const { rerender } = render(
      <ChatBubble name="Bonnie Green" status="Delivered">
        Hi
      </ChatBubble>,
    );
    const bubble = () => screen.getByText("Hi").parentElement!;
    // default: one bubble holds the name, the message and the status
    expect(bubble()).toHaveClass("bg-neutral-secondary-soft", "p-4", "rounded-e-base");
    expect(bubble()).toContainElement(screen.getByText("Delivered"));

    // outline: the bubble only holds the message
    rerender(
      <ChatBubble name="Bonnie Green" status="Delivered" variant="outline">
        Hi
      </ChatBubble>,
    );
    expect(bubble()).toHaveClass("bg-neutral-secondary-soft", "p-4");
    expect(bubble()).not.toContainElement(screen.getByText("Delivered"));
    expect(bubble()).not.toContainElement(screen.getByText("Bonnie Green"));

    // clean: no bubble, heading text
    rerender(<ChatBubble variant="clean">Hi</ChatBubble>);
    expect(screen.getByText("Hi")).toHaveClass("text-heading", "py-2");
    expect(bubble()).not.toHaveClass("bg-neutral-secondary-soft");
  });

  it("mirrors the layout for sent messages", () => {
    render(
      <ChatBubble align="end" data-testid="bubble">
        Sent
      </ChatBubble>,
    );
    expect(screen.getByTestId("bubble")).toHaveClass("flex-row-reverse");
    expect(screen.getByText("Sent").parentElement).toHaveClass("rounded-s-base", "rounded-ee-base");
  });
});

describe("ChatBubbleMenu", () => {
  function Actions({ onReply }: { onReply?: () => void }) {
    return (
      <ChatBubbleMenu>
        <ChatBubbleMenuItem onClick={onReply}>Reply</ChatBubbleMenuItem>
        <ChatBubbleMenuItem>Forward</ChatBubbleMenuItem>
        <ChatBubbleMenuItem>Delete</ChatBubbleMenuItem>
      </ChatBubbleMenu>
    );
  }

  const button = () => screen.getByRole("button", { name: "Message actions" });

  it('is a menu button named by the "more" button', async () => {
    const user = userEvent.setup();
    render(<Actions />);
    expect(button()).toHaveAttribute("aria-haspopup", "menu");
    expect(button()).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    await user.click(button());
    const menu = screen.getByRole("menu", { name: "Message actions" });
    expect(button()).toHaveAttribute("aria-expanded", "true");
    expect(button()).toHaveAttribute("aria-controls", menu.id);
    expect(menu).toHaveClass("w-40");
    expect(screen.getAllByRole("menuitem").map((item) => item.textContent)).toEqual([
      "Reply",
      "Forward",
      "Delete",
    ]);
    expect(screen.getByRole("menuitem", { name: "Reply" })).toHaveFocus();
  });

  it("moves through the actions with the arrow keys and typeahead", async () => {
    const user = userEvent.setup();
    render(<Actions />);
    button().focus();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Reply" })).toHaveFocus();
    await user.keyboard("f");
    expect(screen.getByRole("menuitem", { name: "Forward" })).toHaveFocus();
    await user.keyboard("{End}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(button()).toHaveFocus();
  });

  it("runs an action, closes the menu and returns focus to the button", async () => {
    const user = userEvent.setup();
    const onReply = vi.fn();
    render(<Actions onReply={onReply} />);
    await user.click(button());
    await user.keyboard("{Enter}");
    expect(onReply).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(button()).toHaveFocus();
  });

  it("accepts a custom label", () => {
    render(<ChatBubbleMenu label="Actions for Bonnie's message" />);
    expect(
      screen.getByRole("button", { name: "Actions for Bonnie's message" }),
    ).toBeInTheDocument();
  });
});
