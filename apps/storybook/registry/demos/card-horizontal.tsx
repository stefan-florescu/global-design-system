import { ArrowRight } from "@stefan-florescu/icons";
import { Button, Card, CardDescription, CardTitle } from "@stefan-florescu/ui";

export default function CardHorizontal() {
  return (
    <Card horizontal imgSrc="/images/landscape-4.svg" className="md:max-w-xl">
      <CardTitle className="mb-2 font-bold">Streamlining your design process today.</CardTitle>
      <CardDescription className="mb-6">
        In today&apos;s fast-paced digital landscape, fostering seamless collaboration among
        Developers and IT Operations.
      </CardDescription>
      <div>
        <Button variant="secondary">
          Read more
          <ArrowRight aria-hidden className="-me-0.5 rtl:rotate-180" />
        </Button>
      </div>
    </Card>
  );
}
