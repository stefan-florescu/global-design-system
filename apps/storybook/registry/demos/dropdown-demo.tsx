import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@stefan-florescu/ui";

export default function DropdownDemo() {
  return (
    <Dropdown>
      <DropdownTrigger>Dropdown button</DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>Dashboard</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Earnings</DropdownItem>
        <DropdownItem>Sign out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
