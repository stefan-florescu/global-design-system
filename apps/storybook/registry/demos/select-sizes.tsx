import { useId } from "react";

import { Label, Select, type SelectProps } from "@stefan-florescu/ui";

const sizes: { size: SelectProps["size"]; label: string }[] = [
  { size: "sm", label: "Small select" },
  { size: "md", label: "Default select" },
  { size: "lg", label: "Large select" },
  { size: "xl", label: "Extra Large select" },
];

export default function SelectSizes() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="w-full max-w-sm">
      {sizes.map(({ size, label }) => (
        <div key={size} className="mb-4">
          <Label htmlFor={`${id}-${size}`}>{label}</Label>
          <Select id={`${id}-${size}`} size={size} defaultValue="">
            <option value="">Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </Select>
        </div>
      ))}
    </form>
  );
}
