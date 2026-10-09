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

export default function MegaMenuImage() {
  const [expanded, setExpanded] = useState(false);
  const menuId = useId();

  return (
    <div className="bg-neutral-primary min-h-96 w-full">
      <nav aria-label="Main" className="bg-neutral-primary-soft">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <a
            href="#full-width-with-image"
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
                <a href="#full-width-with-image" aria-current="page" className={navLink}>
                  Home
                </a>
              </li>
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
                      <MegaMenuLink href="#full-width-with-image">
                        Terms &amp; Conditions
                      </MegaMenuLink>
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
              <li>
                <a href="#full-width-with-image" className={navLink}>
                  Marketplace
                </a>
              </li>
              <li>
                <a href="#full-width-with-image" className={navLink}>
                  Resources
                </a>
              </li>
              <li>
                <a href="#full-width-with-image" className={navLink}>
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
