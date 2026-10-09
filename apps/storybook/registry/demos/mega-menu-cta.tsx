"use client";

import { ArrowRight, Menu } from "@stefan-florescu/icons";
import {
  Button,
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

export default function MegaMenuCta() {
  const [expanded, setExpanded] = useState(false);
  const menuId = useId();

  return (
    <div className="bg-neutral-primary min-h-96 w-full">
      <nav aria-label="Main" className="bg-neutral-primary-soft">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <a
            href="#full-width-with-cta"
            className={cn("text-heading rounded-xs text-xl font-semibold whitespace-nowrap", focus)}
          >
            Stefan
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
          <div
            id={menuId}
            className={cn(
              "w-full items-center justify-between md:order-1 md:flex md:w-auto",
              expanded ? "block" : "hidden",
            )}
          >
            <ul className="mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-8 rtl:space-x-reverse">
              <li>
                <a href="#full-width-with-cta" aria-current="page" className={navLink}>
                  Home
                </a>
              </li>
              <li>
                <MegaMenu>
                  <MegaMenuTrigger>Company</MegaMenuTrigger>
                  <MegaMenuContent fullWidth>
                    <MegaMenuGroup>
                      <MegaMenuLink href="#full-width-with-cta">Online Stores</MegaMenuLink>
                      <MegaMenuLink href="#full-width-with-cta">Segmentation</MegaMenuLink>
                      <MegaMenuLink href="#full-width-with-cta">Marketing CRM</MegaMenuLink>
                      <MegaMenuLink href="#full-width-with-cta">Online Stores</MegaMenuLink>
                    </MegaMenuGroup>
                    <MegaMenuGroup className="hidden sm:block">
                      <MegaMenuLink href="#full-width-with-cta">Our Blog</MegaMenuLink>
                      <MegaMenuLink href="#full-width-with-cta">
                        Terms &amp; Conditions
                      </MegaMenuLink>
                      <MegaMenuLink href="#full-width-with-cta">License</MegaMenuLink>
                      <MegaMenuLink href="#full-width-with-cta">Resources</MegaMenuLink>
                    </MegaMenuGroup>
                    <div>
                      <h2 className="text-heading mb-2.5 font-semibold">Our brands</h2>
                      <p className="text-body mb-2.5">
                        At Stefan, we have a portfolio of brands that cater to a variety of
                        preferences.
                      </p>
                      <a
                        href="#full-width-with-cta"
                        className={cn(
                          "text-fg-brand inline-flex items-center rounded-xs text-sm font-medium hover:underline",
                          focus,
                        )}
                      >
                        Explore our brands
                        <ArrowRight aria-hidden className="ms-1.5 size-4 rtl:rotate-180" />
                      </a>
                    </div>
                  </MegaMenuContent>
                </MegaMenu>
              </li>
              <li>
                <a href="#full-width-with-cta" className={navLink}>
                  Marketplace
                </a>
              </li>
              <li>
                <a href="#full-width-with-cta" className={navLink}>
                  Resources
                </a>
              </li>
              <li>
                <a href="#full-width-with-cta" className={navLink}>
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
