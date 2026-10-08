import { Button } from "@stefan-florescu/ui";

export default function ButtonPill() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button pill>Brand</Button>
      <Button pill variant="primary">
        Primary
      </Button>
      <Button pill variant="secondary">
        Secondary
      </Button>
      <Button pill variant="outline">
        Outline
      </Button>
      <Button pill variant="success">
        Success
      </Button>
      <Button pill variant="warning">
        Warning
      </Button>
      <Button pill variant="destructive">
        Destructive
      </Button>
      <Button pill variant="info">
        Info
      </Button>
    </div>
  );
}
