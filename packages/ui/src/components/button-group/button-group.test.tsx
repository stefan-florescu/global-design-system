import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "../button";

import { ButtonGroup } from "./button-group";

describe("ButtonGroup", () => {
  it("is a named group of buttons", () => {
    render(
      <ButtonGroup aria-label="Text alignment">
        <Button variant="outline">Left</Button>
        <Button variant="outline">Center</Button>
        <Button variant="outline">Right</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group", { name: "Text alignment" });
    expect(within(group).getAllByRole("button")).toHaveLength(3);
  });

  it("keeps each button in the tab order", async () => {
    const user = userEvent.setup();
    render(
      <ButtonGroup aria-label="Actions">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();
  });

  it("joins the buttons and raises the focused one", () => {
    render(<ButtonGroup aria-label="Actions" />);
    expect(screen.getByRole("group")).toHaveClass(
      "*:rounded-none",
      "*:first:rounded-s-lg",
      "*:last:rounded-e-lg",
      "*:focus-visible:z-raised",
    );
  });

  it("rounds the ends fully for pill buttons", () => {
    render(<ButtonGroup aria-label="Actions" pill />);
    expect(screen.getByRole("group")).toHaveClass(
      "*:first:rounded-s-full",
      "*:last:rounded-e-full",
    );
  });
});
