import { ArrowRight } from "@stefan-florescu/icons";
import { Button, Card, CardDescription, CardTitle } from "@stefan-florescu/ui";

export default function CardCta() {
  return (
    <Card className="max-w-sm">
      <CardTitle>What&apos;s new in the design system</CardTitle>
      <CardDescription>
        Tokens, themes and components ship as one versioned system, so every product stays in step.
      </CardDescription>
      <Button className="self-start">
        Read more
        <ArrowRight aria-hidden />
      </Button>
    </Card>
  );
}
