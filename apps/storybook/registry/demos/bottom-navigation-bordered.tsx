import { House, Settings, User, Wallet } from "@stefan-florescu/icons";
import { BottomNavigation, BottomNavigationItem } from "@stefan-florescu/ui";

export default function BottomNavigationBordered() {
  return (
    <div className="border-border bg-background relative h-60 w-full max-w-sm transform-gpu overflow-hidden rounded-lg border">
      {/* The frame stands in for a phone screen, so the fixed bar stays inside it. */}
      <BottomNavigation bordered>
        <BottomNavigationItem
          href="/components/bottom-navigation"
          icon={<House aria-hidden />}
          active
        >
          Home
        </BottomNavigationItem>
        <BottomNavigationItem href="/components/badge" icon={<Wallet aria-hidden />}>
          Wallet
        </BottomNavigationItem>
        <BottomNavigationItem href="/components/button" icon={<Settings aria-hidden />}>
          Settings
        </BottomNavigationItem>
        <BottomNavigationItem href="/components/avatar" icon={<User aria-hidden />}>
          Profile
        </BottomNavigationItem>
      </BottomNavigation>
    </div>
  );
}
