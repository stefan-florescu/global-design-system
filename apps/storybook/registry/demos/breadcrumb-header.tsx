import { ChevronDown, GitBranch } from "@stefan-florescu/icons";
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@stefan-florescu/ui";

export default function BreadcrumbHeader() {
  return (
    <div className="justify-between md:flex">
      <Breadcrumb className="mb-3 sm:mb-0">
        <BreadcrumbItem href="/">flowbite.com</BreadcrumbItem>
        <BreadcrumbItem href="/components" className="space-x-2.5">
          develop
        </BreadcrumbItem>
        <BreadcrumbItem className="space-x-2.5">
          Issue #312
          <Badge bordered className="mx-2.5 rounded-sm">
            docs
          </Badge>
        </BreadcrumbItem>
      </Breadcrumb>
      <Dropdown>
        <DropdownTrigger
          variant="secondary"
          size="sm"
          chevron={false}
          aria-label="Branch: Fix #6597"
          className="[&_svg]:size-3.5"
        >
          <GitBranch aria-hidden />
          Fix #6597
          <ChevronDown aria-hidden />
        </DropdownTrigger>
        <DropdownMenu className="w-32">
          <DropdownItem className="rounded-md">New branch</DropdownItem>
          <DropdownItem className="rounded-md">Rename</DropdownItem>
          <DropdownItem className="rounded-md">Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
