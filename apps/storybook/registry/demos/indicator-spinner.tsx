import { LoaderCircle } from "@stefan-florescu/icons";

export default function IndicatorSpinner() {
  return (
    <div className="flex justify-center">
      <div className="bg-neutral-secondary-soft border-default rounded-base flex size-56 items-center justify-center border">
        <div role="status">
          <LoaderCircle
            aria-hidden
            className="text-brand size-8 animate-spin motion-reduce:animate-none"
          />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
