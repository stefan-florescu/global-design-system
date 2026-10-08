import { Button, Card, CardTitle, Checkbox, Input, Label } from "@stefan-florescu/ui";

export default function CardForm() {
  return (
    <Card className="w-full max-w-sm">
      <form className="grid gap-5">
        <CardTitle className="text-xl">Sign in to our platform</CardTitle>
        <div className="grid gap-2">
          <Label htmlFor="card-email">Your email</Label>
          <Input
            id="card-email"
            type="email"
            autoComplete="email"
            placeholder="ana@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="card-password">Your password</Label>
          <Input id="card-password" type="password" autoComplete="current-password" required />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Checkbox label="Remember me" />
          <a
            href="/forms/input-field"
            className="text-brand-subtle-foreground text-sm hover:underline"
          >
            Lost password?
          </a>
        </div>
        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </form>
    </Card>
  );
}
