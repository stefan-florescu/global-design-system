import { Input, Label } from "@stefan-florescu/ui";

export default function InputFieldSizes() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="size-sm">Small</Label>
        <Input id="size-sm" size="sm" placeholder="Small input" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="size-md">Medium</Label>
        <Input id="size-md" size="md" placeholder="Medium input" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="size-lg">Large</Label>
        <Input id="size-lg" size="lg" placeholder="Large input" />
      </div>
    </div>
  );
}
