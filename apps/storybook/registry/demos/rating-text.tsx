import { Rating } from "@stefan-florescu/ui";

export default function RatingText() {
  return (
    <div className="flex items-center">
      {/* The text states the score, so the stars are hidden to avoid reading it twice. */}
      <Rating value={4.95} aria-hidden />
      <p className="text-body ms-2 text-sm font-medium">4.95 out of 5</p>
    </div>
  );
}
