import { ArrowRight } from "@stefan-florescu/icons";
import { Button, Card, CardDescription, CardTitle } from "@stefan-florescu/ui";

export default function CardImage() {
  return (
    <Card imgSrc="/images/landscape-1.svg" className="max-w-sm">
      <CardTitle>Mountain trails</CardTitle>
      <CardDescription>
        Twelve routes through the high passes, from easy morning walks to two-day climbs.
      </CardDescription>
      <Button className="self-start">
        Explore routes
        <ArrowRight aria-hidden />
      </Button>
    </Card>
  );
}
