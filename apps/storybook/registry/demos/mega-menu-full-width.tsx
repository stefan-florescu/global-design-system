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

export default function MegaMenuFullWidth() {
  return (
    <div className="bg-neutral-primary min-h-120 w-full">
      <Navbar border={false} className="bg-neutral-primary-soft">
        <NavbarBrand href="#full-width-dropdown" name="Stefan" />
        <NavbarToggle />
        <NavbarCollapse variant="flush">
          <NavbarLink href="#full-width-dropdown" active>
            Home
          </NavbarLink>
          <li>
            <MegaMenu>
              <MegaMenuTrigger>Company</MegaMenuTrigger>
              <MegaMenuContent fullWidth>
                <MegaMenuGroup>
                  <MegaMenuLink
                    href="#full-width-dropdown"
                    description="Connect with third-party tools that you're already using."
                  >
                    Online Stores
                  </MegaMenuLink>
                  <MegaMenuLink
                    href="#full-width-dropdown"
                    description="Connect with third-party tools that you're already using."
                  >
                    Segmentation
                  </MegaMenuLink>
                  <MegaMenuLink
                    href="#full-width-dropdown"
                    description="Connect with third-party tools that you're already using."
                  >
                    Marketing CRM
                  </MegaMenuLink>
                </MegaMenuGroup>
                <MegaMenuGroup>
                  <MegaMenuLink
                    href="#full-width-dropdown"
                    description="Connect with third-party tools that you're already using."
                  >
                    Online Stores
                  </MegaMenuLink>
                  <MegaMenuLink
                    href="#full-width-dropdown"
                    description="Connect with third-party tools that you're already using."
                  >
                    Segmentation
                  </MegaMenuLink>
                  <MegaMenuLink
                    href="#full-width-dropdown"
                    description="Connect with third-party tools that you're already using."
                  >
                    Marketing CRM
                  </MegaMenuLink>
                </MegaMenuGroup>
                <MegaMenuGroup className="hidden md:block">
                  <MegaMenuLink
                    href="#full-width-dropdown"
                    description="Connect with third-party tools that you're already using."
                  >
                    Audience Management
                  </MegaMenuLink>
                  <MegaMenuLink
                    href="#full-width-dropdown"
                    description="Connect with third-party tools that you're already using."
                  >
                    Creative Tools
                  </MegaMenuLink>
                  <MegaMenuLink
                    href="#full-width-dropdown"
                    description="Connect with third-party tools that you're already using."
                  >
                    Marketing Automation
                  </MegaMenuLink>
                </MegaMenuGroup>
              </MegaMenuContent>
            </MegaMenu>
          </li>
          <NavbarLink href="#full-width-dropdown">Marketplace</NavbarLink>
          <NavbarLink href="#full-width-dropdown">Resources</NavbarLink>
          <NavbarLink href="#full-width-dropdown">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
