import { Spinner } from "@stefan-florescu/ui";

export default function SpinnerSizes() {
  return (
    <div className="flex items-center gap-2">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  );
}
