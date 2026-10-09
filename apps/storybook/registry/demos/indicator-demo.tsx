import { Indicator } from "@stefan-florescu/ui";

export default function IndicatorDemo() {
  return (
    <div className="flex items-center justify-center">
      <Indicator variant="gray" className="me-3" />
      <Indicator variant="dark" className="me-3" />
      <Indicator variant="brand" className="me-3" />
      <Indicator variant="success" className="me-3" />
      <Indicator variant="danger" className="me-3" />
      <Indicator variant="warning" className="me-3" />
    </div>
  );
}
