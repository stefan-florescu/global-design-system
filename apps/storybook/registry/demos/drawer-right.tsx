import { ArrowRight, Info } from "@stefan-florescu/icons";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@stefan-florescu/ui";

export default function DrawerRight() {
  return (
    <Drawer placement="right">
      <DrawerTrigger>Show right drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <Info aria-hidden />
            Right drawer
          </DrawerTitle>
          <DrawerClose label="Close drawer" />
        </DrawerHeader>
        <DrawerDescription>
          Upgrade your Figma toolkit with a design system built on top{" "}
          <a href="/" className="text-heading font-medium underline hover:no-underline">
            Stefan Design System
          </a>{" "}
          featuring variants, style guide and auto layout.
        </DrawerDescription>
        <p className="text-body mb-5 text-sm">
          Recommended for professional developers and companies building enterprise-level.
        </p>
        <div className="flex items-center gap-4">
          <Button variant="secondary">Pricing &amp; FAQ</Button>
          <Button>
            Get access
            <ArrowRight aria-hidden className="rtl:rotate-180" />
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
