import { ArrowRight, Database } from "@stefan-florescu/icons";
import { Button, Popover, PopoverTitle, Progress } from "@stefan-florescu/ui";

export default function PopoverProgress() {
  return (
    <Popover
      trigger="hover"
      className="p-3"
      content={
        <>
          <div className="space-y-2.5">
            <PopoverTitle className="font-semibold">Available storage</PopoverTitle>
            <p>
              This server has <span className="text-heading font-semibold">30</span> of{" "}
              <span className="text-heading font-semibold">150 GB</span> of block storage remaining.
            </p>
            <Progress
              value={120}
              max={150}
              valueText="120 of 150 GB used"
              size="sm"
              variant="danger"
              aria-label="Storage used"
              className="mb-4"
            />
          </div>
          <a
            href="#upgrade"
            className="text-fg-brand flex items-center font-medium hover:underline"
          >
            Upgrade now
            <ArrowRight aria-hidden className="ms-1 size-4 rtl:rotate-180" />
          </a>
        </>
      }
    >
      <Button>
        <Database aria-hidden className="-ms-0.5" />
        Storage status
      </Button>
    </Popover>
  );
}
