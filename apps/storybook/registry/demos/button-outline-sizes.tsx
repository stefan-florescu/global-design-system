import { Button } from "@stefan-florescu/ui";

export default function ButtonOutlineSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button outline size="xs">
        Extra small
      </Button>
      <Button outline size="sm">
        Small
      </Button>
      <Button outline size="md">
        Base
      </Button>
      <Button outline size="lg">
        Large
      </Button>
      <Button outline size="xl">
        Extra large
      </Button>
    </div>
  );
}
