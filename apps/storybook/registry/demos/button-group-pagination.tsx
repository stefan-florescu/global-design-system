import { ChevronLeft, ChevronRight } from "@stefan-florescu/icons";
import { Button, ButtonGroup, buttonVariants, cn, Tooltip } from "@stefan-florescu/ui";

const pages = [1, 2, 3, 4, 5];

export default function ButtonGroupPagination() {
  return (
    <div className="flex flex-col items-center gap-8">
      <ButtonGroup aria-label="Pagination">
        <Button variant="tertiary" size="sm" iconOnly aria-label="Previous page">
          <ChevronLeft aria-hidden className="rtl:rotate-180" />
        </Button>
        {pages.map((page) => (
          <Button key={page} variant="tertiary" size="sm" iconOnly aria-label={`Page ${page}`}>
            {page}
          </Button>
        ))}
        <span
          aria-hidden
          className={cn(
            buttonVariants({ variant: "tertiary", size: "sm", iconOnly: true }),
            "pointer-events-none",
          )}
        >
          ...
        </span>
        <Button variant="tertiary" size="sm" iconOnly aria-label="Page 99">
          99
        </Button>
        <Button variant="tertiary" size="sm" iconOnly aria-label="Next page">
          <ChevronRight aria-hidden className="rtl:rotate-180" />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Previous and next">
        <Tooltip content="Previous" mode="label" className="leading-4">
          <Button variant="tertiary" size="sm" iconOnly>
            <ChevronLeft aria-hidden className="rtl:rotate-180" />
          </Button>
        </Tooltip>
        <Tooltip content="Next" mode="label" className="leading-4">
          <Button variant="tertiary" size="sm" iconOnly>
            <ChevronRight aria-hidden className="rtl:rotate-180" />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
}
