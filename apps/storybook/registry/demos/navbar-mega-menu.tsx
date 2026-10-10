import { Layers } from "@stefan-florescu/icons";
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

const description = "Connect with third-party tools that you're already using.";

export default function NavbarMegaMenu() {
  return (
    <div className="min-h-96 w-full">
      <Navbar>
        <NavbarBrand href="#mega-menu-navbar" name="Stefan DS" logo={<Layers aria-hidden />} />
        <NavbarToggle />
        <NavbarCollapse variant="flush">
          <NavbarLink href="#mega-menu-navbar" active>
            Home
          </NavbarLink>
          <li>
            <MegaMenu>
              <MegaMenuTrigger>Company</MegaMenuTrigger>
              <MegaMenuContent fullWidth>
                <MegaMenuGroup>
                  <MegaMenuLink href="#mega-menu-navbar" description={description}>
                    Online Stores
                  </MegaMenuLink>
                  <MegaMenuLink href="#mega-menu-navbar" description={description}>
                    Segmentation
                  </MegaMenuLink>
                  <MegaMenuLink href="#mega-menu-navbar" description={description}>
                    Marketing CRM
                  </MegaMenuLink>
                </MegaMenuGroup>
                <MegaMenuGroup>
                  <MegaMenuLink href="#mega-menu-navbar" description={description}>
                    Online Stores
                  </MegaMenuLink>
                  <MegaMenuLink href="#mega-menu-navbar" description={description}>
                    Segmentation
                  </MegaMenuLink>
                  <MegaMenuLink href="#mega-menu-navbar" description={description}>
                    Marketing CRM
                  </MegaMenuLink>
                </MegaMenuGroup>
                <MegaMenuGroup className="hidden md:block">
                  <MegaMenuLink href="#mega-menu-navbar" description={description}>
                    Audience Management
                  </MegaMenuLink>
                  <MegaMenuLink href="#mega-menu-navbar" description={description}>
                    Creative Tools
                  </MegaMenuLink>
                  <MegaMenuLink href="#mega-menu-navbar" description={description}>
                    Marketing Automation
                  </MegaMenuLink>
                </MegaMenuGroup>
              </MegaMenuContent>
            </MegaMenu>
          </li>
          <NavbarLink href="#mega-menu-navbar">Marketplace</NavbarLink>
          <NavbarLink href="#mega-menu-navbar">Resources</NavbarLink>
          <NavbarLink href="#mega-menu-navbar">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
