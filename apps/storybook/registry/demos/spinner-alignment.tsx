import { Spinner } from "@stefan-florescu/ui";

export default function SpinnerAlignment() {
  return (
    <div className="w-full">
      <Spinner className="text-start" />
      <Spinner className="text-center" />
      <Spinner className="text-end" />
    </div>
  );
}
