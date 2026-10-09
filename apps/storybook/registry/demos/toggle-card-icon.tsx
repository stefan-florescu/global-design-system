import { BookOpen } from "@stefan-florescu/icons";
import { Toggle } from "@stefan-florescu/ui";

export default function ToggleCardIcon() {
  return (
    <Toggle
      bordered
      className="w-full max-w-md"
      icon={<BookOpen />}
      aria-label="Knowledge base integration"
      description="Integrate your knowledge base and customer success seamlessy with your app."
    />
  );
}
