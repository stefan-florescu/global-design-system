import { Button, Popover, PopoverBody, PopoverHeader, PopoverTitle } from "@stefan-florescu/ui";

export default function PopoverOffset() {
  return (
    <Popover
      offset={30}
      content={
        <>
          <PopoverHeader>
            <PopoverTitle>Popover offset</PopoverTitle>
          </PopoverHeader>
          <PopoverBody>
            <p>And here&apos;s some amazing content. It&apos;s very engaging. Right?</p>
          </PopoverBody>
        </>
      }
    >
      <Button>Offset popover</Button>
    </Popover>
  );
}
