import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@stefan-florescu/ui";

export default function DropdownSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Dropdown>
        <DropdownTrigger>Small dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownItem>Sign out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown>
        <DropdownTrigger size="lg">Large dropdown</DropdownTrigger>
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
