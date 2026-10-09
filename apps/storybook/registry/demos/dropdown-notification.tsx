import {
  Bell,
  Eye,
  Heart,
  Inbox,
  MessageSquareText,
  UserPlus,
  Video,
  type LucideIcon,
} from "@stefan-florescu/icons";
import {
  Avatar,
  Dropdown,
  DropdownGroup,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@stefan-florescu/ui";
import type { ReactNode } from "react";

// Flowbite's notification rows: full-width, no rounding, a lighter hover fill.
const rowClassName =
  "items-start gap-0 rounded-none px-4 py-3 hover:bg-neutral-secondary-medium hover:text-body focus-visible:bg-neutral-secondary-medium focus-visible:text-body";

const notifications: {
  avatar: string;
  icon: LucideIcon;
  badge: string;
  time: string;
  text: ReactNode;
}[] = [
  {
    avatar: "/avatars/1.svg",
    icon: Inbox,
    badge: "bg-brand text-brand-foreground",
    time: "a few moments ago",
    text: (
      <>
        New message from <span className="text-heading font-semibold">Jese Leos</span>: &quot;Hey,
        what&apos;s up? All set for the presentation?&quot;
      </>
    ),
  },
  {
    avatar: "/avatars/2.svg",
    icon: UserPlus,
    badge: "bg-dark text-dark-foreground",
    time: "10 minutes ago",
    text: (
      <>
        <span className="text-heading font-semibold">Joseph Mcfall</span> and{" "}
        <span className="text-heading font-medium">5 others</span> started following you.
      </>
    ),
  },
  {
    avatar: "/avatars/3.svg",
    icon: Heart,
    badge: "bg-danger text-danger-foreground",
    time: "44 minutes ago",
    text: (
      <>
        <span className="text-heading font-semibold">Bonnie Green</span> and{" "}
        <span className="text-heading font-medium">141 others</span> love your story. See it and
        view more stories.
      </>
    ),
  },
  {
    avatar: "/avatars/4.svg",
    icon: MessageSquareText,
    badge: "bg-success text-success-foreground",
    time: "1 hour ago",
    text: (
      <>
        <span className="text-heading font-semibold">Leslie Livingston</span> mentioned you in a
        comment: <span className="text-fg-brand font-medium">@bonnie.green</span> what do you say?
      </>
    ),
  },
  {
    avatar: "/avatars/5.svg",
    icon: Video,
    badge: "bg-warning text-warning-foreground",
    time: "3 hours ago",
    text: (
      <>
        <span className="text-heading font-semibold">Robert Brown</span> posted a new video:
        Glassmorphism - learn how to implement the new design trend.
      </>
    ),
  },
];

export default function DropdownNotification() {
  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button
          type="button"
          aria-label="Notifications, new"
          className="rounded-base text-body hover:text-heading focus-visible:outline-ring relative inline-flex cursor-pointer items-center outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
        >
          <Bell aria-hidden className="size-6" />
          <span
            aria-hidden
            className="border-buffer bg-danger absolute start-3 top-0 block size-3 rounded-full border-2"
          />
        </button>
      </DropdownTrigger>
      <DropdownMenu className="divide-default-medium bg-neutral-primary-soft w-full max-w-sm divide-y border-0 p-0 text-base font-normal shadow-sm">
        <DropdownHeader className="rounded-t-base bg-neutral-secondary-medium text-body mb-0 block rounded-b-none px-4 py-2 text-center font-medium">
          Notifications
        </DropdownHeader>
        <DropdownGroup className="divide-default divide-y">
          {notifications.map(({ avatar, icon: Icon, badge, time, text }) => (
            <DropdownItem key={time} className={rowClassName}>
              <span className="relative shrink-0">
                <Avatar src={avatar} alt="" size="lg" />
                <span
                  className={`border-buffer-medium absolute end-0 bottom-0 flex size-5 items-center justify-center rounded-full border ${badge}`}
                >
                  <Icon aria-hidden className="size-3" />
                </span>
              </span>
              <span className="block w-full ps-3">
                <span className="text-body mb-1.5 block text-sm">{text}</span>
                <span className="text-fg-brand block text-xs">{time}</span>
              </span>
            </DropdownItem>
          ))}
        </DropdownGroup>
        <DropdownItem className="rounded-b-base bg-neutral-secondary-medium text-body hover:bg-neutral-tertiary-medium hover:text-body focus-visible:bg-neutral-tertiary-medium focus-visible:text-body block rounded-t-none py-2 text-center font-medium">
          <span className="inline-flex items-center gap-1.5">
            <Eye aria-hidden className="size-5" />
            View all
          </span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
