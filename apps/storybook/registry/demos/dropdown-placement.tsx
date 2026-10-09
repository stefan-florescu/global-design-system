import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  type DropdownPlacement,
} from "@stefan-florescu/ui";

const placements: { placement: DropdownPlacement; label: string }[] = [
  { placement: "top", label: "Dropdown top" },
  { placement: "right", label: "Dropdown right" },
  { placement: "bottom", label: "Dropdown bottom" },
  { placement: "left", label: "Dropdown left" },
];

export default function DropdownPlacementDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {placements.map(({ placement, label }) => (
        <Dropdown key={placement} placement={placement}>
          <DropdownTrigger>{label}</DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Earnings</DropdownItem>
            <DropdownItem>Sign out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ))}
    </div>
  );
}
