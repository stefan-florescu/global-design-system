import {
  Button,
  Popover,
  PopoverBody,
  PopoverHeader,
  PopoverTitle,
  type PopoverPlacement,
} from "@stefan-florescu/ui";

const PLACEMENTS = [
  ["top", "Top"],
  ["right", "Right"],
  ["bottom", "Bottom"],
  ["left", "Left"],
] as const satisfies ReadonlyArray<readonly [PopoverPlacement, string]>;

export default function PopoverPlacementDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {PLACEMENTS.map(([placement, label]) => (
        <Popover
          key={placement}
          placement={placement}
          content={
            <>
              <PopoverHeader>
                <PopoverTitle>Popover {placement}</PopoverTitle>
              </PopoverHeader>
              <PopoverBody>
                <p>And here&apos;s some amazing content. It&apos;s very engaging. Right?</p>
              </PopoverBody>
            </>
          }
        >
          <Button>{label} popover</Button>
        </Popover>
      ))}
    </div>
  );
}
