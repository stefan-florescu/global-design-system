import { useId } from "react";

import { Button, Clipboard, HelperText, Input, Label } from "@stefan-florescu/ui";

export default function ClipboardUrlShortener() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full max-w-sm">
      <Label htmlFor={`${id}-url-shortener`}>Shorten URL:</Label>
      <div className="rounded-base flex items-stretch shadow-xs">
        <Button className="border-brand rounded-e-none shadow-none">Generate</Button>
        <Input
          id={`${id}-url-shortener`}
          readOnly
          value="https://bit.ly/3U2SXcF"
          aria-describedby={`${id}-url-shortener-help`}
          className="text-body rounded-none border-x-0 shadow-none"
        />
        <Clipboard
          value="https://bit.ly/3U2SXcF"
          variant="secondary"
          iconOnly
          showTooltip
          label="Copy link"
          className="border-input rounded-s-none border-s-0 shadow-none"
        />
      </div>
      <HelperText id={`${id}-url-shortener-help`}>Make sure that your URL is valid</HelperText>
    </div>
  );
}
