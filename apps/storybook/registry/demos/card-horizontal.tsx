import { Card, CardDescription, CardTitle } from "@stefan-florescu/ui";

export default function CardHorizontal() {
  return (
    <Card href="/changelog" horizontal imgSrc="/images/landscape-3.svg" className="max-w-xl">
      <CardTitle>What&apos;s new in the design system</CardTitle>
      <CardDescription>
        Tokens, themes and components ship as one versioned system, so every product stays in step.
      </CardDescription>
    </Card>
  );
}
