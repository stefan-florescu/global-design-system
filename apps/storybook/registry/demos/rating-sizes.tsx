import { Rating } from "@stefan-florescu/ui";

export default function RatingSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Rating value={4} size="sm" />
      <Rating value={4} size="md" />
      <Rating value={4} size="lg" />
    </div>
  );
}
