import { useId } from "react";

import { Card, CardDescription, CardTitle, Clipboard, Input, Label } from "@stefan-florescu/ui";

export default function ClipboardCard() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <Card className="w-full max-w-md">
      <CardTitle className="text-lg">API keys</CardTitle>
      <CardDescription className="text-sm">
        Use this key to call the tokens API. Keep it secret.
      </CardDescription>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-api-key`}>Secret key</Label>
        <div className="flex items-center gap-2">
          <Input
            id={`${id}-api-key`}
            readOnly
            value="sk_test_51HfW9cK2x8rQ"
            className="font-mono"
          />
          <Clipboard
            value="sk_test_51HfW9cK2x8rQ"
            iconOnly
            variant="outline"
            label="Copy API key"
            copiedLabel="API key copied"
          />
        </div>
      </div>
    </Card>
  );
}
