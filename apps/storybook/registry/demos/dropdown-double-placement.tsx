import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@stefan-florescu/ui";

export default function DropdownDoublePlacement() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Dropdown placement="left-end">
        <DropdownTrigger>Dropdown left end</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownItem>Sign out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown placement="right-end">
        <DropdownTrigger>Dropdown right end</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownItem>Sign out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
