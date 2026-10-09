import { CircleUser, House, Plus, SlidersVertical, Wallet } from "@stefan-florescu/icons";
import { BottomNavigation, BottomNavigationItem, Button } from "@stefan-florescu/ui";

export default function BottomNavigationAppBar() {
  return (
    <div className="border-default bg-neutral-primary rounded-base relative h-80 w-full transform-gpu overflow-hidden border">
      {/* The frame stands in for the browser window, so the fixed bar stays inside it. */}
      <BottomNavigation floating>
        <BottomNavigationItem href="/" icon={<House aria-hidden />} hideLabel>
          Home
        </BottomNavigationItem>
        <BottomNavigationItem href="/components/badge" icon={<Wallet aria-hidden />} hideLabel>
          Wallet
        </BottomNavigationItem>
        <li className="flex items-center justify-center">
          <Button size="xs" iconOnly pill aria-label="New item" className="[&_svg]:size-6">
            <Plus aria-hidden />
          </Button>
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
