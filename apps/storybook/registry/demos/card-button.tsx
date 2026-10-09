import { ArrowRight } from "@stefan-florescu/icons";
import { buttonVariants, Card, CardDescription, CardTitle } from "@stefan-florescu/ui";

export default function CardButton() {
  return (
    <Card className="max-w-sm">
      <CardTitle>Noteworthy technology acquisitions 2021</CardTitle>
      <CardDescription className="mb-6">
        Here are the biggest technology acquisitions of 2025 so far, in reverse chronological order.
      </CardDescription>
      <a href="/components/card" className={buttonVariants()}>
        Read more
        <ArrowRight aria-hidden className="-me-0.5 rtl:rotate-180" />
      </a>
    </Card>
  );
}
