import { Avatar, Tooltip } from "@stefan-florescu/ui";

const people = [
  { name: "Jese Leos", src: "/avatars/1.svg" },
  { name: "Roberta Casas", src: "/avatars/2.svg" },
  { name: "Bonnie Green", src: "/avatars/3.svg" },
];

const link =
  "rounded-base outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring";

export default function AvatarTooltip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {people.map((person) => (
        // Each avatar links to the person's profile; the tooltip shows and names it.
        <Tooltip key={person.name} content={person.name} mode="label">
          <a href="#avatar-tooltip" className={link}>
            <Avatar src={person.src} alt="" shape="square" />
          </a>
        </Tooltip>
      ))}
    </div>
  );
}
