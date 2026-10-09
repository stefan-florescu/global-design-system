import { Ellipsis, EllipsisVertical } from "@stefan-florescu/icons";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@stefan-florescu/ui";

export default function DropdownMenuIcon() {
  return (
    <div className="flex justify-center gap-4">
      <Dropdown>
        <DropdownTrigger variant="ghost" size="sm" iconOnly chevron={false} aria-label="Open menu">
          <EllipsisVertical aria-hidden />
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Separated link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown>
        <DropdownTrigger
          variant="ghost"
          size="sm"
          iconOnly
          chevron={false}
          aria-label="More actions"
        >
          <Ellipsis aria-hidden />
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Separated link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
