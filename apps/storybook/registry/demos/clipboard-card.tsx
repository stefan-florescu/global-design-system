import { useId } from "react";

import { Button, Card, Clipboard, Input, Label } from "@stefan-florescu/ui";

const fields = [
  { key: "account-id", label: "Flowbite account ID:", value: "756593826" },
  { key: "api-key", label: "API key:", value: "f4h6sd3t-jsy63ind-hsgdt7rs-jdhf76st" },
  { key: "role-arn", label: "Role ARN:", value: "123456789012:user/Flowbite" },
];

export default function ClipboardCard() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <Card className="w-full max-w-lg">
      <h2 className="text-heading mb-2 text-lg font-semibold">
        Create a role with read only in-line policies
      </h2>
      <p className="text-body mb-6">
        To give Flowbite read access, please create an IAM Role following{" "}
        <a href="#trust" className="text-fg-brand font-medium underline hover:no-underline">
          trust relationship
        </a>{" "}
        and{" "}
        <a href="#policy" className="text-fg-brand font-medium underline hover:no-underline">
          inline policy
        </a>
        .
      </p>
      {fields.map((field, index) => (
        <div key={field.key}>
          <Label htmlFor={`${id}-${field.key}`}>{field.label}</Label>
          <div className={index === fields.length - 1 ? "relative mb-6" : "relative mb-4"}>
            <Input id={`${id}-${field.key}`} className="text-body" readOnly value={field.value} />
            <Clipboard
              value={field.value}
              variant="ghost"
              iconOnly
              showTooltip
              label={`Copy ${field.label.replace(":", "")}`}
              copiedLabel="Copied!"
              className="absolute end-1.5 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-4">
        <Button variant="secondary">Cancel</Button>
        <Button>Next step</Button>
      </div>
    </Card>
  );
}
