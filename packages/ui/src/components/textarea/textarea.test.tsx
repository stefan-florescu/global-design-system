import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("is a multi-line text field", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Message" />);
    const textarea = screen.getByRole("textbox", { name: "Message" });
    await user.type(textarea, "Hello{enter}there");
    expect(textarea).toHaveValue("Hello\nthere");
    expect(textarea).toHaveAttribute("rows", "4");
  });

  it("marks invalid values", () => {
    render(<Textarea aria-label="Bio" invalid />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });
});
