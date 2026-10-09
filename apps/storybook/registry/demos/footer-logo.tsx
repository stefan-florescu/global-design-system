import { Layers } from "@stefan-florescu/icons";
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "@stefan-florescu/ui";

export default function FooterLogo() {
  return (
    <Footer variant="card" className="w-full">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <FooterBrand
            href="/"
            name="Stefan DS"
            logo={<Layers aria-hidden />}
            className="mb-4 sm:mb-0"
          />
          <FooterLinkGroup className="mb-6 sm:mb-0">
            <FooterLink href="/getting-started">About</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/licensing">Licensing</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="/" by="Stefan DS™" year={2023} className="block">
          . All Rights Reserved.
        </FooterCopyright>
      </div>
    </Footer>
  );
}
