"use client";

import { Trash2 } from "@stefan-florescu/icons";
import {
  Avatar,
  Button,
  Checkbox,
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@stefan-florescu/ui";
import { useId } from "react";

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

export default function DropdownScrollableCheckboxes() {
  const id = useId();
  return (
    <Dropdown>
      <DropdownTrigger>Dropdown button</DropdownTrigger>
      {/* A form (choose users, then act on them), so a dialog that Tab moves through. */}
      <DropdownContent role="dialog" aria-label="Users" className="w-54 p-0">
        <ul className="h-48 overflow-y-auto p-2">
          {users.map((user, index) => (
            <li
              key={user.name}
              className="hover:bg-neutral-tertiary-medium hover:text-heading flex w-full items-center rounded p-2"
            >
              <label
                htmlFor={`${id}-${index}`}
                className="flex w-full items-center justify-between"
              >
                <span className="inline-flex items-center gap-2 font-medium">
                  <Avatar src={user.avatar} alt="" size="2xs" className="size-5" />
                  {user.name}
                </span>
                <Checkbox id={`${id}-${index}`} />
              </label>
            </li>
          ))}
        </ul>
        <div className="rounded-b-base border-default-medium border-t p-2">
          <Button variant="danger" size="xs" fullWidth className="rounded">
            <Trash2 aria-hidden className="-ms-0.5 size-3.5" />
            Delete user
          </Button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
