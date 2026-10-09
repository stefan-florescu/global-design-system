import { Button } from "@stefan-florescu/ui";

export default function ButtonPill() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button pill>Default</Button>
      <Button pill variant="secondary">
        Secondary
      </Button>
      <Button pill variant="tertiary">
        Tertiary
      </Button>
      <Button pill variant="success">
        Success
      </Button>
      <Button pill variant="danger">
        Danger
      </Button>
      <Button pill variant="warning">
        Warning
      </Button>
      <Button pill variant="dark">
        Dark
      </Button>
      <Button pill variant="ghost">
        Ghost
      </Button>
    </div>
  );
}
