import { Button } from "@stefan-florescu/ui";

export default function ButtonFullWidth() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button fullWidth>Create account</Button>
      <Button fullWidth variant="outline">
        Sign in
      </Button>
    </div>
  );
}
