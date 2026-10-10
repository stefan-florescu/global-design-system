import { Dropdown, DropdownCheckboxItem, DropdownMenu, DropdownTrigger } from "@stefan-florescu/ui";

// A plain list: no padding or hover fill on the rows, 16px between them.
const plainItem = "p-0 hover:bg-transparent focus-visible:bg-transparent";

export default function DropdownCheckbox() {
  return (
    <Dropdown>
      <DropdownTrigger>Dropdown button</DropdownTrigger>
      <DropdownMenu className="w-52 space-y-4 p-4">
        <DropdownCheckboxItem className={plainItem}>Default checkbox</DropdownCheckboxItem>
        <DropdownCheckboxItem className={plainItem} defaultChecked>
          Checked state
        </DropdownCheckboxItem>
        <DropdownCheckboxItem className={plainItem}>Default checkbox</DropdownCheckboxItem>
      </DropdownMenu>
    </Dropdown>
  );
}
