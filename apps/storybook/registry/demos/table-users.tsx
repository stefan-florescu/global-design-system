"use client";

import { useId, useState } from "react";

import {
  Avatar,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Indicator,
  Label,
  SearchInput,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@stefan-florescu/ui";

const users = [
  {
    name: "Neil Sims",
    email: "neil.sims@example.com",
    position: "React Developer",
    online: true,
    avatar: "/avatars/1.svg",
  },
  {
    name: "Bonnie Green",
    email: "bonnie@example.com",
    position: "Designer",
    online: true,
    avatar: "/avatars/3.svg",
  },
  {
    name: "Jese Leos",
    email: "jese@example.com",
    position: "Vue JS Developer",
    online: true,
    avatar: "/avatars/2.svg",
  },
  {
    name: "Thomas Lean",
    email: "thomas@example.com",
    position: "UI/UX Engineer",
    online: true,
    avatar: "/avatars/5.svg",
  },
  {
    name: "Leslie Livingston",
    email: "leslie@example.com",
    position: "SEO Specialist",
    online: false,
    avatar: "/avatars/4.svg",
  },
];

export default function TableUsers() {
  const id = useId();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const rows = users.filter((user) =>
    `${user.name} ${user.email} ${user.position}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  const all = rows.length > 0 && rows.every((user) => selected.has(user.email));
  const some = !all && rows.some((user) => selected.has(user.email));

  const toggle = (email: string) =>
    setSelected((previous) => {
      const next = new Set(previous);
      if (!next.delete(email)) next.add(email);
      return next;
    });

  return (
    <Table
      hoverable
      toolbar={
        <>
          <Dropdown>
            <DropdownTrigger variant="secondary" size="sm">
              Action
            </DropdownTrigger>
            <DropdownMenu className="w-32">
              <DropdownItem>Reward</DropdownItem>
              <DropdownItem>Promote</DropdownItem>
              <DropdownItem>Archive</DropdownItem>
              <DropdownItem variant="danger">Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <form role="search" onSubmit={(event) => event.preventDefault()}>
            <Label htmlFor={`${id}-search`} className="sr-only">
              Search for users
            </Label>
            <SearchInput
              id={`${id}-search`}
              size="sm"
              placeholder="Search for users"
              className="max-w-96"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
          <p role="status" className="sr-only">
            {rows.length} {rows.length === 1 ? "user" : "users"}
          </p>
        </>
      }
    >
      <TableCaption visuallyHidden>Users</TableCaption>
      <TableHead>
        <TableHeadCell className="p-4">
          <Checkbox
            aria-label="Select all users"
            checked={all}
            indeterminate={some}
            onChange={() =>
              setSelected((previous) => {
                const next = new Set(previous);
                rows.forEach((user) => (all ? next.delete(user.email) : next.add(user.email)));
                return next;
              })
            }
            className="flex"
          />
        </TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Position</TableHeadCell>
        <TableHeadCell>Status</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
      </TableHead>
      <TableBody>
        {rows.map((user) => (
          <TableRow key={user.email}>
            <TableCell className="w-4 p-4">
              <Checkbox
                className="flex"
                aria-label={`Select ${user.name}`}
                checked={selected.has(user.email)}
                onChange={() => toggle(user.email)}
              />
            </TableCell>
            <TableHeadCell scope="row">
              <div className="flex items-center">
                <Avatar src={user.avatar} alt="" />
                <div className="ps-3">
                  <div className="text-base font-semibold">{user.name}</div>
                  <div className="text-body font-normal">{user.email}</div>
                </div>
              </div>
            </TableHeadCell>
            <TableCell>{user.position}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Indicator
                  variant={user.online ? "success" : "danger"}
                  size="sm"
                  className="me-2"
                />
                {user.online ? "Online" : "Offline"}
              </div>
            </TableCell>
            <TableCell>
              <a
                href="#edit-user"
                className="text-fg-brand font-medium whitespace-nowrap hover:underline"
              >
                Edit user<span className="sr-only"> {user.name}</span>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
