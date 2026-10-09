import { ArrowRight, Flame } from "@stefan-florescu/icons";
import { Badge, buttonVariants, Card, CardTitle } from "@stefan-florescu/ui";

export default function CardImage() {
  return (
    <Card imgSrc="/images/landscape-1.svg" className="max-w-sm text-center">
      <Badge bordered>
        <Flame aria-hidden />
        Trending
      </Badge>
      <CardTitle className="mt-3 mb-6">
        <a href="/components/card">Streamlining your design process today.</a>
      </CardTitle>
      <a href="/components/card" className={buttonVariants()}>
        Read more
        <ArrowRight aria-hidden className="-me-0.5 rtl:rotate-180" />
      </a>
    </Card>
  );
}
