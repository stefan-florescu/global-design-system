import { Clock, Star, Users } from "@stefan-florescu/icons";
import { BottomNavigation, BottomNavigationItem } from "@stefan-florescu/ui";

const notifications = [
  {
    avatar: "/avatars/1.svg",
    time: "a few moments ago",
    text: (
      <>
        New message from <span className="text-heading font-medium">Jese Leos</span>: &quot;Hey,
        what&apos;s up? All set for the presentation?&quot;
      </>
    ),
  },
  {
    avatar: "/avatars/2.svg",
    time: "10 minutes ago",
    text: (
      <>
        <span className="text-heading font-medium">Joseph McFall</span> and{" "}
        <span className="text-heading font-medium">5 others</span> started following you.
      </>
    ),
  },
  {
    avatar: "/avatars/3.svg",
    time: "23 minutes ago",
    text: (
      <>
        <span className="text-heading font-medium">Bonnie Green</span> and{" "}
        <span className="text-heading font-medium">141 others</span> love your story. See it and
        view more stories.
      </>
    ),
  },
  {
    avatar: "/avatars/4.svg",
    time: "23 minutes ago",
    text: (
      <>
        <span className="text-heading font-medium">Leslie Livingston</span> mentioned you in a
        comment: <span className="text-fg-brand font-medium">@bonnie.green</span> what do you say?
      </>
    ),
  },
  {
    avatar: "/avatars/5.svg",
    time: "23 minutes ago",
    text: (
      <>
        <span className="text-heading font-medium">Robert Brown</span> posted a new video:
        Glassmorphism - learn how to implement the new design trend.
      </>
    ),
  },
];

export default function BottomNavigationCard() {
  return (
    <div className="bg-neutral-primary-soft border-default rounded-base relative h-96 w-full max-w-sm overflow-y-scroll border shadow-xs">
      <ul className="m-0 list-none p-0">
        {notifications.map(({ avatar, time, text }, index) => (
          <li
            key={index}
            className={index < notifications.length - 1 ? "border-default border-b" : undefined}
          >
            <a
              href="/components/bottom-navigation"
              className="hover:bg-neutral-secondary-medium focus-visible:outline-ring flex w-full items-center justify-center px-4 py-3 no-underline outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid"
            >
              <img className="me-3 size-11 rounded-full" src={avatar} alt="" />
              <div>
                <p className="text-body m-0 text-sm">{text}</p>
                <span className="text-fg-brand text-xs">{time}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <BottomNavigation position="sticky" aria-label="Feeds">
        <BottomNavigationItem icon={<Clock aria-hidden />}>Latest</BottomNavigationItem>
        <BottomNavigationItem icon={<Users aria-hidden />}>Following</BottomNavigationItem>
        <BottomNavigationItem icon={<Star aria-hidden />}>Favorites</BottomNavigationItem>
      </BottomNavigation>
    </div>
  );
}
