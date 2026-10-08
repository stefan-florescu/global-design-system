import { House, Plus, Settings, User, Wallet } from "@stefan-florescu/icons";
import { BottomNavigation, BottomNavigationItem, Button } from "@stefan-florescu/ui";

export default function BottomNavigationAppBar() {
  return (
    <div className="border-border bg-background relative h-60 w-full max-w-sm transform-gpu overflow-hidden rounded-lg border">
      {/* The frame stands in for a phone screen, so the fixed bar stays inside it. */}
      <BottomNavigation floating>
        <BottomNavigationItem
          href="/components/bottom-navigation"
          icon={<House aria-hidden />}
          hideLabel
          active
        >
          Home
        </BottomNavigationItem>
        <BottomNavigationItem href="/components/badge" icon={<Wallet aria-hidden />} hideLabel>
          Wallet
        </BottomNavigationItem>
        <li className="flex flex-1 items-center justify-center">
          <Button iconOnly pill aria-label="New item">
            <Plus aria-hidden />
          </Button>
        </li>
        <BottomNavigationItem href="/components/button" icon={<Settings aria-hidden />} hideLabel>
          Settings
        </BottomNavigationItem>
        <BottomNavigationItem href="/components/avatar" icon={<User aria-hidden />} hideLabel>
          Profile
        </BottomNavigationItem>
      </BottomNavigation>
    </div>
  );
}
