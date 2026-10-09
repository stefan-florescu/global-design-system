import { ChevronDown, Database, House } from "@stefan-florescu/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@stefan-florescu/ui";

export default function BreadcrumbButton() {
  return (
    <div className="flex">
      <Breadcrumb>
        <BreadcrumbItem href="/" icon={<House aria-hidden />}>
          Home
        </BreadcrumbItem>
        <BreadcrumbItem href="/components">Projects</BreadcrumbItem>
        <BreadcrumbItem>Database</BreadcrumbItem>
      </Breadcrumb>
      <Dropdown>
        <DropdownTrigger
          variant="secondary"
          size="sm"
          chevron={false}
          className="ms-2.5 [&_svg]:size-3.5"
        >
          <Database aria-hidden />
          Flowbite
          <ChevronDown aria-hidden />
        </DropdownTrigger>
        <DropdownMenu className="w-32">
          <DropdownItem className="rounded-md">Themesberg</DropdownItem>
          <DropdownItem className="rounded-md">Flowbite AI</DropdownItem>
          <DropdownItem className="rounded-md">Flowbite</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
