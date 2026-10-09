import { Download, Ellipsis, FileText } from "@stefan-florescu/icons";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@stefan-florescu/ui";

export default function ButtonGroupDropdown() {
  return (
    <Dropdown>
      <ButtonGroup aria-label="Files">
        <Button variant="tertiary" size="sm">
          <FileText aria-hidden />
          My files
        </Button>
        <Button variant="tertiary" size="sm">
          <Download aria-hidden />
          Download
        </Button>
        <DropdownTrigger variant="tertiary" size="sm" chevron={false} aria-label="More options">
          <Ellipsis aria-hidden />
        </DropdownTrigger>
      </ButtonGroup>
      {/* The menu sits outside the group, so the group's corner styles only reach the buttons. */}
      <DropdownMenu className="w-40">
        <DropdownItem className="rounded-md">Save as PDF</DropdownItem>
        <DropdownItem className="rounded-md">Save as doc</DropdownItem>
        <DropdownItem className="rounded-md">Save as image</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
