import { ChevronDown } from "@stefan-florescu/icons";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@stefan-florescu/ui";

const linkClassName =
  "block rounded-xs text-body outline-hidden hover:text-fg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid";

export default function DropdownNavbar() {
  return (
    <nav aria-label="Main" className="border-default bg-neutral-primary w-full">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-2.5">
        <a
          href="#dropdown-navbar"
          className="text-heading focus-visible:outline-ring self-center rounded-xs text-xl font-semibold whitespace-nowrap outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
        >
          Company
        </a>
        <ul className="flex flex-wrap items-center gap-8 text-sm font-medium">
          <li>
            <a
              href="#dropdown-navbar"
              aria-current="page"
              className={`${linkClassName} text-fg-brand`}
            >
              Home
            </a>
          </li>
          <li>
            {/* Site navigation: a disclosure of links, not an ARIA menu. */}
            <Dropdown placement="bottom">
              <DropdownTrigger asChild>
                <button
                  type="button"
                  className={`${linkClassName} flex cursor-pointer items-center`}
                >
                  Dropdown
                  <ChevronDown aria-hidden className="ms-1.5 size-4" />
                </button>
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem href="#dropdown-navbar">Dashboard</DropdownItem>
                <DropdownItem href="#dropdown-navbar">Settings</DropdownItem>
                <DropdownItem href="#dropdown-navbar">Earnings</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </li>
          <li>
            <a href="#dropdown-navbar" className={linkClassName}>
              Services
            </a>
          </li>
          <li>
            <a href="#dropdown-navbar" className={linkClassName}>
              Pricing
            </a>
          </li>
          <li>
            <a href="#dropdown-navbar" className={linkClassName}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
