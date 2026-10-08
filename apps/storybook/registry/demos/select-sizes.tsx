import { Label, Select } from "@stefan-florescu/ui";

export default function SelectSizes() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="select-sm">Small</Label>
        <Select id="select-sm" size="sm" defaultValue="">
          <option value="">Choose a country</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="fr">France</option>
          <option value="de">Germany</option>
          <option value="ro">Romania</option>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="select-md">Medium</Label>
        <Select id="select-md" size="md" defaultValue="">
          <option value="">Choose a country</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="fr">France</option>
          <option value="de">Germany</option>
          <option value="ro">Romania</option>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="select-lg">Large</Label>
        <Select id="select-lg" size="lg" defaultValue="">
          <option value="">Choose a country</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="fr">France</option>
          <option value="de">Germany</option>
          <option value="ro">Romania</option>
        </Select>
      </div>
    </div>
  );
}
