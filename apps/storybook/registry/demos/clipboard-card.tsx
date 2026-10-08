import { Card, CardDescription, CardTitle, Clipboard } from "@stefan-florescu/ui";

export default function ClipboardCard() {
  return (
    <Card className="w-full max-w-md">
      <CardTitle className="text-lg">API keys</CardTitle>
      <CardDescription className="text-sm">
        Use this key to call the tokens API. Keep it secret.
      </CardDescription>
      <div className="flex items-center gap-2">
        <span
          id="api-key"
          className="border-border bg-muted min-w-0 flex-1 truncate rounded-lg border px-3 py-2 font-mono text-sm"
        >
          sk_test_51HfW9cK2x8rQ
        </span>
        <Clipboard
          value="sk_test_51HfW9cK2x8rQ"
          iconOnly
          variant="outline"
          label="Copy API key"
          copiedLabel="API key copied"
        />
      </div>
    </Card>
  );
}
