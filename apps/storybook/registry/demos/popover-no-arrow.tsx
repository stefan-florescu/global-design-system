import { Button, Popover, PopoverBody, PopoverHeader, PopoverTitle } from "@stefan-florescu/ui";

export default function PopoverNoArrow() {
  return (
    <Popover
      arrow={false}
      content={
        <>
          <PopoverHeader>
            <PopoverTitle>Popover title</PopoverTitle>
          </PopoverHeader>
          <PopoverBody>
            <p>And here&apos;s some amazing content. It&apos;s very engaging. Right?</p>
          </PopoverBody>
        </>
      }
    >
      <Button>Default popover</Button>
    </Popover>
  );
}
