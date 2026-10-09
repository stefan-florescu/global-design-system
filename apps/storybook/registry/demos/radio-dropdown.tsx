import {
  Dropdown,
  DropdownMenu,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownTrigger,
} from "@stefan-florescu/ui";

const options = [
  { value: "individual", label: "Individual" },
  { value: "company", label: "Company" },
  { value: "non-profit", label: "Non profit" },
];

export default function RadioDropdown() {
  return (
    <Dropdown>
      <DropdownTrigger>Dropdown button</DropdownTrigger>
      <DropdownMenu className="w-56">
        {/* Menu radio items: arrow keys move between them, Enter or Space chooses one. */}
        <DropdownRadioGroup aria-label="Account type">
          {options.map((option) => (
            <DropdownRadioItem
              key={option.value}
              value={option.value}
              description="Some helpful instruction goes over here."
            >
              {option.label}
            </DropdownRadioItem>
          ))}
        </DropdownRadioGroup>
      </DropdownMenu>
    </Dropdown>
  );
}
