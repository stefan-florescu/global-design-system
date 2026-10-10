import { Spinner } from "@stefan-florescu/ui";

export default function IndicatorSpinner() {
  return (
    <div className="flex justify-center">
      <div className="bg-neutral-secondary-soft border-default rounded-base flex size-56 items-center justify-center border">
        <Spinner />
      </div>
    </div>
  );
}
