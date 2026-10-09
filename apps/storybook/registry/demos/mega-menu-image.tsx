import { ArrowRight } from "@stefan-florescu/icons";
import {
  MegaMenu,
  MegaMenuContent,
  MegaMenuGroup,
  MegaMenuLink,
  MegaMenuTrigger,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "@stefan-florescu/ui";

export default function MegaMenuImage() {
  return (
    <div className="bg-neutral-primary min-h-96 w-full">
      <Navbar border={false} className="bg-neutral-primary-soft">
        <NavbarBrand href="#full-width-with-image" name="Stefan" />
        <NavbarToggle />
        <NavbarCollapse variant="flush">
          <NavbarLink href="#full-width-with-image" active>
            Home
          </NavbarLink>
          <li>
            <MegaMenu>
              <MegaMenuTrigger>Company</MegaMenuTrigger>
              <MegaMenuContent fullWidth>
                <MegaMenuGroup className="hidden space-y-4 md:block">
                  <MegaMenuLink href="#full-width-with-image">Online Stores</MegaMenuLink>
                  <MegaMenuLink href="#full-width-with-image">Segmentation</MegaMenuLink>
                  <MegaMenuLink href="#full-width-with-image">Marketing CRM</MegaMenuLink>
                  <MegaMenuLink href="#full-width-with-image">Online Stores</MegaMenuLink>
                </MegaMenuGroup>
                <MegaMenuGroup className="space-y-4">
                  <MegaMenuLink href="#full-width-with-image">Our Blog</MegaMenuLink>
                  <MegaMenuLink href="#full-width-with-image">Terms &amp; Conditions</MegaMenuLink>
                  <MegaMenuLink href="#full-width-with-image">License</MegaMenuLink>
                  <MegaMenuLink href="#full-width-with-image">Resources</MegaMenuLink>
                </MegaMenuGroup>
                <div
                  className="bg-dark rounded-lg bg-cover bg-local bg-center bg-no-repeat p-8 bg-blend-multiply"
                  style={{ backgroundImage: "url(/images/landscape-2.svg)" }}
                >
                  <p className="text-dark-foreground mb-5 max-w-xl leading-tight font-medium tracking-tight">
                    Preview the new Stefan dashboard navigation.
                  </p>
                  <a
                    href="#full-width-with-image"
                    className="border-dark-foreground text-dark-foreground hover:bg-dark-foreground hover:text-dark focus-visible:outline-dark-foreground inline-flex items-center rounded-lg border px-3 py-1.5 text-center text-xs font-medium outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
                  >
                    Get started
                    <ArrowRight aria-hidden className="ms-1.5 -me-0.5 size-4 rtl:rotate-180" />
                  </a>
                </div>
              </MegaMenuContent>
            </MegaMenu>
          </li>
          <NavbarLink href="#full-width-with-image">Marketplace</NavbarLink>
          <NavbarLink href="#full-width-with-image">Resources</NavbarLink>
          <NavbarLink href="#full-width-with-image">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
