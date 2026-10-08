import { CircleCheck, CircleX } from "@stefan-florescu/icons";
import { Button, Card, CardTitle } from "@stefan-florescu/ui";

export default function CardPricing() {
  return (
    <Card className="w-full max-w-sm">
      <CardTitle className="text-muted-foreground text-xl font-medium">Standard plan</CardTitle>
      <p className="m-0 flex items-baseline gap-1">
        <span className="text-5xl font-extrabold tracking-tight">$49</span>
        <span className="text-muted-foreground">/month</span>
      </p>
      <ul className="m-0 my-4 flex list-none flex-col gap-4 p-0">
        <li className="flex items-center gap-3">
          <CircleCheck aria-hidden className="text-success-subtle-foreground size-5 shrink-0" />2
          team members
        </li>
        <li className="flex items-center gap-3">
          <CircleCheck aria-hidden className="text-success-subtle-foreground size-5 shrink-0" />
          20 GB cloud storage
        </li>
        <li className="flex items-center gap-3">
          <CircleCheck aria-hidden className="text-success-subtle-foreground size-5 shrink-0" />
          Integration help
        </li>
        <li className="text-muted-foreground flex items-center gap-3 line-through">
          <CircleX aria-hidden className="size-5 shrink-0" />
          <span className="sr-only">Not included: </span>Sketch files
        </li>
        <li className="text-muted-foreground flex items-center gap-3 line-through">
          <CircleX aria-hidden className="size-5 shrink-0" />
          <span className="sr-only">Not included: </span>API access
        </li>
        <li className="text-muted-foreground flex items-center gap-3 line-through">
          <CircleX aria-hidden className="size-5 shrink-0" />
          <span className="sr-only">Not included: </span>Complete documentation
        </li>
      </ul>
      <Button fullWidth>Choose plan</Button>
    </Card>
  );
}
