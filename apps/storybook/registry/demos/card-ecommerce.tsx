import { ShoppingCart, Star } from "@stefan-florescu/icons";
import { Badge, Button, Card, CardTitle } from "@stefan-florescu/ui";

export default function CardEcommerce() {
  return (
    <Card className="w-full max-w-sm">
      <img className="rounded-base mb-6 w-full" src="/images/landscape-3.svg" alt="" />
      <div className="mb-6 flex items-center space-x-3 rtl:space-x-reverse">
        <div
          role="img"
          aria-label="Rated 5 out of 5"
          className="flex items-center space-x-1 rtl:space-x-reverse"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} aria-hidden className="text-fg-yellow size-5 fill-current" />
          ))}
        </div>
        <Badge bordered>4.8 out of 5</Badge>
      </div>
      <CardTitle className="mb-0 text-xl">
        <a href="/components/card">Apple Watch Series 7 GPS, Aluminium Case, Starlight</a>
      </CardTitle>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-heading text-3xl font-extrabold">$599</span>
        <Button size="sm">
          <ShoppingCart aria-hidden />
          Add to cart
        </Button>
      </div>
    </Card>
  );
}
