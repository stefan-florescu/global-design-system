import {
  Dropdown,
  DropdownMenu,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownTrigger,
} from "@stefan-florescu/ui";

export default function DropdownRadioHover() {
  return (
    <Dropdown>
      <DropdownTrigger>Dropdown button</DropdownTrigger>
      <DropdownMenu>
        <DropdownRadioGroup defaultValue="checked">
          <DropdownRadioItem value="default">Default radio</DropdownRadioItem>
          <DropdownRadioItem value="checked">Checked radio</DropdownRadioItem>
          <DropdownRadioItem value="other">Default radio</DropdownRadioItem>
        </DropdownRadioGroup>
      </DropdownMenu>
    </Dropdown>
  );
}
