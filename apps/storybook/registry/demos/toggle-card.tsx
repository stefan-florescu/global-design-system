import { Toggle } from "@stefan-florescu/ui";

export default function ToggleCard() {
  return (
    <Toggle
      bordered
      className="w-80"
      label="Weekly newsletter"
      description="Save my credentials for easier sign-in in the future."
    />
  );
}
