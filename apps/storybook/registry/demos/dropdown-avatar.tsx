import {
  Bell,
  CircleQuestionMark,
  Lock,
  LogOut,
  Moon,
  Rocket,
  SlidersHorizontal,
  User,
} from "@stefan-florescu/icons";
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownCheckboxItem,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@stefan-florescu/ui";

export default function DropdownAvatar() {
  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button
          type="button"
          aria-label="Open user menu"
          className="bg-dark focus:ring-neutral-quaternary focus-visible:outline-ring flex cursor-pointer rounded-full text-sm outline-hidden focus:ring-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
        >
          <Avatar src="/avatars/5.svg" alt="" size="sm" />
        </button>
      </DropdownTrigger>
      <DropdownMenu className="w-72">
        <DropdownHeader>
          <Avatar src="/avatars/5.svg" alt="" size="sm" />
          <div>
            <div className="text-heading font-medium">Joseph McFall</div>
            <div className="text-body truncate">name@company.com</div>
          </div>
          <Badge bordered className="ms-auto">
            PRO
          </Badge>
        </DropdownHeader>
        <DropdownItem>
          <User aria-hidden />
          Account
        </DropdownItem>
        <DropdownItem>
          <SlidersHorizontal aria-hidden />
          Settings
        </DropdownItem>
        <DropdownItem>
          <Lock aria-hidden />
          Privacy
        </DropdownItem>
        <DropdownItem>
          <Bell aria-hidden />
          Notifications
        </DropdownItem>
        <DropdownItem>
          <CircleQuestionMark aria-hidden />
          Help center
        </DropdownItem>
        <DropdownCheckboxItem indicator="toggle" indicatorPosition="end">
          <Moon aria-hidden />
          Dark mode
        </DropdownCheckboxItem>
        <DropdownDivider className="mx-0 my-1.5" />
        <DropdownItem>
          <Rocket aria-hidden />
          Upgrade to PRO
        </DropdownItem>
        <DropdownItem variant="danger">
          <LogOut aria-hidden />
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
