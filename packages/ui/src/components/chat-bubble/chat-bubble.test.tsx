import { render, screen } from "@testing-library/react";

import { ChatBubble } from "./chat-bubble";

describe("ChatBubble", () => {
  it("shows the sender, time, message and status", () => {
    render(
      <ChatBubble name="Ana Popescu" time="11:46" dateTime="2026-10-08T11:46" status="Delivered">
        The new tokens are live.
      </ChatBubble>,
    );
    expect(screen.getByText("Ana Popescu")).toBeInTheDocument();
    expect(screen.getByText("11:46").tagName).toBe("TIME");
    expect(screen.getByText("11:46")).toHaveAttribute("dateTime", "2026-10-08T11:46");
    expect(screen.getByText("The new tokens are live.")).toBeInTheDocument();
    expect(screen.getByText("Delivered")).toHaveClass("text-muted-foreground");
  });

  it("renders the avatar it is given", () => {
    render(<ChatBubble avatar={<img src="/a.svg" alt="Ana Popescu" />}>Hi</ChatBubble>);
    expect(screen.getByRole("img", { name: "Ana Popescu" })).toBeInTheDocument();
  });

  it("uses the muted surface by default and supports outline and clean", () => {
    const { rerender } = render(<ChatBubble>Hi</ChatBubble>);
    const body = () => screen.getByText("Hi").parentElement;
    expect(body()).toHaveClass("bg-muted");
    rerender(<ChatBubble variant="outline">Hi</ChatBubble>);
    expect(body()).toHaveClass("border", "bg-background");
    rerender(<ChatBubble variant="clean">Hi</ChatBubble>);
    expect(body()).not.toHaveClass("bg-muted", "p-4");
  });

  it("mirrors the layout for sent messages", () => {
    render(
      <ChatBubble align="end" data-testid="bubble">
        Sent
      </ChatBubble>,
    );
    expect(screen.getByTestId("bubble")).toHaveClass("flex-row-reverse");
    expect(screen.getByText("Sent").parentElement).toHaveClass("rounded-s-xl", "rounded-ee-xl");
  });
});
