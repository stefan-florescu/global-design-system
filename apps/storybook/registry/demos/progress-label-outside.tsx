import { Progress } from "@stefan-florescu/ui";

export default function ProgressLabelOutside() {
  return (
    <Progress
      value={45}
      textLabel="Stefan DS"
      labelText
      textLabelPosition="outside"
      labelProgress
      progressLabelPosition="outside"
    />
  );
}
