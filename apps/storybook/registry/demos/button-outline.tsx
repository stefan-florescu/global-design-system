import { Button } from "@stefan-florescu/ui";

export default function ButtonOutline() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Button outline>Brand</Button>
      <Button outline variant="secondary">
        Gray
      </Button>
      <Button outline variant="success">
        Success
      </Button>
      <Button outline variant="danger">
        Danger
      </Button>
      <Button outline variant="warning">
        Warning
      </Button>
    </div>
  );
}
