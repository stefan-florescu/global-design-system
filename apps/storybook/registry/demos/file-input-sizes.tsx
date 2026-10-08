import { FileInput, Label } from "@stefan-florescu/ui";

export default function FileInputSizes() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="file-sm">Small</Label>
        <FileInput id="file-sm" size="sm" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="file-md">Medium</Label>
        <FileInput id="file-md" size="md" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="file-lg">Large</Label>
        <FileInput id="file-lg" size="lg" />
      </div>
    </div>
  );
}
