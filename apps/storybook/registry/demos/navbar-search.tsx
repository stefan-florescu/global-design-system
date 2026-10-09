"use client";

import { Layers, Search } from "@stefan-florescu/icons";
import {
  Label,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  SearchInput,
} from "@stefan-florescu/ui";
import { useId } from "react";

export default function NavbarSearch() {
  const id = useId();

  return (
    <Navbar>
      <NavbarBrand href="#navbar-with-search" name="Stefan DS" logo={<Layers aria-hidden />} />
      <NavbarActions className="gap-0">
        {/* Below md, the search icon opens the same menu as the hamburger, search field first. */}
        <NavbarToggle label="Search" icon={<Search />} />
        <form role="search" className="hidden md:block">
          <Label htmlFor={`${id}-desktop`} className="sr-only">
            Search
          </Label>
          <SearchInput id={`${id}-desktop`} size="sm" placeholder="Search" />
        </form>
        <NavbarToggle />
      </NavbarActions>
      <NavbarCollapse
        header={
          <form role="search" className="mt-3 md:hidden">
            <Label htmlFor={`${id}-mobile`} className="sr-only">
              Search
            </Label>
            <SearchInput id={`${id}-mobile`} size="sm" placeholder="Search" />
          </form>
        }
      >
        <NavbarLink href="#navbar-with-search" active>
          Home
        </NavbarLink>
        <NavbarLink href="#navbar-with-search">About</NavbarLink>
        <NavbarLink href="#navbar-with-search">Services</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
