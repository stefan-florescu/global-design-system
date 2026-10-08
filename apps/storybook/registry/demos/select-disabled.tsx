import { Label, Select } from "@stefan-florescu/ui";

export default function SelectDisabled() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="country-disabled">Country</Label>
        <Select id="country-disabled" disabled defaultValue="">
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
