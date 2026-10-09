import {
  Dropdown,
  DropdownMenu,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownTrigger,
} from "@stefan-florescu/ui";

// Flowbite's plain list: no padding or hover fill on the rows, 12px between them.
const plainItem = "p-0 hover:bg-transparent focus-visible:bg-transparent";

export default function DropdownRadio() {
  return (
    <Dropdown>
      <DropdownTrigger>Dropdown radio</DropdownTrigger>
      <DropdownMenu className="p-3">
        <DropdownRadioGroup defaultValue="checked" className="space-y-3">
          <DropdownRadioItem value="default" className={plainItem}>
            Default radio
          </DropdownRadioItem>
          <DropdownRadioItem value="checked" className={plainItem}>
            Checked radio
          </DropdownRadioItem>
          <DropdownRadioItem value="other" className={plainItem}>
            Default radio
          </DropdownRadioItem>
        </DropdownRadioGroup>
      </DropdownMenu>
    </Dropdown>
  );
}
