import { Button, Popover, PopoverBody, PopoverHeader, PopoverTitle } from "@stefan-florescu/ui";

export default function PopoverTriggering() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Popover
        trigger="hover"
        content={
          <>
            <PopoverHeader>
              <PopoverTitle>Hover popover</PopoverTitle>
            </PopoverHeader>
            <PopoverBody>
              <p>And here&apos;s some amazing content. It&apos;s very engaging. Right?</p>
            </PopoverBody>
          </>
        }
      >
        <Button>Hover popover</Button>
      </Popover>
      <Popover
        trigger="click"
        content={
          <>
            <PopoverHeader>
              <PopoverTitle>Click popover</PopoverTitle>
            </PopoverHeader>
            <PopoverBody>
              <p>And here&apos;s some amazing content. It&apos;s very engaging. Right?</p>
            </PopoverBody>
          </>
        }
      >
        <Button>Click popover</Button>
      </Popover>
    </div>
  );
}
