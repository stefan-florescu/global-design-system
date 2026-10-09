import { Volume1, Volume2 } from "@stefan-florescu/icons";
import { Toggle } from "@stefan-florescu/ui";

export default function ToggleIcons() {
  return (
    <div className="inline-flex items-center">
      <Volume1 aria-hidden className="text-body size-5" />
      <Toggle aria-label="Loud sound" className="mx-3" />
      <Volume2 aria-hidden className="text-body size-5" />
    </div>
  );
}
