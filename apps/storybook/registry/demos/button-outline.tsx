import { Button } from "@stefan-florescu/ui";

export default function ButtonOutline() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button outline>Brand</Button>
      <Button outline variant="primary">
        Primary
      </Button>
      <Button outline variant="success">
        Success
      </Button>
      <Button outline variant="warning">
        Warning
      </Button>
      <Button outline variant="destructive">
        Destructive
      </Button>
      <Button outline variant="info">
        Info
      </Button>
    </div>
  );
}
