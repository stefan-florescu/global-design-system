import { Avatar, Button, Popover } from "@stefan-florescu/ui";

export default function PopoverUserProfile() {
  return (
    <Popover
      trigger="hover"
      content={
        <div className="p-3">
          <div className="mb-2 flex items-center justify-between">
            <a href="#jese-leos" className="rounded-full">
              <Avatar src="/avatars/1.svg" alt="Jese Leos" size="sm" />
            </a>
            <Button size="xs" className="rounded">
              Follow
            </Button>
          </div>
          <p className="text-heading text-sm font-semibold">
            <a href="#jese-leos">Jese Leos</a>
          </p>
          <p className="text-body mb-3 text-sm font-normal">
            <a href="#jese-leos" className="hover:underline">
              @jeseleos
            </a>
          </p>
          <p className="mb-4 text-sm">
            Open-source contributor &amp; CEO. Building{" "}
            <a href="#stefan-ds" className="text-fg-brand hover:underline">
              example.com
            </a>
            .
          </p>
          <ul className="flex text-sm">
            <li className="me-2.5">
              <a href="#following" className="hover:underline">
                <span className="text-heading font-medium">799</span> <span>Following</span>
              </a>
            </li>
            <li>
              <a href="#followers" className="hover:underline">
                <span className="text-heading font-medium">3,758</span> <span>Followers</span>
              </a>
            </li>
          </ul>
        </div>
      }
      aria-label="Jese Leos"
    >
      <Button>User profile</Button>
    </Popover>
  );
}
