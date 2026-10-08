import { Card, CardDescription, CardTitle } from "@stefan-florescu/ui";

export default function CardDemo() {
  return (
    <Card href="/changelog" className="max-w-sm">
      <CardTitle>What&apos;s new in the design system</CardTitle>
      <CardDescription>
        Tokens, themes and components ship as one versioned system, so every product stays in step.
      </CardDescription>
    </Card>
  );
}
