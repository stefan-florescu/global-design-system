import { Card, CardDescription, CardTitle, Spinner } from "@stefan-florescu/ui";

export default function SpinnerCard() {
  return (
    <Card aria-busy="true" className="relative max-w-sm">
      <CardTitle className="mb-2 text-xl opacity-20">
        Noteworthy technology acquisitions 2021
      </CardTitle>
      <CardDescription className="opacity-20">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
        chronological order.
      </CardDescription>
      <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </Card>
  );
}
