import { Indicator } from "@stefan-florescu/ui";

const SERIES = [
  { variant: "brand", label: "Visitors" },
  { variant: "danger", label: "Sessions" },
  { variant: "success", label: "Customers" },
  { variant: "warning", label: "Revenue" },
] as const;

export default function IndicatorLegend() {
  return (
    <div className="flex items-center justify-center">
      {SERIES.map(({ variant, label }) => (
        <span key={label} className="text-heading me-3 flex items-center text-sm font-medium">
          <Indicator variant={variant} size="sm" className="me-1.5" />
          {label}
        </span>
      ))}
    </div>
  );
}
