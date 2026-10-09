import { FileDropzone } from "@stefan-florescu/ui";

export default function FileInputDropzone() {
  return (
    <div className="flex w-full items-center justify-center">
      <FileDropzone description="SVG, PNG, JPG or GIF (MAX. 800x400px)" />
    </div>
  );
}
