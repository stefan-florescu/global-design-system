import { Triangle } from "@stefan-florescu/icons";
import { Kbd } from "@stefan-florescu/ui";

export default function KbdArrows() {
  return (
    <div className="flex flex-wrap gap-1">
      <Kbd>
        <Triangle aria-hidden className="fill-current" />
        <span className="sr-only">Arrow key up</span>
      </Kbd>
      <Kbd>
        <Triangle aria-hidden className="rotate-180 fill-current" />
        <span className="sr-only">Arrow key down</span>
      </Kbd>
      <Kbd className="rtl:rotate-180">
        <Triangle aria-hidden className="-rotate-90 fill-current" />
        <span className="sr-only">Arrow key left</span>
      </Kbd>
      <Kbd className="rtl:rotate-180">
        <Triangle aria-hidden className="rotate-90 fill-current" />
        <span className="sr-only">Arrow key right</span>
      </Kbd>
    </div>
  );
}
