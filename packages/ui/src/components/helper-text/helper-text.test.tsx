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

  it("uses checked text tokens for errors and success", () => {
    render(
      <>
        <HelperText variant="error">Required</HelperText>
        <HelperText variant="success">Looks good</HelperText>
      </>,
    );
    expect(screen.getByText("Required")).toHaveClass("text-destructive-subtle-foreground");
    expect(screen.getByText("Looks good")).toHaveClass("text-success-subtle-foreground");
  });
});
