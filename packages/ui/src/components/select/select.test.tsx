import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Select } from "./select";

describe("Select", () => {
  it("is a native select", async () => {
    const user = userEvent.setup();
    render(
      <Select aria-label="Country" defaultValue="ro">
        <option value="de">Germany</option>
        <option value="ro">Romania</option>
      </Select>,
    );
    const select = screen.getByRole("combobox", { name: "Country" });
    expect(select).toHaveValue("ro");
    await user.selectOptions(select, "de");
    expect(select).toHaveValue("de");
  });

  it("shows a list without a chevron for multiple and htmlSize", () => {
    const { container } = render(
      <Select aria-label="Tags" multiple>
        <option>React</option>
      </Select>,
    );
    expect(screen.getByRole("listbox", { name: "Tags" })).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeNull();
  });

  it("shows a decorative chevron and keeps text-sm at every size", () => {
    const { container } = render(
      <Select aria-label="Country" size="xl">
        <option>Romania</option>
      </Select>,
    );
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("combobox")).toHaveClass("text-sm", "px-4", "py-3.5");
  });

  it("supports the underline style", () => {
    render(
      <Select aria-label="Country" variant="underline">
        <option>Romania</option>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toHaveClass("border-b-2", "ps-0", "bg-transparent");
  });

  it("marks invalid choices", () => {
    render(
      <Select aria-label="Plan" invalid>
        <option>Free</option>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  });
});
