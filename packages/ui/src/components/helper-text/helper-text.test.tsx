import { render, screen } from "@testing-library/react";

import { HelperText } from "./helper-text";

describe("HelperText", () => {
  it("describes the control that references it", () => {
    render(
      <>
        <input aria-label="Email" aria-describedby="hint" />
        <HelperText id="hint">We never share it.</HelperText>
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAccessibleDescription(
      "We never share it.",
    );
  });

  it("uses Flowbite's helper text styles", () => {
    render(<HelperText>Hint</HelperText>);
    expect(screen.getByText("Hint")).toHaveClass("mt-2.5", "text-sm", "text-body");
  });

  it("uses checked text tokens for danger and success", () => {
    render(
      <>
        <HelperText variant="danger">Required</HelperText>
        <HelperText variant="success">Looks good</HelperText>
      </>,
    );
    expect(screen.getByText("Required")).toHaveClass("text-fg-danger-strong");
    expect(screen.getByText("Looks good")).toHaveClass("text-fg-success-strong");
  });
});
