import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FileDropzone, FileInput } from "./file-input";

const file = new File(["hello"], "hello.png", { type: "image/png" });

describe("FileInput", () => {
  it("accepts files", async () => {
    const user = userEvent.setup();
    render(<FileInput aria-label="Avatar" />);
    const input = screen.getByLabelText("Avatar") as HTMLInputElement;
    await user.upload(input, file);
    expect(input.files?.[0]).toBe(file);
  });
});

describe("FileDropzone", () => {
  it("is a file input named by its text", async () => {
    const user = userEvent.setup();
    render(<FileDropzone description="PNG or JPG, up to 2 MB" accept="image/*" />);
    const input = screen.getByLabelText(/Click to upload/) as HTMLInputElement;
    expect(input).toHaveAttribute("type", "file");
    await user.upload(input, file);
    expect(input.files?.[0]).toBe(file);
  });
});
