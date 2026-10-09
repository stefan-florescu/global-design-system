import { Checkbox } from "@stefan-florescu/ui";

export default function CheckboxLink() {
  return (
    <Checkbox
      label={
        <>
          I agree with the{" "}
          <a href="#terms" className="text-fg-brand underline hover:no-underline">
            terms and conditions
          </a>
          .
        </>
      }
    />
  );
}
