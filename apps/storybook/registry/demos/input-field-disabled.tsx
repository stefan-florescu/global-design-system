import { Input } from "@stefan-florescu/ui";

export default function InputFieldDisabled() {
  return (
    <div className="w-full space-y-6">
      <Input aria-label="Disabled input" defaultValue="Disabled input" disabled />
      <Input
        aria-label="Disabled readonly input"
        defaultValue="Disabled readonly input"
        disabled
        readOnly
      />
    </div>
  );
}
