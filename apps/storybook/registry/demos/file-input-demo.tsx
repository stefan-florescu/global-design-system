import { FileInput, Label } from "@stefan-florescu/ui";

export default function FileInputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="upload">Upload file</Label>
        <FileInput id="upload" />
      </div>
    </div>
  );
}
