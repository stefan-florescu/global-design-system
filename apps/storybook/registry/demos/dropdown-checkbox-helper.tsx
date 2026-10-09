import { Dropdown, DropdownCheckboxItem, DropdownMenu, DropdownTrigger } from "@stefan-florescu/ui";

export default function DropdownCheckboxHelper() {
  return (
    <Dropdown>
      <DropdownTrigger>Dropdown button</DropdownTrigger>
      <DropdownMenu className="w-60">
        <DropdownCheckboxItem description="Some helpful instruction goes over here.">
          Enable notifications
        </DropdownCheckboxItem>
        <DropdownCheckboxItem description="Some helpful instruction goes over here.">
          Enable 2FA auth
        </DropdownCheckboxItem>
        <DropdownCheckboxItem description="Some helpful instruction goes over here.">
          Subscribe newsletter
        </DropdownCheckboxItem>
      </DropdownMenu>
    </Dropdown>
  );
}
