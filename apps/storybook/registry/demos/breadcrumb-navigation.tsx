import { ChevronLeft, ChevronRight, House } from "@stefan-florescu/icons";
import { Breadcrumb, BreadcrumbItem, Button, ButtonGroup } from "@stefan-florescu/ui";

export default function BreadcrumbNavigation() {
  return (
    <div className="flex items-center">
      <ButtonGroup aria-label="History" className="me-2.5">
        <Button variant="secondary" size="xs" iconOnly aria-label="Back">
          <ChevronLeft aria-hidden className="rtl:rotate-180" />
        </Button>
        <Button variant="secondary" size="xs" iconOnly aria-label="Forward">
          <ChevronRight aria-hidden className="rtl:rotate-180" />
        </Button>
      </ButtonGroup>
      <Breadcrumb>
        <BreadcrumbItem href="/" icon={<House aria-hidden />}>
          Home
        </BreadcrumbItem>
        <BreadcrumbItem href="/components">Projects</BreadcrumbItem>
        <BreadcrumbItem>Stefan DS</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
}
