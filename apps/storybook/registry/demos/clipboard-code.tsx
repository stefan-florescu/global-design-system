import { Clipboard } from "@stefan-florescu/ui";

const code = `import {
  Button,
  Card,
  CardDescription,
  CardTitle,
} from "@stefan-florescu/ui";

export function Component() {
  return (
    <Card className="max-w-sm p-6">
      <CardTitle>Noteworthy technology acquisitions 2021</CardTitle>
      <CardDescription>
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </CardDescription>
      <Button className="self-start">Read more</Button>
    </Card>
  );
}
`;

export default function ClipboardCode() {
  return (
    <div className="w-full max-w-lg">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-heading mb-2.5 block text-sm font-medium">
          Card example with CTA button:
        </p>
      </div>
      <div className="bg-neutral-secondary-medium border-default-medium rounded-base relative h-64 border p-4">
        {/* Browsers make this scroll container keyboard-focusable, with the outline below. */}
        <div className="focus-visible:outline-ring max-h-full overflow-scroll outline-hidden focus-visible:outline-2 focus-visible:outline-solid">
          <pre className="m-0">
            <code className="text-body text-sm whitespace-pre">{code}</code>
          </pre>
        </div>
        <div className="absolute end-2 top-2">
          <Clipboard value={code} variant="tertiary" label="Copy" copiedLabel="Copied" />
        </div>
      </div>
      <p className="text-body mt-2.5 text-sm">
        Configure Tailwind CSS and the design system before copying the code
      </p>
    </div>
  );
}
