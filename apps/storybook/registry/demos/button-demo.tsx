import { Button } from "@stefan-florescu/ui";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Button>Get started</Button>
      <Button variant="secondary">Learn more</Button>
    </div>
  );
}
