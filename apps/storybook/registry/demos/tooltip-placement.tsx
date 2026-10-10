import { Button, Tooltip, type TooltipPlacement } from "@stefan-florescu/ui";

const PLACEMENTS = [
  ["top", "Tooltip top", "Tooltip on top"],
  ["right", "Tooltip right", "Tooltip on right"],
  ["bottom", "Tooltip bottom", "Tooltip on bottom"],
  ["left", "Tooltip left", "Tooltip on left"],
] as const satisfies ReadonlyArray<readonly [TooltipPlacement, string, string]>;

export default function TooltipPlacementDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {PLACEMENTS.map(([placement, label, content]) => (
        <Tooltip key={placement} placement={placement} content={content}>
          <Button>{label}</Button>
        </Tooltip>
      ))}
    </div>
  );
}
