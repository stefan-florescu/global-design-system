import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "@stefan-florescu/ui";

export default function FooterSticky() {
  return (
    <div className="border-default bg-neutral-primary rounded-base relative h-80 w-full transform-gpu overflow-hidden border">
      {/* The frame stands in for the browser window, so the fixed footer stays inside it. */}
      <div aria-hidden className="space-y-3 p-6">
        <div className="bg-neutral-tertiary h-2.5 w-48 rounded-full" />
        <div className="bg-neutral-tertiary h-2 max-w-sm rounded-full" />
        <div className="bg-neutral-tertiary h-2 rounded-full" />
        <div className="bg-neutral-tertiary h-2 max-w-md rounded-full" />
        <div className="bg-neutral-tertiary h-2 max-w-xs rounded-full" />
      </div>
      <Footer variant="sticky">
        <FooterCopyright href="/" by="Stefan DS™" year={2023}>
          . All Rights Reserved.
        </FooterCopyright>
        <FooterLinkGroup className="mt-3 sm:mt-0">
          <FooterLink href="/getting-started">About</FooterLink>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/licensing">Licensing</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterLinkGroup>
      </Footer>
    </div>
  );
}
