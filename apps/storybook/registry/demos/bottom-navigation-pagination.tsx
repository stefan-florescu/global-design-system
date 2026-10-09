import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  FilePlus,
  SlidersVertical,
} from "@stefan-florescu/icons";
import { BottomNavigation, BottomNavigationItem } from "@stefan-florescu/ui";

const pageButton =
  "inline-flex h-8 w-6 cursor-pointer items-center justify-center px-1 hover:bg-neutral-tertiary-medium focus:ring-2 focus:ring-neutral-quaternary focus:outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-ring [&_svg]:size-3.5";

export default function BottomNavigationPagination() {
  return (
    <div className="border-default bg-neutral-primary rounded-base relative h-80 w-full transform-gpu overflow-hidden border">
      {/* The frame stands in for the browser window, so the fixed bar stays inside it. */}
      <BottomNavigation>
        <BottomNavigationItem icon={<FilePlus aria-hidden />} hideLabel>
          New document
        </BottomNavigationItem>
        <BottomNavigationItem icon={<Bookmark aria-hidden />} hideLabel>
          Bookmark
        </BottomNavigationItem>
        <li className="col-span-2 flex items-center justify-center">
          <div className="text-body bg-neutral-secondary-medium rounded-base border-default-medium mx-2 flex w-full max-w-32 items-center justify-between border">
            <button
              type="button"
              aria-label="Previous page"
              className={`${pageButton} rounded-s-base`}
            >
              <ChevronLeft aria-hidden className="rtl:rotate-180" />
            </button>
            <span className="mx-1 shrink-0 text-sm font-medium">1 of 34</span>
            <button type="button" aria-label="Next page" className={`${pageButton} rounded-e-base`}>
              <ChevronRight aria-hidden className="rtl:rotate-180" />
            </button>
          </div>
        </li>
        <BottomNavigationItem
          href="/components/button"
          icon={<SlidersVertical aria-hidden />}
          hideLabel
        >
          Settings
        </BottomNavigationItem>
        <BottomNavigationItem href="/components/avatar" icon={<CircleUser aria-hidden />} hideLabel>
          Profile
        </BottomNavigationItem>
      </BottomNavigation>
    </div>
  );
}
