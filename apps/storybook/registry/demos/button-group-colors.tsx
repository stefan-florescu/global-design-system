import { ChevronLeft, ChevronRight } from "@stefan-florescu/icons";
import { Button, ButtonGroup } from "@stefan-florescu/ui";

export default function ButtonGroupColors() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <ButtonGroup aria-label="Default pager">
        <Button variant="tertiary" size="sm" iconOnly aria-label="Previous">
          <ChevronLeft aria-hidden className="rtl:rotate-180" />
        </Button>
        <Button variant="tertiary" size="sm" iconOnly aria-label="Next">
          <ChevronRight aria-hidden className="rtl:rotate-180" />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Brand pager">
        <Button variant="brand" size="sm" iconOnly aria-label="Previous">
          <ChevronLeft aria-hidden className="rtl:rotate-180" />
        </Button>
        <Button variant="brand" size="sm" iconOnly aria-label="Next">
          <ChevronRight aria-hidden className="rtl:rotate-180" />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Secondary pager">
        <Button variant="secondary" size="sm" iconOnly aria-label="Previous">
          <ChevronLeft aria-hidden className="rtl:rotate-180" />
        </Button>
        <Button variant="secondary" size="sm" iconOnly aria-label="Next">
          <ChevronRight aria-hidden className="rtl:rotate-180" />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Danger pager">
        <Button variant="danger" size="sm" iconOnly aria-label="Previous">
          <ChevronLeft aria-hidden className="rtl:rotate-180" />
        </Button>
        <Button variant="danger" size="sm" iconOnly aria-label="Next">
          <ChevronRight aria-hidden className="rtl:rotate-180" />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Success pager">
        <Button variant="success" size="sm" iconOnly aria-label="Previous">
          <ChevronLeft aria-hidden className="rtl:rotate-180" />
        </Button>
        <Button variant="success" size="sm" iconOnly aria-label="Next">
          <ChevronRight aria-hidden className="rtl:rotate-180" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
