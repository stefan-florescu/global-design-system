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
    expect(textarea).toHaveClass("p-3.5", "rounded-base");
  });

  it("marks invalid and valid values", () => {
    render(
      <>
        <Textarea aria-label="Bio" invalid />
        <Textarea aria-label="Title" valid />
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Bio" })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("textbox", { name: "Title" })).toHaveAttribute("data-valid", "true");
  });

  it("merges consumer classes", () => {
    render(<Textarea aria-label="Comment" className="border-0 px-0" />);
    expect(screen.getByRole("textbox")).toHaveClass("border-0", "px-0");
  });
});
