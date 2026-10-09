"use client";

import { Menu } from "@stefan-florescu/icons";
import {
  Button,
  buttonVariants,
  cn,
  MegaMenu,
  MegaMenuContent,
  MegaMenuGroup,
  MegaMenuLink,
  MegaMenuTrigger,
} from "@stefan-florescu/ui";
import { useId, useState } from "react";

const focus =
  "outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid";
const navLink = cn(
  "block rounded-xs border-b border-light px-3 py-2 text-heading hover:bg-neutral-secondary-soft md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-fg-brand aria-[current=page]:text-fg-brand",
  focus,
);

export default function MegaMenuDemo() {
  const [expanded, setExpanded] = useState(false);
  const menuId = useId();

  return (
    <div className="bg-neutral-primary min-h-72 w-full">
      <nav aria-label="Main" className="bg-neutral-primary">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <a
            href="#default-mega-menu"
            className={cn("text-heading rounded-xs text-xl font-semibold whitespace-nowrap", focus)}
          >
            Stefan
          </a>
          <div className="flex items-center space-x-1 md:order-2 md:space-x-2 rtl:space-x-reverse">
            <a
              href="#default-mega-menu"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Login
            </a>
            <a href="#default-mega-menu" className={buttonVariants({ size: "sm" })}>
              Sign Up
            </a>
            {/* The collapsed navbar's hamburger: a disclosure for the links below md. */}
            <Button
              variant="ghost"
              iconOnly
              aria-label="Open main menu"
              aria-expanded={expanded}
              aria-controls={menuId}
              className="text-body md:hidden"
              onClick={() => setExpanded(!expanded)}
            >
              <Menu aria-hidden />
            </Button>
          </div>
          <div
            id={menuId}
            className={cn(
              "w-full items-center justify-between md:order-1 md:flex md:w-auto",
              expanded ? "block" : "hidden",
            )}
          >
            <ul className="mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-8 rtl:space-x-reverse">
              <li>
                <a href="#default-mega-menu" aria-current="page" className={navLink}>
                  Home
                </a>
              </li>
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
              <li>
                <a href="#default-mega-menu" className={navLink}>
                  Team
                </a>
              </li>
              <li>
                <a href="#default-mega-menu" className={navLink}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
