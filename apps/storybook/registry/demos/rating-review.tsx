import { Building, Calendar, ThumbsDown, ThumbsUp, Users } from "@stefan-florescu/icons";
import { Avatar } from "@stefan-florescu/ui";

const link =
  "text-fg-brand focus-visible:outline-ring inline-flex items-center rounded-xs text-sm font-medium no-underline outline-hidden hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid [&_svg]:me-1.5 [&_svg]:size-5";

export default function RatingReview() {
  return (
    <article className="md:grid md:grid-cols-3 md:gap-8">
      <div>
        <div className="mb-6 flex items-center">
          <Avatar src="/avatars/5.svg" alt="" />
          <div className="text-heading ms-3 font-medium">
            <p>Jese Leos</p>
            <p className="text-body text-sm">United States</p>
          </div>
        </div>
        <ul className="text-body space-y-4 text-sm">
          <li className="flex items-center">
            <Building aria-hidden className="text-body me-1.5 size-4 shrink-0" />
            Apartament with city view
          </li>
          <li className="flex items-center">
            <Calendar aria-hidden className="text-body me-1.5 size-4 shrink-0" />3 nights December
            2021
          </li>
          <li className="flex items-center">
            <Users aria-hidden className="text-body me-1.5 size-4 shrink-0" />
            Family
          </li>
        </ul>
      </div>
      <div className="col-span-2 mt-6 md:mt-0">
        <div className="mb-5 flex items-start">
          <div className="pe-4">
            <footer>
              <p className="text-body mb-2 text-sm">
                Reviewed: <time dateTime="2022-01-20 19:00">January 20, 2022</time>
              </p>
            </footer>
            <h4 className="text-heading text-xl font-semibold">
              Spotless, good appliances, excellent layout, host was genuinely nice and helpful.
            </h4>
          </div>
          <p className="bg-brand-softer text-fg-brand-strong rounded-base inline-flex items-center p-1.5 text-sm font-semibold">
            <span className="sr-only">Score: </span>8.7
          </p>
        </div>
        <p className="text-body mb-4">
          The flat was spotless, very comfortable, and the host was amazing. I highly recommend this
          accommodation for anyone visiting New York city centre. It&apos;s quite a while since we
          are no longer using hotel facilities but self contained places. And the main reason is
          poor cleanliness and staff not being trained properly. This place exceeded our expectation
          and will return for sure.
        </p>
        <p className="text-body mb-4">
          It is obviously not the same build quality as those very expensive watches. But that is
          like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute
          bargain.
        </p>
        <aside className="flex items-center gap-4">
          <a href="/components/rating" className={link}>
            <ThumbsUp aria-hidden />
            Helpful
          </a>
          <a href="/components/rating" className={link}>
            <ThumbsDown aria-hidden />
            Not helpful
          </a>
        </aside>
      </div>
    </article>
  );
}
