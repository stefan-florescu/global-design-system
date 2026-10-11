import { Ellipsis, Heart, Link, Shapes, ThumbsUp } from "@stefan-florescu/icons";
import {
  Avatar,
  AvatarGroup,
  AvatarGroupCounter,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverTitle,
} from "@stefan-florescu/ui";

/* Light buttons: a white fill with a stronger border on hover. */
const secondary =
  "bg-neutral-primary-medium hover:bg-neutral-secondary-strong hover:border-default-strong";

export default function PopoverCompanyProfile() {
  return (
    <Popover
      trigger="hover"
      className="w-80"
      content={
        <div className="p-3">
          <div className="flex">
            <div className="me-3 shrink-0">
              <a
                href="#stefan-ds"
                aria-label="Stefan DS"
                className="bg-neutral-tertiary flex size-10 items-center justify-center rounded p-2"
              >
                <Shapes aria-hidden className="text-fg-brand size-6" />
              </a>
            </div>
            <div>
              <PopoverTitle className="text-base font-semibold">
                <a href="#stefan-ds" className="hover:underline">
                  Stefan DS
                </a>
              </PopoverTitle>
              <p className="mb-3 text-sm font-normal">Tech company</p>
              <p className="mb-3 text-sm">
                Breaking news alerts and the most talked about stories.
              </p>
              <ul className="text-sm">
                <li className="mb-2 flex items-center">
                  <Link aria-hidden className="text-body me-2 size-4 shrink-0" />
                  <a href="#website" className="text-fg-brand font-medium hover:underline">
                    https://example.com/
                  </a>
                </li>
                <li className="mb-2 flex items-start">
                  <Heart aria-hidden className="text-body me-2 size-4 shrink-0" />
                  <span className="-mt-1">
                    102,567,936 people like this including 5 of your friends
                  </span>
                </li>
              </ul>
              <AvatarGroup className="mb-4 -space-x-3">
                <Avatar src="/avatars/5.svg" alt="" size="sm" stacked />
                <Avatar src="/avatars/2.svg" alt="" size="sm" stacked />
                <Avatar src="/avatars/3.svg" alt="" size="sm" stacked />
                <AvatarGroupCounter
                  href="#friends"
                  aria-label="3 more friends"
                  className="border-buffer-medium bg-neutral-tertiary text-heading hover:bg-neutral-quaternary size-8"
                >
                  +3
                </AvatarGroupCounter>
              </AvatarGroup>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className={`w-full shrink ${secondary}`}>
                  <ThumbsUp aria-hidden className="-ms-0.5" />
                  Like page
                </Button>
                <Dropdown placement="right">
                  <DropdownTrigger
                    variant="secondary"
                    size="sm"
                    iconOnly
                    chevron={false}
                    aria-label="More actions"
                    className={`size-9 shrink-0 ${secondary}`}
                  >
                    <Ellipsis aria-hidden className="size-4" />
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>Report this page</DropdownItem>
                    <DropdownItem>Add to favorites</DropdownItem>
                    <DropdownItem>Block this page</DropdownItem>
                    <DropdownItem>Invite users</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <Button>Company profile</Button>
    </Popover>
  );
}
