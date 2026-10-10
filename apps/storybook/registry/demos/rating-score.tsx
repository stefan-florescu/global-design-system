import { useId } from "react";

import { Progress } from "@stefan-florescu/ui";

const columns = [
  [
    { name: "Staff", score: 8.8 },
    { name: "Comfort", score: 8.9 },
    { name: "Free WiFi", score: 8.8 },
    { name: "Facilities", score: 5.4 },
  ],
  [
    { name: "Value for money", score: 8.9 },
    { name: "Cleanliness", score: 7.0 },
    { name: "Location", score: 8.9 },
  ],
];

export default function RatingScore() {
  const id = useId();

  return (
    <div className="w-full">
      <div className="mb-5 flex items-center">
        <p className="bg-brand-softer text-fg-brand-strong rounded-base inline-flex items-center p-1.5 text-sm font-semibold">
          8.7
        </p>
        <p className="text-heading ms-2 font-medium">Excellent</p>
        <span aria-hidden className="bg-neutral-quaternary mx-2 size-1 rounded-full" />
        <p className="text-body text-sm font-medium">376 reviews</p>
        <a
          href="/components/rating"
          className="text-fg-brand focus-visible:outline-ring ms-auto rounded-xs text-sm font-medium no-underline outline-hidden hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
        >
          Read all reviews
        </a>
      </div>
      <div className="gap-8 sm:grid sm:grid-cols-2">
        {columns.map((column, columnIndex) => (
          <dl key={columnIndex}>
            {column.map(({ name, score }, index) => (
              <div key={name} className={index < column.length - 1 ? "mb-3" : undefined}>
                <dt id={`${id}-${columnIndex}-${index}`} className="text-body text-sm font-medium">
                  {name}
                </dt>
                <dd className="flex items-center">
                  <Progress
                    value={score}
                    max={10}
                    size="lg"
                    valueText={score.toFixed(1)}
                    aria-labelledby={`${id}-${columnIndex}-${index}`}
                    className="me-2"
                  />
                  <span aria-hidden className="text-body text-sm font-medium">
                    {score.toFixed(1)}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
    </div>
  );
}
