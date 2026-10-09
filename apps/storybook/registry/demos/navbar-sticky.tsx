import { Layers } from "@stefan-florescu/icons";
import {
  Button,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  SkeletonLine,
} from "@stefan-florescu/ui";

const paragraphs = Array.from({ length: 8 }, (_, index) => index);

export default function NavbarSticky() {
  return (
    // The frame stands in for the browser window: scroll it and the navbar stays at the top.
    <div className="bg-neutral-primary h-96 w-full overflow-y-auto">
      <Navbar position="sticky">
        <NavbarBrand href="#sticky-navbar" name="Stefan DS" logo={<Layers aria-hidden />} />
        <NavbarActions>
          <Button size="sm">Get started</Button>
          <NavbarToggle />
        </NavbarActions>
        <NavbarCollapse>
          <NavbarLink href="#sticky-navbar" active>
            Home
          </NavbarLink>
          <NavbarLink href="#sticky-navbar">About</NavbarLink>
          <NavbarLink href="#sticky-navbar">Services</NavbarLink>
          <NavbarLink href="#sticky-navbar">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
      {/* Stand-in page text: nothing is loading, so the lines go without a Skeleton status. */}
      <div aria-hidden className="mx-auto max-w-screen-xl space-y-8 p-4">
        {paragraphs.map((paragraph) => (
          <div key={paragraph} className="space-y-3">
            <SkeletonLine className="w-48" />
            <SkeletonLine size="sm" className="max-w-xl" />
            <SkeletonLine size="sm" />
            <SkeletonLine size="sm" className="max-w-lg" />
            <SkeletonLine size="sm" className="max-w-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
