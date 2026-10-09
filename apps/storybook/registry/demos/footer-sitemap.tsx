import { AtSign, GitBranch, MessageSquareText, Palette, Users } from "@stefan-florescu/icons";
import {
  Footer,
  FooterCopyright,
  FooterIcon,
  FooterIcons,
  FooterLink,
  FooterLinkGroup,
} from "@stefan-florescu/ui";

export default function FooterSitemap() {
  return (
    <Footer className="bg-neutral-primary w-full">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 pt-6 pb-10 md:grid-cols-4 lg:pt-8 lg:pb-12">
          <FooterLinkGroup title="Company" vertical>
            <FooterLink href="/getting-started">About</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/brand">Brand Center</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
          </FooterLinkGroup>
          <FooterLinkGroup title="Help center" vertical>
            <FooterLink href="https://example.com/chat">Discord Server</FooterLink>
            <FooterLink href="https://example.com/profile">Twitter</FooterLink>
            <FooterLink href="https://example.com/community">Facebook</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </FooterLinkGroup>
          <FooterLinkGroup title="Legal" vertical>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/licensing">Licensing</FooterLink>
            <FooterLink href="/terms">Terms &amp; Conditions</FooterLink>
          </FooterLinkGroup>
          <FooterLinkGroup title="Download" vertical>
            <FooterLink href="/download/ios">iOS</FooterLink>
            <FooterLink href="/download/android">Android</FooterLink>
            <FooterLink href="/download/windows">Windows</FooterLink>
            <FooterLink href="/download/macos">MacOS</FooterLink>
          </FooterLinkGroup>
        </div>
        <div className="bg-neutral-secondary-soft px-4 py-6 md:flex md:items-center md:justify-between">
          <FooterCopyright href="/" by="Stefan DS™" year={2023}>
            . All Rights Reserved.
          </FooterCopyright>
          <FooterIcons aria-label="Social media" className="mt-4 sm:justify-center md:mt-0">
            <FooterIcon
              href="https://example.com/community"
              icon={<Users aria-hidden />}
              label="Community page"
            />
            <FooterIcon
              href="https://example.com/chat"
              icon={<MessageSquareText aria-hidden />}
              label="Chat community"
            />
            <FooterIcon
              href="https://example.com/profile"
              icon={<AtSign aria-hidden />}
              label="Social profile"
            />
            <FooterIcon
              href="https://github.com/stefan-florescu/global-design-system"
              icon={<GitBranch aria-hidden />}
              label="Source code"
            />
            <FooterIcon
              href="https://example.com/portfolio"
              icon={<Palette aria-hidden />}
              label="Design portfolio"
            />
          </FooterIcons>
        </div>
      </div>
    </Footer>
  );
}
