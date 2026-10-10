import { FingerprintPattern, Wallet } from "@stefan-florescu/icons";
import { Button, Toast, ToastToggle } from "@stefan-florescu/ui";

export default function ToastIllustration() {
  return (
    <Toast className="block max-w-sm p-3">
      <div className="flex items-start">
        {/* A token-coloured stand-in for Flowbite's smartphone illustration. */}
        <div
          aria-hidden
          className="rounded-base bg-brand-softer text-fg-brand flex aspect-[4/5] w-24 shrink-0 items-center justify-center [&_svg]:size-10"
        >
          <Wallet />
        </div>
        <div className="text-body ms-4 text-sm font-normal">
          <span className="text-heading mb-1 text-base font-medium">Connect your wallet</span>
          <div className="mb-3">Connect your wallet by clicking the bottom-right blue button.</div>
          <div className="grid grid-cols-2 gap-3">
            <ToastToggle asChild>
              <Button variant="secondary" size="xs" fullWidth>
                Not now
              </Button>
            </ToastToggle>
            <Button size="xs" fullWidth>
              <FingerprintPattern aria-hidden className="-ms-0.5" />
              Connect
            </Button>
          </div>
        </div>
      </div>
    </Toast>
  );
}
