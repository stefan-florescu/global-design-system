import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@stefan-florescu/ui";

export default function DropdownOffsetDistance() {
  return (
    <Dropdown offset={35}>
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
