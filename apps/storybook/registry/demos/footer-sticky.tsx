import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
  SkeletonLine,
} from "@stefan-florescu/ui";

export default function FooterSticky() {
  return (
    <div className="border-default bg-neutral-primary rounded-base relative h-80 w-full transform-gpu overflow-hidden border">
      {/* The frame stands in for the browser window, so the fixed footer stays inside it. */}
      {/* Stand-in page text: nothing is loading, so the lines go without a Skeleton status. */}
      <div aria-hidden className="space-y-3 p-6">
        <SkeletonLine className="w-48" />
        <SkeletonLine size="sm" className="max-w-sm" />
        <SkeletonLine size="sm" />
        <SkeletonLine size="sm" className="max-w-md" />
        <SkeletonLine size="sm" className="max-w-xs" />
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
