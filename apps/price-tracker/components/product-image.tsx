import { Package } from "@stefan-florescu/icons";
import { cn } from "@stefan-florescu/ui";

/** The product photo, or a package icon until the page's image is read. */
export function ProductImage({
  src,
  alt = "",
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-base bg-neutral-secondary-medium text-body-subtle flex shrink-0 items-center justify-center overflow-hidden",
        className,
      )}
    >
      {src ? (
        // Store images come from other sites; this static export has no image optimiser.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="size-full object-contain" />
      ) : (
        <Package aria-hidden className="size-1/2" />
      )}
    </div>
  );
}
