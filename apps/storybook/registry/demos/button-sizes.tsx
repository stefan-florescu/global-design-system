import { Plus } from "@stefan-florescu/icons";

import { Button } from "@/registry/placeholder/button";

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add item">
        <Plus aria-hidden />
      </Button>
    </div>
  );
}
