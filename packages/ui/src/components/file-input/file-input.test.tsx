import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FileDropzone, FileInput } from "./file-input";

const file = new File(["hello"], "hello.png", { type: "image/png" });

describe("FileInput", () => {
  it("accepts files", async () => {
    const user = userEvent.setup();
    render(<FileInput aria-label="Avatar" />);
    const input = screen.getByLabelText("Avatar") as HTMLInputElement;
    expect(input).toHaveAttribute("type", "file");
    await user.upload(input, file);
    expect(input.files?.[0]).toBe(file);
  });

  it("applies the size and invalid state", () => {
    render(<FileInput aria-label="Avatar" size="lg" invalid />);
    const input = screen.getByLabelText("Avatar");
    expect(input).toHaveClass("text-lg");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("draws the choose button as a segment inside the field, rounded at the start", () => {
    render(<FileInput aria-label="Avatar" />);
    expect(screen.getByLabelText("Avatar")).toHaveClass(
      "file:my-1",
      "file:ms-1",
      "file:rounded-s",
      "file:rounded-e-none",
    );
  });
});

describe("FileDropzone", () => {
  it("is a file input named by its text", async () => {
    const user = userEvent.setup();
    render(<FileDropzone description="PNG or JPG, up to 2 MB" accept="image/*" />);
    const input = screen.getByLabelText(/Click to upload/) as HTMLInputElement;
    expect(input).toHaveAttribute("type", "file");
    expect(input).toHaveAttribute("accept", "image/*");
    await user.upload(input, file);
    expect(input.files?.[0]).toBe(file);
  });

  it("can be disabled", () => {
    render(<FileDropzone disabled />);
    expect(screen.getByLabelText(/Click to upload/)).toBeDisabled();
  });
});
