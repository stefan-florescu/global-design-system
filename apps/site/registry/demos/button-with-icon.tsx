import { Mail } from "@stefan-florescu/icons";

import { Button } from "@/registry/placeholder/button";

export default function ButtonWithIcon() {
  return (
    <Button>
      <Mail aria-hidden /> Login with Email
    </Button>
  );
}
