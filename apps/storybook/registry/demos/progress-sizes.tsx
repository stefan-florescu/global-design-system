import { useId } from "react";

import { Progress } from "@stefan-florescu/ui";

export default function ProgressSizes() {
  const id = useId();

  return (
    <div className="w-full space-y-4">
      <div id={`${id}-sm`} className="text-heading mb-1 text-sm font-medium">
        Small
      </div>
      <Progress value={45} size="sm" aria-labelledby={`${id}-sm`} />
      <div id={`${id}-md`} className="text-heading mb-1 text-sm font-medium">
        Default
      </div>
      <Progress value={45} aria-labelledby={`${id}-md`} />
      <div id={`${id}-lg`} className="text-heading mb-1 text-base font-medium">
        Large
      </div>
      <Progress value={45} size="lg" aria-labelledby={`${id}-lg`} />
    </div>
  );
}
