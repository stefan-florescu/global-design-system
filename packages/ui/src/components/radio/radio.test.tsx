import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Fieldset } from "../fieldset";

import { Radio } from "./radio";

describe("Radio", () => {
  it("selects one option in a named group", async () => {
    const user = userEvent.setup();
    render(
      <Fieldset legend="Plan">
        <Radio name="plan" value="free" label="Free" defaultChecked />
        <Radio name="plan" value="pro" label="Pro" />
      </Fieldset>,
    );
    expect(screen.getByRole("group", { name: "Plan" })).toBeInTheDocument();
    await user.click(screen.getByRole("radio", { name: "Pro" }));
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Free" })).not.toBeChecked();
  });

  it("moves with arrow keys inside the group", async () => {
    const user = userEvent.setup();
    render(
      <Fieldset legend="Size">
        <Radio name="size" value="s" label="Small" defaultChecked />
        <Radio name="size" value="m" label="Medium" />
      </Fieldset>,
    );
    screen.getByRole("radio", { name: "Small" }).focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Medium" })).toBeChecked();
  });

  it("is round with a decorative centre dot", () => {
    const { container } = render(<Radio aria-label="Dot" />);
    expect(screen.getByRole("radio", { name: "Dot" })).toHaveClass("rounded-full", "border-input");
    expect(container.querySelector("[data-slot=radio-control] > span")).toHaveAttribute(
      "aria-hidden",
    );
  });

  it("works as a selectable card with a description", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Radio variant="card" name="hosting" value="s" label="0-50 MB" description="Small sites" />
        <Radio variant="card" name="hosting" value="l" label="500-1000 MB" description="Big" />
      </>,
    );
    const small = screen.getByRole("radio", { name: "0-50 MB" });
    expect(small).toHaveAccessibleDescription("Small sites");
    await user.click(screen.getByText("Small sites"));
    expect(small).toBeChecked();
  });
});
