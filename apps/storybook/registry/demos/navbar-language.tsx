import { Globe, Layers } from "@stefan-florescu/icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "@stefan-florescu/ui";

const languages = [
  { lang: "en-US", name: "English (US)" },
  { lang: "de", name: "Deutsch" },
  { lang: "it", name: "Italiano" },
  { lang: "zh-Hant", name: "中文 (繁體)" },
];

export default function NavbarLanguage() {
  return (
    <div className="min-h-80 w-full">
      <Navbar>
        <NavbarBrand href="#language-dropdown" name="Stefan DS" logo={<Layers aria-hidden />} />
        <NavbarActions className="gap-1">
          <Dropdown>
            <DropdownTrigger variant="ghost" size="sm" chevron={false}>
              <Globe aria-hidden />
              English (US)
            </DropdownTrigger>
            <DropdownMenu aria-label="Language">
              {languages.map(({ lang, name }) => (
                <DropdownItem key={lang} href="#language-dropdown" lang={lang}>
                  {name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <NavbarToggle />
        </NavbarActions>
        <NavbarCollapse>
          <NavbarLink href="#language-dropdown" active>
            Home
          </NavbarLink>
          <NavbarLink href="#language-dropdown">About</NavbarLink>
          <NavbarLink href="#language-dropdown">Services</NavbarLink>
          <NavbarLink href="#language-dropdown">Pricing</NavbarLink>
          <NavbarLink href="#language-dropdown">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
