import { Eye, EyeOff } from "@stefan-florescu/icons";
import { Avatar, Badge, TimelineTime } from "@stefan-florescu/ui";

const activity = [
  {
    avatar: "/avatars/4.svg",
    who: "Laura Romeros",
    what: (
      <>
        likes <strong className="text-heading font-medium">Bonnie Green&apos;s</strong> post in{" "}
        <strong className="text-heading font-medium">
          How to start with the Stefan Design System
        </strong>
      </>
    ),
    quote: true,
    isPrivate: true,
  },
  {
    avatar: "/avatars/2.svg",
    who: "Mike Willi",
    what: (
      <>
        react to <strong className="text-heading font-medium">Thomas Lean&apos;s</strong> comment
      </>
    ),
    quote: false,
    isPrivate: false,
  },
  {
    avatar: "/avatars/5.svg",
    who: "Jese Leos",
    what: (
      <>
        likes <strong className="text-heading font-medium">Bonnie Green&apos;s</strong> post in{" "}
        <strong className="text-heading font-medium">
          How to start with the Stefan Design System
        </strong>
      </>
    ),
    quote: true,
    isPrivate: false,
  },
  {
    avatar: "/avatars/3.svg",
    who: "Bonnie Green",
    what: (
      <>
        likes <strong className="text-heading font-medium">Bonnie Green&apos;s</strong> post in{" "}
        <strong className="text-heading font-medium">Top figma designs</strong>
      </>
    ),
    quote: true,
    isPrivate: false,
  },
];

const days = [
  { date: "2025-01-15", label: "January 15th, 2025" },
  { date: "2025-01-13", label: "January 13th, 2025" },
];

export default function TimelineGrouped() {
  return (
    <div className="w-full">
      {days.map(({ date, label }) => (
        <section
          key={date}
          aria-labelledby={`day-${date}`}
          className="rounded-base border-default bg-neutral-secondary-soft mb-4 border p-5"
        >
          <h4 id={`day-${date}`} className="text-lg">
            <TimelineTime dateTime={date} className="text-heading text-lg font-semibold">
              {label}
            </TimelineTime>
          </h4>
          <ol className="divide-default mt-3 divide-y">
            {activity.map(({ avatar, who, what, quote, isPrivate }) => (
              <li key={who}>
                <a
                  href="#grouped-timeline"
                  className="hover:bg-neutral-tertiary focus-visible:outline-ring block items-center p-3 outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid sm:flex"
                >
                  <Avatar src={avatar} size="lg" className="me-3 mb-3 size-12 sm:mb-0" />
                  <div className="text-body">
                    <div
                      className={
                        quote ? "mb-1 text-base font-normal" : "mb-2 text-base font-normal"
                      }
                    >
                      <strong className="text-heading font-medium">{who}</strong> {what}
                    </div>
                    {quote ? (
                      <div className="mb-2 text-sm font-normal">
                        &ldquo;I wanted to share a webinar zeroheight.&rdquo;
                      </div>
                    ) : null}
                    <Badge variant="gray" bordered className="bg-neutral-primary-medium">
                      {isPrivate ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
                      {isPrivate ? "Private" : "Public"}
                    </Badge>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
