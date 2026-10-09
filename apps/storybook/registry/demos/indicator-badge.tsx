import { Avatar, Badge, Indicator } from "@stefan-florescu/ui";

const PEOPLE = [
  { name: "Neil Sims", avatar: "/avatars/5.svg", available: true },
  { name: "Bonnie Green", avatar: "/avatars/4.svg", available: false },
] as const;

export default function IndicatorBadge() {
  return (
    <div className="flex justify-center">
      <ul className="divide-default max-w-md divide-y">
        {PEOPLE.map(({ name, avatar, available }) => (
          <li key={name} className="py-3 sm:py-4">
            <div className="flex items-center gap-3">
              <Avatar src={avatar} alt="" size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-heading truncate text-sm font-semibold">{name}</p>
                <p className="text-body truncate text-sm">email@flowbite.com</p>
              </div>
              <Badge variant={available ? "success" : "danger"} bordered className="rounded-sm">
                <Indicator variant={available ? "success" : "danger"} size="xs" />
                {available ? "Available" : "Unavailable"}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
