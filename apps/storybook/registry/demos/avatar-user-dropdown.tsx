import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@stefan-florescu/ui";

export default function AvatarUserDropdown() {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger asChild>
        <button
          type="button"
          aria-label="User menu"
          className="focus-visible:outline-ring flex cursor-pointer rounded-full outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
        >
          <Avatar src="/avatars/5.svg" alt="" />
        </button>
      </DropdownTrigger>
      <DropdownMenu className="p-0">
        <div className="border-default-medium text-heading border-b px-4 py-3 text-sm font-normal">
          <div className="font-medium">Bonnie Green</div>
          <div className="truncate">name@flowbite.com</div>
        </div>
        <div className="p-2">
          <DropdownItem className="rounded-md">Dashboard</DropdownItem>
          <DropdownItem className="rounded-md">Settings</DropdownItem>
          <DropdownItem className="rounded-md">Earnings</DropdownItem>
          <DropdownItem variant="danger" className="rounded-md">
            Sign out
          </DropdownItem>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
}
