import { useId } from "react";

import { ArrowRight } from "@stefan-florescu/icons";
import { Radio } from "@stefan-florescu/ui";

export default function RadioAdvanced() {
  const id = useId();

  return (
    <div role="radiogroup" aria-labelledby={`${id}-heading`} className="w-full">
      <h3 id={`${id}-heading`} data-toc-skip className="text-heading mb-5 text-lg font-medium">
        How much do you expect to use each month?
      </h3>
      <ul className="grid w-full gap-6 md:grid-cols-2">
        <li>
          <Radio
            variant="card"
            name={`${id}-hosting`}
            value="hosting-small"
            label="0-50 MB"
            description="Good for small websites"
            endIcon={<ArrowRight />}
            required
          />
        </li>
        <li>
          <Radio
            variant="card"
            name={`${id}-hosting`}
            value="hosting-big"
            label="500-1000 MB"
            description="Good for large websites"
            endIcon={<ArrowRight />}
          />
        </li>
      </ul>
    </div>
  );
}
