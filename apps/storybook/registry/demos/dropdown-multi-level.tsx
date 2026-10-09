import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSub,
  DropdownSubMenu,
  DropdownSubTrigger,
  DropdownTrigger,
} from "@stefan-florescu/ui";

export default function DropdownMultiLevel() {
  return (
    <Dropdown>
      <DropdownTrigger>Dropdown button</DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>Dashboard</DropdownItem>
        <DropdownSub>
          <DropdownSubTrigger>Dropdown</DropdownSubTrigger>
          <DropdownSubMenu>
            <DropdownItem>Overview</DropdownItem>
            <DropdownItem>My downloads</DropdownItem>
            <DropdownItem>Billing</DropdownItem>
            <DropdownItem>Rewards</DropdownItem>
          </DropdownSubMenu>
        </DropdownSub>
        <DropdownItem>Earnings</DropdownItem>
        <DropdownItem>Sign out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
