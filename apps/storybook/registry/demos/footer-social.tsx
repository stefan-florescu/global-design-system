import {
  AtSign,
  GitBranch,
  Layers,
  MessageSquareText,
  Palette,
  Users,
} from "@stefan-florescu/icons";
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterIcons,
  FooterLink,
  FooterLinkGroup,
} from "@stefan-florescu/ui";

export default function FooterSocial() {
  return (
    <Footer className="w-full">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between md:gap-6">
          <div className="mb-6 md:mb-0">
            <FooterBrand href="/" name="Stefan DS" logo={<Layers aria-hidden />} />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <FooterLinkGroup title="Resources" vertical>
              <FooterLink href="/">Stefan DS</FooterLink>
              <FooterLink href="https://tailwindcss.com/">Tailwind CSS</FooterLink>
            </FooterLinkGroup>
            <FooterLinkGroup title="Follow us" vertical>
              <FooterLink href="https://github.com/stefan-florescu/global-design-system">
                GitHub
              </FooterLink>
              <FooterLink href="https://example.com/chat">Discord</FooterLink>
            </FooterLinkGroup>
            <FooterLinkGroup title="Legal" vertical>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms &amp; Conditions</FooterLink>
            </FooterLinkGroup>
          </div>
        </div>
        <FooterDivider />
        <div className="sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="/" by="Stefan DS™" year={2023}>
            . All Rights Reserved.
          </FooterCopyright>
          <FooterIcons aria-label="Social media" className="mt-4 sm:mt-0 sm:justify-center">
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
