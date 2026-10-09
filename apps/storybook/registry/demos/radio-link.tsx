import { Radio } from "@stefan-florescu/ui";

export default function RadioLink() {
  return (
    <Radio
      label={
        <>
          Radio button with a{" "}
          <a href="#link" className="text-fg-brand font-medium underline hover:no-underline">
            link inside
          </a>
          .
        </>
      }
    />
  );
}
