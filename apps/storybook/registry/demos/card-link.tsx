import { Gift, SquareArrowOutUpRight } from "@stefan-florescu/icons";
import { Card, CardDescription, CardTitle } from "@stefan-florescu/ui";

export default function CardLink() {
  return (
    <Card className="max-w-sm">
      <Gift aria-hidden className="text-body mb-3 size-7" />
      <CardTitle className="mb-2">
        <a href="/components/card">Need a help in Claim?</a>
      </CardTitle>
      <CardDescription className="mb-3">
        Go to this step by step guideline process on how to certify for your weekly benefits:
      </CardDescription>
      <a
        href="/components/card"
        className="text-fg-brand focus-visible:outline-ring inline-flex items-center rounded-xs font-medium outline-hidden hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
      >
        See our guideline
        <SquareArrowOutUpRight aria-hidden className="ms-2 size-4" />
      </a>
    </Card>
  );
}
