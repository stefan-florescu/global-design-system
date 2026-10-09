import { ChevronDown, Database, GitBranch } from "@stefan-florescu/icons";
import {
  Breadcrumb,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@stefan-florescu/ui";

export default function BreadcrumbDropdown() {
  return (
    <Breadcrumb className="mb-3 sm:mb-0">
      <li className="flex items-center">
        <Dropdown>
          <DropdownTrigger variant="ghost" size="sm" chevron={false} className="[&_svg]:size-3.5">
            <GitBranch aria-hidden />
            flowbite.com
            <ChevronDown aria-hidden />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem className="rounded-md">themesberg.com</DropdownItem>
            <DropdownItem className="rounded-md">ui.glass</DropdownItem>
            <DropdownItem className="rounded-md">iconscale</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </li>
      <li className="flex items-center">
        <span aria-hidden className="text-body-subtle ms-1 me-2 md:ms-0">
          /
        </span>
        <Dropdown>
          <DropdownTrigger
            variant="ghost"
            size="sm"
            chevron={false}
            aria-current="page"
            className="[&_svg]:size-3.5"
          >
            <Database aria-hidden />
            databaseName
            <ChevronDown aria-hidden />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem className="rounded-md">databaseProd</DropdownItem>
            <DropdownItem className="rounded-md">databaseStaging</DropdownItem>
            <DropdownItem className="rounded-md">flowbiteProd</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </li>
    </Breadcrumb>
  );
}
