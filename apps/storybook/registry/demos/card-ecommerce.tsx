import { Star } from "@stefan-florescu/icons";
import { Badge, Button, Card, CardTitle } from "@stefan-florescu/ui";

export default function CardEcommerce() {
  const rating = 4;

  return (
    <Card imgSrc="/images/landscape-4.svg" imgAlt="" className="max-w-sm">
      <CardTitle className="text-xl font-semibold">
        Trail backpack, 30 L, waterproof, with rain cover
      </CardTitle>
      <div className="flex items-center gap-2">
        <div role="img" aria-label={`Rated ${rating} out of 5`} className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              aria-hidden
              className={
                star <= rating ? "fill-warning text-warning size-4" : "text-muted-foreground size-4"
              }
            />
          ))}
        </div>
        <Badge>{rating}.0</Badge>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-3xl font-bold">$129</span>
        <Button>Add to cart</Button>
      </div>
    </Card>
  );
}
