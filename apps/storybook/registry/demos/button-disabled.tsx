import { Button } from "@stefan-florescu/ui";

export default function ButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline">
        Disabled
      </Button>
    </div>
  );
}
