"use client";

import { useId, useState } from "react";

import {
  Avatar,
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Indicator,
  Input,
  Label,
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  SearchInput,
  Select,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Textarea,
} from "@stefan-florescu/ui";

type Status = "online" | "offline" | "archived";
type User = {
  id: number;
  name: string;
  email: string;
  position: string;
  status: Status;
  avatar: string;
  biography: string;
};

const initialUsers: User[] = [
  {
    id: 1,
    name: "Neil Sims",
    email: "neil.sims@example.com",
    position: "React Developer",
    status: "online",
    avatar: "/avatars/1.svg",
    biography: "",
  },
  {
    id: 2,
    name: "Bonnie Green",
    email: "bonnie@example.com",
    position: "Designer",
    status: "online",
    avatar: "/avatars/3.svg",
    biography: "",
  },
  {
    id: 3,
    name: "Jese Leos",
    email: "jese@example.com",
    position: "Vue JS Developer",
    status: "online",
    avatar: "/avatars/2.svg",
    biography: "",
  },
  {
    id: 4,
    name: "Thomas Lean",
    email: "thomas@example.com",
    position: "UI/UX Engineer",
    status: "online",
    avatar: "/avatars/5.svg",
    biography: "",
  },
  {
    id: 5,
    name: "Leslie Livingston",
    email: "leslie@example.com",
    position: "SEO Specialist",
    status: "offline",
    avatar: "/avatars/4.svg",
    biography: "",
  },
];

const statusLabel = { online: "Online", offline: "Offline", archived: "Archived" };
const statusDot = { online: "success", offline: "danger", archived: "gray" } as const;

function UserForm({ user, onSave }: { user: User; onSave: (user: User) => void }) {
  const id = useId();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSave({
          ...user,
          name: String(data.get("name")),
          position: String(data.get("position")),
          status: data.get("status") as Status,
          biography: String(data.get("biography")),
        });
      }}
    >
      <div className="grid grid-cols-2 gap-4 py-4 md:py-6">
        <div className="col-span-2">
          <Label htmlFor={`${id}-name`}>Name</Label>
          <Input id={`${id}-name`} name="name" defaultValue={user.name} required />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor={`${id}-position`}>Position</Label>
          <Input id={`${id}-position`} name="position" defaultValue={user.position} required />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor={`${id}-status`}>Status</Label>
          <Select id={`${id}-status`} name="status" defaultValue={user.status}>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="archived">Archived</option>
          </Select>
        </div>
        <div className="col-span-2">
          <Label htmlFor={`${id}-biography`}>Biography</Label>
          <Textarea
            id={`${id}-biography`}
            name="biography"
            defaultValue={user.biography}
            placeholder="Write a short biography here"
          />
        </div>
      </div>
      <div className="border-default flex items-center gap-4 border-t pt-4 md:pt-6">
        <Button type="submit">Update user</Button>
        <ModalClose asChild>
          <Button variant="secondary">Cancel</Button>
        </ModalClose>
      </div>
    </form>
  );
}

export default function TableModal() {
  const id = useId();
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User>(initialUsers[0]!);

  const rows = users.filter((user) =>
    `${user.name} ${user.email} ${user.position}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  const all = rows.length > 0 && rows.every((user) => selected.has(user.id));
  const some = !all && rows.some((user) => selected.has(user.id));

  const toggle = (userId: number) =>
    setSelected((previous) => {
      const next = new Set(previous);
      if (!next.delete(userId)) next.add(userId);
      return next;
    });

  return (
    <>
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
                  rows.forEach((user) => (all ? next.delete(user.id) : next.add(user.id)));
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
            <TableRow key={user.id}>
              <TableCell className="w-4 p-4">
                <Checkbox
                  className="flex"
                  aria-label={`Select ${user.name}`}
                  checked={selected.has(user.id)}
                  onChange={() => toggle(user.id)}
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
                  <Indicator variant={statusDot[user.status]} size="sm" className="me-2" />
                  {statusLabel[user.status]}
                </div>
              </TableCell>
              <TableCell>
                {/* Opens the edit dialog; focus returns here when it closes. */}
                <button
                  type="button"
                  aria-haspopup="dialog"
                  className="text-fg-brand cursor-pointer font-medium whitespace-nowrap hover:underline"
                  onClick={() => {
                    setEditing(user);
                    setOpen(true);
                  }}
                >
                  Edit user<span className="sr-only"> {user.name}</span>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal size="md" open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit user</ModalTitle>
            <ModalClose label="Close modal" />
          </ModalHeader>
          <UserForm
            key={editing.id}
            user={editing}
            onSave={(user) => {
              setUsers((previous) => previous.map((item) => (item.id === user.id ? user : item)));
              setOpen(false);
            }}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
