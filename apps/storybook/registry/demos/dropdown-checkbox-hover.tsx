import { Dropdown, DropdownCheckboxItem, DropdownMenu, DropdownTrigger } from "@stefan-florescu/ui";

export default function DropdownCheckboxHover() {
  return (
    <Dropdown>
      <DropdownTrigger>Dropdown button</DropdownTrigger>
      <DropdownMenu className="w-52">
        <DropdownCheckboxItem>Default checkbox</DropdownCheckboxItem>
        <DropdownCheckboxItem defaultChecked>Checked state</DropdownCheckboxItem>
        <DropdownCheckboxItem>Default checkbox</DropdownCheckboxItem>
      </DropdownMenu>
    </Dropdown>
  );
}
