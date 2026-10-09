import { House } from "@stefan-florescu/icons";
import { Breadcrumb, BreadcrumbItem } from "@stefan-florescu/ui";

export default function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbItem href="/" icon={<House aria-hidden />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/components">Projects</BreadcrumbItem>
      <BreadcrumbItem>Flowbite</BreadcrumbItem>
    </Breadcrumb>
  );
}
