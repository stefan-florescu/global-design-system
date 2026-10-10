import { Avatar, Button, Rating } from "@stefan-florescu/ui";

const link =
  "text-fg-brand focus-visible:outline-ring rounded-xs text-sm font-medium no-underline outline-hidden hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid";

export default function RatingComment() {
  return (
    <article>
      <div className="mb-4 flex items-center">
        <Avatar src="/avatars/5.svg" alt="" className="me-3" />
        <div className="text-heading font-medium">
          <p>
            Jese Leos{" "}
            <time dateTime="2014-08-16 19:00" className="text-body block text-sm">
              Joined on August 2014
            </time>
          </p>
        </div>
      </div>
      <div className="mb-1 flex items-center">
        <Rating value={4} />
        <h3 className="text-heading ms-2 text-sm leading-none font-semibold">
          Thinking to buy another one!
        </h3>
      </div>
      <footer className="text-body mt-1 mb-5 text-sm">
        <p>
          Reviewed in the United Kingdom on <time dateTime="2017-03-03 19:00">March 3, 2017</time>
        </p>
      </footer>
      <p className="text-body mb-2">
        This is my third Invicta Pro Diver. They are just fantastic value for money. This one
        arrived yesterday and the first thing I did was set the time, popped on an identical strap
        from another Invicta and went in the shower with it to test the waterproofing.... No
        problems.
      </p>
      <p className="text-body mb-3">
        It is obviously not the same build quality as those very expensive watches. But that is like
        comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.
      </p>
      <a href="/components/rating" className={`${link} mb-5 block w-fit`}>
        Read more
      </a>
      <aside>
        <p className="text-body mt-1 text-xs">19 people found this helpful</p>
        <div className="mt-3 flex items-center">
          <Button variant="tertiary" size="xs">
            Helpful
          </Button>
          <span className="border-default ms-4 border-s ps-4">
            <a href="/components/rating" className={link}>
              Report abuse
            </a>
          </span>
        </div>
      </aside>
    </article>
  );
}
