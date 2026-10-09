import { useId } from "react";

import { Progress, Rating } from "@stefan-florescu/ui";

const breakdown = [
  { stars: 5, percent: 70 },
  { stars: 4, percent: 17 },
  { stars: 3, percent: 8 },
  { stars: 2, percent: 4 },
  { stars: 1, percent: 1 },
];

const link =
  "text-fg-brand focus-visible:outline-ring rounded-xs text-sm font-medium no-underline outline-hidden hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid";

export default function RatingAdvanced() {
  const id = useId();

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center">
        <Rating value={4.95} aria-hidden />
        <p className="text-body ms-2 text-sm font-medium">4.95 out of 5</p>
      </div>
      <p className="text-body text-sm font-medium">1,745 global ratings</p>
      {breakdown.map(({ stars, percent }) => (
        <div key={stars} className="mt-4 flex items-center">
          <a id={`${id}-${stars}`} href="/components/rating" className={`${link} w-14 shrink-0`}>
            {stars} star
          </a>
          <Progress
            value={percent}
            size="xl"
            variant="warning"
            aria-labelledby={`${id}-${stars}`}
            className="mx-4 w-2/4"
          />
          <span aria-hidden className="text-body text-sm font-medium">
            {percent}%
          </span>
        </div>
      ))}
    </div>
  );
}
