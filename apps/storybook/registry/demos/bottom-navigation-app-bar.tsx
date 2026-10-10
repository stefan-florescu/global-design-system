import { CircleUser, House, Plus, SlidersVertical, Wallet } from "@stefan-florescu/icons";
import { BottomNavigation, BottomNavigationItem, Button, Tooltip } from "@stefan-florescu/ui";

export default function BottomNavigationAppBar() {
  return (
    <div className="border-default bg-neutral-primary rounded-base relative h-80 w-full transform-gpu overflow-hidden border">
      {/* The frame stands in for the browser window, so the fixed bar stays inside it. */}
      <BottomNavigation floating>
        <Tooltip content="Home" mode="label">
          <BottomNavigationItem href="/" icon={<House aria-hidden />} hideLabel>
            Home
          </BottomNavigationItem>
        </Tooltip>
        <Tooltip content="Wallet" mode="label">
          <BottomNavigationItem href="/components/badge" icon={<Wallet aria-hidden />} hideLabel>
            Wallet
          </BottomNavigationItem>
        </Tooltip>
        <li className="flex items-center justify-center">
          <Tooltip content="Create new item" mode="label">
            <Button size="xs" iconOnly pill className="[&_svg]:size-6">
              <Plus aria-hidden />
            </Button>
          </Tooltip>
        </li>
        <Tooltip content="Settings" mode="label">
          <BottomNavigationItem
            href="/components/button"
            icon={<SlidersVertical aria-hidden />}
            hideLabel
          >
            Settings
          </BottomNavigationItem>
        </Tooltip>
        <Tooltip content="Profile" mode="label">
          <BottomNavigationItem
            href="/components/avatar"
            icon={<CircleUser aria-hidden />}
            hideLabel
          >
            Profile
          </BottomNavigationItem>
        </Tooltip>
      </BottomNavigation>
    </div>
  );
}
