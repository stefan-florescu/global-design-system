import { Card, CardDescription, CardTitle } from "@stefan-florescu/ui";

export default function CardDemo() {
  return (
    <Card href="/components/card" className="max-w-sm">
      <CardTitle>Noteworthy technology acquisitions 2021</CardTitle>
      <CardDescription>
        Here are the biggest technology acquisitions of 2025 so far, in reverse chronological order.
      </CardDescription>
    </Card>
  );
}
