import { Ellipsis, UserPlus } from "@stefan-florescu/icons";
import {
  Avatar,
  Button,
  Card,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@stefan-florescu/ui";

export default function CardProfile() {
  return (
    <Card className="relative w-full max-w-xs">
      <Dropdown>
        <DropdownTrigger asChild>
          <button
            type="button"
            aria-label="Actions for Bonnie Green"
            className="text-body hover:text-heading bg-neutral-primary-soft hover:bg-neutral-tertiary focus:ring-neutral-tertiary rounded-base focus-visible:outline-ring absolute end-2 top-2 box-border cursor-pointer border border-transparent p-1.5 outline-hidden focus:ring-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
          >
            <Ellipsis aria-hidden className="size-6" />
          </button>
        </DropdownTrigger>
        <DropdownMenu className="w-36">
          <DropdownItem className="rounded-md">Edit</DropdownItem>
          <DropdownItem className="rounded-md">Export Data</DropdownItem>
          <DropdownItem variant="danger" className="rounded-md">
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div className="flex flex-col items-center">
        <Avatar src="/avatars/3.svg" alt="" className="mb-6 size-24" />
        <CardTitle className="mb-0.5 text-xl">Bonnie Green</CardTitle>
        <span className="text-body text-sm">Visual Designer</span>
        <div className="mt-4 flex gap-4 md:mt-6">
          <Button>
            <UserPlus aria-hidden className="-ms-0.5" />
            Follow me
          </Button>
          <Button variant="secondary">Message</Button>
        </div>
      </div>
    </Card>
  );
}
