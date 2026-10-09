import { UserPlus } from "@stefan-florescu/icons";
import {
  Avatar,
  buttonVariants,
  cn,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@stefan-florescu/ui";

const users = [
  { name: "Jese Leos", avatar: "/avatars/1.svg" },
  { name: "Robert Gough", avatar: "/avatars/2.svg" },
  { name: "Bonnie Green", avatar: "/avatars/3.svg" },
  { name: "Leslie Livingston", avatar: "/avatars/4.svg" },
  { name: "Michael Gough", avatar: "/avatars/5.svg" },
  { name: "Joseph Mcfall", avatar: "/avatars/2.svg" },
  { name: "Roberta Casas", avatar: "/avatars/3.svg" },
  { name: "Neil Sims", avatar: "/avatars/1.svg" },
];

export default function DropdownScrolling() {
  return (
    <Dropdown>
      <DropdownTrigger>Dropdown button</DropdownTrigger>
      <DropdownMenu className="w-54 p-0">
        <DropdownGroup aria-label="Users" className="h-48 overflow-y-auto p-2">
          {users.map((user) => (
            <DropdownItem key={user.name} className="gap-2">
              <Avatar src={user.avatar} alt="" size="2xs" className="size-5" />
              {user.name}
            </DropdownItem>
          ))}
        </DropdownGroup>
        <div className="rounded-b-base border-default-medium border-t p-2">
          <DropdownItem className={cn(buttonVariants({ size: "xs", fullWidth: true }), "rounded")}>
            <UserPlus aria-hidden className="-ms-0.5 size-3.5" />
            Add new user
          </DropdownItem>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
}
