import {
  BookOpen,
  CircleQuestionMark,
  FileText,
  FolderOpen,
  Info,
  Mailbox,
  Phone,
  Rocket,
  Scale,
  ScrollText,
  Shapes,
} from "@stefan-florescu/icons";
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

export default function MegaMenuIcons() {
  return (
    <div className="bg-neutral-primary min-h-72 w-full">
      <Navbar border={false}>
        <NavbarBrand href="#mega-menu-with-icons" name="Stefan" />
        <NavbarActions className="gap-1 md:gap-2">
          <a
            href="#mega-menu-with-icons"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Login
          </a>
          <a href="#mega-menu-with-icons" className={buttonVariants({ size: "sm" })}>
            Sign Up
          </a>
          <NavbarToggle />
        </NavbarActions>
        <NavbarCollapse variant="flush">
          <NavbarLink href="#mega-menu-with-icons" active>
            Home
          </NavbarLink>
          <li>
            <MegaMenu>
              <MegaMenuTrigger>Company</MegaMenuTrigger>
              <MegaMenuContent>
                <MegaMenuGroup className="font-normal">
                  <MegaMenuLink href="#mega-menu-with-icons">
                    <Info aria-hidden />
                    About Us
                  </MegaMenuLink>
                  <MegaMenuLink href="#mega-menu-with-icons">
                    <BookOpen aria-hidden />
                    Library
                  </MegaMenuLink>
                  <MegaMenuLink href="#mega-menu-with-icons">
                    <FolderOpen aria-hidden />
                    Resources
                  </MegaMenuLink>
                  <MegaMenuLink href="#mega-menu-with-icons">
                    <Rocket aria-hidden />
                    Pro Version
                  </MegaMenuLink>
                </MegaMenuGroup>
                <MegaMenuGroup className="font-normal">
                  <MegaMenuLink href="#mega-menu-with-icons">
                    <FileText aria-hidden />
                    Blog
                  </MegaMenuLink>
                  <MegaMenuLink href="#mega-menu-with-icons">
                    <Mailbox aria-hidden />
                    Newsletter
                  </MegaMenuLink>
                  <MegaMenuLink href="#mega-menu-with-icons">
                    <Shapes aria-hidden />
                    Playground
                  </MegaMenuLink>
                  <MegaMenuLink href="#mega-menu-with-icons">
                    <Scale aria-hidden />
                    License
                  </MegaMenuLink>
                </MegaMenuGroup>
                <MegaMenuGroup className="font-normal">
                  <MegaMenuLink href="#mega-menu-with-icons">
                    <Phone aria-hidden />
                    Contact Us
                  </MegaMenuLink>
                  <MegaMenuLink href="#mega-menu-with-icons">
                    <CircleQuestionMark aria-hidden />
                    Support Center
                  </MegaMenuLink>
                  <MegaMenuLink href="#mega-menu-with-icons">
                    <ScrollText aria-hidden />
                    Terms
                  </MegaMenuLink>
                </MegaMenuGroup>
              </MegaMenuContent>
            </MegaMenu>
          </li>
          <NavbarLink href="#mega-menu-with-icons">Team</NavbarLink>
          <NavbarLink href="#mega-menu-with-icons">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
