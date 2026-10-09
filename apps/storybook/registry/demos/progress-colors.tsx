import { useId } from "react";

import { Progress, type ProgressProps } from "@stefan-florescu/ui";

const colors: { variant: ProgressProps["variant"]; label: string; text: string }[] = [
  { variant: "dark", label: "Dark", text: "text-heading" },
  { variant: "brand", label: "Brand", text: "text-fg-brand" },
  { variant: "success", label: "Success", text: "text-fg-success" },
  { variant: "danger", label: "Danger", text: "text-fg-danger" },
  { variant: "warning", label: "Warning", text: "text-fg-warning" },
];

export default function ProgressColors() {
  const id = useId();

  return (
    <div className="w-full space-y-4">
      {colors.map(({ variant, label, text }) => (
        <div key={label}>
          <div id={`${id}-${variant}`} className={`${text} mb-1 text-sm font-medium`}>
            {label}
          </div>
          <Progress value={45} variant={variant} aria-labelledby={`${id}-${variant}`} />
        </div>
      ))}
    </div>
  );
}
