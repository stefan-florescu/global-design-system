import { Rating } from "@stefan-florescu/ui";

export default function RatingCount() {
  return (
    <div className="flex items-center">
      <Rating value={1} max={1} aria-hidden />
      <p className="text-heading ms-2 text-sm font-bold">
        4.95<span className="sr-only"> out of 5</span>
      </p>
      <span aria-hidden className="bg-neutral-quaternary mx-1.5 size-1 rounded-full" />
      <a
        href="/components/rating"
        className="text-heading focus-visible:outline-ring rounded-xs text-sm font-medium underline outline-hidden hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
      >
        73 reviews
      </a>
    </div>
  );
}
