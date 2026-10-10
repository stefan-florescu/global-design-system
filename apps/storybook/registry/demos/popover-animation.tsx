import { Button, Popover, PopoverBody, PopoverHeader, PopoverTitle } from "@stefan-florescu/ui";

export default function PopoverAnimation() {
  return (
    <Popover
      className="transition-[opacity,scale] duration-500 starting:open:scale-95"
      content={
        <>
          <PopoverHeader>
            <PopoverTitle>Popover animation</PopoverTitle>
          </PopoverHeader>
          <PopoverBody>
            <p>And here&apos;s some amazing content. It&apos;s very engaging. Right?</p>
          </PopoverBody>
        </>
      }
    >
      <Button>Animated popover</Button>
    </Popover>
  );
}
