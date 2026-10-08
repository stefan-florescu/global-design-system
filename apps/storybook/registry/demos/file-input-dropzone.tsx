import { FileDropzone } from "@stefan-florescu/ui";

export default function FileInputDropzone() {
  return (
    <FileDropzone
      className="max-w-lg"
      accept="image/*"
      multiple
      description="SVG, PNG, JPG or GIF (max. 800×400px)"
    />
  );
}
