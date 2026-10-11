import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "@stefan-florescu/ui";

import { mainNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

import { LogoMark } from "./logo-mark";

/** The site's footer: the logo, the main links and the copyright line. */
export function SiteFooter() {
  return (
    <Footer className="border-default border-t">
      <div className="page-container py-6 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <FooterBrand
            href="/"
            name={siteConfig.shortName}
            logo={<LogoMark />}
            className="mb-4 sm:mb-0"
          />
          <FooterLinkGroup aria-label="Footer">
            {mainNav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.title}
              </FooterLink>
            ))}
            <FooterLink href={siteConfig.links.github}>GitHub</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright by={siteConfig.name} year={new Date().getFullYear()}>
          . All rights reserved.
        </FooterCopyright>
      </div>
    </Footer>
  );
}
