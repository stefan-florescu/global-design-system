import { Button } from "@stefan-florescu/ui";

export default function ButtonLoading() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button loading>Loading...</Button>
      <Button loading variant="tertiary">
        Loading...
      </Button>
    </div>
  );
}
