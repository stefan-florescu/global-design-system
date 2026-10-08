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
    expect(screen.getByRole("listbox", { name: "Tags" })).toHaveClass("h-auto");
    expect(container.querySelector("svg")).toBeNull();
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
