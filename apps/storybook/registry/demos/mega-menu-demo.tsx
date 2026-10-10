import {
  buttonVariants,
  MegaMenu,
  MegaMenuContent,
  MegaMenuGroup,
  MegaMenuLink,
  MegaMenuTrigger,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "@stefan-florescu/ui";

export default function MegaMenuDemo() {
  return (
    <div className="bg-neutral-primary min-h-72 w-full">
      <Navbar border={false}>
        <NavbarBrand href="#default-mega-menu" name="Stefan" />
        <NavbarActions className="gap-1 md:gap-2">
          <a href="#default-mega-menu" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Login
          </a>
          <a href="#default-mega-menu" className={buttonVariants({ size: "sm" })}>
            Sign Up
          </a>
          <NavbarToggle />
        </NavbarActions>
        <NavbarCollapse variant="flush">
          <NavbarLink href="#default-mega-menu" active>
            Home
          </NavbarLink>
          <li>
            <MegaMenu>
              <MegaMenuTrigger>Company</MegaMenuTrigger>
              <MegaMenuContent>
                <MegaMenuGroup>
                  <MegaMenuLink href="#default-mega-menu">About Us</MegaMenuLink>
                  <MegaMenuLink href="#default-mega-menu">Library</MegaMenuLink>
                  <MegaMenuLink href="#default-mega-menu">Resources</MegaMenuLink>
                  <MegaMenuLink href="#default-mega-menu">Pro Version</MegaMenuLink>
                </MegaMenuGroup>
                <MegaMenuGroup>
                  <MegaMenuLink href="#default-mega-menu">Blog</MegaMenuLink>
                  <MegaMenuLink href="#default-mega-menu">Newsletter</MegaMenuLink>
                  <MegaMenuLink href="#default-mega-menu">Playground</MegaMenuLink>
                  <MegaMenuLink href="#default-mega-menu">License</MegaMenuLink>
                </MegaMenuGroup>
                <MegaMenuGroup>
                  <MegaMenuLink href="#default-mega-menu">Contact Us</MegaMenuLink>
                  <MegaMenuLink href="#default-mega-menu">Support Center</MegaMenuLink>
                  <MegaMenuLink href="#default-mega-menu">Terms</MegaMenuLink>
                </MegaMenuGroup>
              </MegaMenuContent>
            </MegaMenu>
          </li>
          <NavbarLink href="#default-mega-menu">Team</NavbarLink>
          <NavbarLink href="#default-mega-menu">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
