import { Label, Select } from "@stefan-florescu/ui";

export default function SelectSize() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="country-list">Country</Label>
        <Select id="country-list" htmlSize={4}>
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
