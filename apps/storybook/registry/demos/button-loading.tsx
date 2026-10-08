import { LoaderCircle } from "@stefan-florescu/icons";

import { Button } from "@/registry/placeholder/button";

export default function ButtonLoading() {
  return (
    <Button disabled aria-busy="true">
      <LoaderCircle aria-hidden className="animate-spin motion-reduce:animate-none" />
      Please wait
    </Button>
  );
}
