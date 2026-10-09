import {
  Dropdown,
  DropdownMenu,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownTrigger,
} from "@stefan-florescu/ui";

export default function DropdownRadioHelper() {
  return (
    <Dropdown>
      <DropdownTrigger>Dropdown button</DropdownTrigger>
      <DropdownMenu className="w-56">
        <DropdownRadioGroup aria-label="Account type">
          <DropdownRadioItem
            value="individual"
            description="Some helpful instruction goes over here."
          >
            Individual
          </DropdownRadioItem>
          <DropdownRadioItem value="company" description="Some helpful instruction goes over here.">
            Company
          </DropdownRadioItem>
          <DropdownRadioItem
            value="non-profit"
            description="Some helpful instruction goes over here."
          >
            Non profit
          </DropdownRadioItem>
        </DropdownRadioGroup>
      </DropdownMenu>
    </Dropdown>
  );
}
