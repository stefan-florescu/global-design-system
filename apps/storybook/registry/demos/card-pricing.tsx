import { CircleCheck } from "@stefan-florescu/icons";
import { Button, Card, CardTitle } from "@stefan-florescu/ui";

const features = [
  { name: "2 team members", included: true },
  { name: "20GB Cloud storage", included: true },
  { name: "Integration help", included: true },
  { name: "Sketch Files", included: false },
  { name: "API Access", included: false },
  { name: "Complete documentation", included: false },
  { name: "24×7 phone & email support", included: false },
];

export default function CardPricing() {
  return (
    <Card className="w-full max-w-sm">
      <CardTitle className="text-body mb-4 text-xl font-medium tracking-normal">
        Standard plan
      </CardTitle>
      <div className="text-heading flex items-baseline">
        <span className="text-5xl font-extrabold tracking-tight">$49</span>
        <span className="text-body ms-2 font-medium">/month</span>
      </div>
      <ul className="my-6 space-y-4">
        {features.map(({ name, included }) => (
          <li
            key={name}
            className={
              included ? "flex items-center" : "decoration-body flex items-center line-through"
            }
          >
            <CircleCheck aria-hidden className="text-fg-brand me-1.5 size-5 shrink-0" />
            <span className="text-body">
              {included ? null : <span className="sr-only">Not included: </span>}
              {name}
            </span>
          </li>
        ))}
      </ul>
      <Button fullWidth>Choose plan</Button>
    </Card>
  );
}
