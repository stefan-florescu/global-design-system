import { ChevronRight } from "@stefan-florescu/icons";

import { Button } from "@/registry/placeholder/button";

export default function ButtonIcon() {
  return (
    <Button variant="outline" size="icon" aria-label="Next page">
      <ChevronRight aria-hidden />
    </Button>
  );
}
