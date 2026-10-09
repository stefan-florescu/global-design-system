import { ChevronDown } from "@stefan-florescu/icons";
import {
  Badge,
  ButtonGroup,
  buttonVariants,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@stefan-florescu/ui";

export default function ButtonGroupBadge() {
  return (
    <Dropdown>
      <ButtonGroup aria-label="Messages">
        {/* The label and count are text, not a second action: only the menu button is focusable,
            and its name carries them. */}
        <span
          aria-hidden
          className={cn(buttonVariants({ variant: "tertiary", size: "sm" }), "pointer-events-none")}
        >
          Messages
          <Badge variant="danger" bordered iconOnly className="ms-0.5 size-4.5">
            2
          </Badge>
        </span>
        <DropdownTrigger
          variant="tertiary"
          size="sm"
          chevron={false}
          aria-label="Messages, 2 unread"
          className="w-9 px-0"
        >
          <ChevronDown aria-hidden />
        </DropdownTrigger>
      </ButtonGroup>
      <DropdownMenu className="w-36">
        <DropdownItem className="rounded-md">Mark as read</DropdownItem>
        <DropdownItem className="rounded-md">Archive all</DropdownItem>
        <DropdownItem className="rounded-md">Delete all</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
