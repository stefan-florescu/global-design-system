import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@stefan-florescu/ui";

export default function DropdownOffsetSkidding() {
  return (
    <Dropdown placement="right" skidding={100}>
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
