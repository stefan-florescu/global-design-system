import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "../button";

import { ButtonGroup } from "./button-group";

describe("ButtonGroup", () => {
  it("is a named group of buttons", () => {
    render(
      <ButtonGroup aria-label="Text alignment">
        <Button variant="tertiary">Left</Button>
        <Button variant="tertiary">Center</Button>
        <Button variant="tertiary">Right</Button>
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
      "rounded-base",
      "shadow-xs",
      "-space-x-px",
      "*:rounded-none",
      "*:first:rounded-s-base",
      "*:last:rounded-e-base",
      "*:focus-visible:z-raised",
    );
  });

  it("stacks vertically", () => {
    render(<ButtonGroup aria-label="Actions" orientation="vertical" />);
    expect(screen.getByRole("group")).toHaveClass(
      "flex-col",
      "-space-y-px",
      "*:first:rounded-t-base",
      "*:last:rounded-b-base",
    );
  });

  it("restyles the buttons as an outline group", () => {
    render(<ButtonGroup aria-label="Actions" outline />);
    expect(screen.getByRole("group")).toHaveClass(
      "*:border-dark-strong",
      "*:hover:bg-dark",
      "shadow-none",
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
