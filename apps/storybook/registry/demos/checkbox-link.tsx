import { Checkbox } from "@stefan-florescu/ui";

export default function CheckboxLink() {
  return (
    <Checkbox
      label={
        <>
          I agree with the{" "}
          <a
            href="/changelog"
            className="text-brand-subtle-foreground underline hover:no-underline"
          >
            terms and conditions
          </a>
        </>
      }
    />
  );
}
