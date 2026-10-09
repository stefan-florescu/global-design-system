import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "@stefan-florescu/ui";

export default function FooterDemo() {
  return (
    <Footer variant="card" className="w-full">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <FooterCopyright href="/" by="Stefan DS™" year={2023}>
          . All Rights Reserved.
        </FooterCopyright>
        <FooterLinkGroup className="mt-3 sm:mt-0">
          <FooterLink href="/getting-started">About</FooterLink>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/licensing">Licensing</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterLinkGroup>
      </div>
    </Footer>
  );
}
