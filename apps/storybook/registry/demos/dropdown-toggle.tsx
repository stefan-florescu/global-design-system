import { Dropdown, DropdownCheckboxItem, DropdownMenu, DropdownTrigger } from "@stefan-florescu/ui";

export default function DropdownToggle() {
  return (
    <Dropdown>
      <DropdownTrigger>Dropdown button</DropdownTrigger>
      <DropdownMenu className="w-72 space-y-1">
        <DropdownCheckboxItem indicator="toggle">Enable notifications</DropdownCheckboxItem>
        <DropdownCheckboxItem indicator="toggle">Enable 2FA authentication</DropdownCheckboxItem>
        <DropdownCheckboxItem indicator="toggle">Subscribe to newsletter</DropdownCheckboxItem>
      </DropdownMenu>
    </Dropdown>
  );
}
