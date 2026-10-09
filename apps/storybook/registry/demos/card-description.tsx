import { ArrowRight } from "@stefan-florescu/icons";
import { buttonVariants, Card, CardDescription, CardTitle } from "@stefan-florescu/ui";

export default function CardWithDescription() {
  return (
    <Card className="max-w-sm">
      <img className="rounded-base w-full" src="/images/landscape-2.svg" alt="" />
      <CardTitle className="mt-6 mb-2">
        <a href="/components/card">Streamlining your design process today.</a>
      </CardTitle>
      <CardDescription className="mb-6">
        In today&apos;s fast-paced digital landscape, fostering seamless collaboration among
        Developers and IT Operations.
      </CardDescription>
      <a href="/components/card" className={buttonVariants({ variant: "secondary" })}>
        Read more
        <ArrowRight aria-hidden className="-me-0.5 rtl:rotate-180" />
      </a>
    </Card>
  );
}
