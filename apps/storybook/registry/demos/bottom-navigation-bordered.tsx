import { CircleUser, House, SlidersVertical, Wallet } from "@stefan-florescu/icons";
import { BottomNavigation, BottomNavigationItem } from "@stefan-florescu/ui";

export default function BottomNavigationBordered() {
  return (
    <div className="border-default bg-neutral-primary rounded-base relative h-80 w-full transform-gpu overflow-hidden border">
      {/* The frame stands in for the browser window, so the fixed bar stays inside it. */}
      <BottomNavigation bordered>
        <BottomNavigationItem href="/" icon={<House aria-hidden />}>
          Home
        </BottomNavigationItem>
        <BottomNavigationItem href="/components/badge" icon={<Wallet aria-hidden />}>
          Wallet
        </BottomNavigationItem>
        <BottomNavigationItem href="/components/button" icon={<SlidersVertical aria-hidden />}>
          Settings
        </BottomNavigationItem>
        <BottomNavigationItem href="/components/avatar" icon={<CircleUser aria-hidden />}>
          Profile
        </BottomNavigationItem>
      </BottomNavigation>
    </div>
  );
}
