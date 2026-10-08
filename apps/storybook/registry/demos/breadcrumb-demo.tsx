import { House } from "@stefan-florescu/icons";
import { Breadcrumb, BreadcrumbItem } from "@stefan-florescu/ui";

export default function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbItem href="/components" icon={<House aria-hidden />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/components">Components</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  );
}
