import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { SearchCommand } from "./search-command";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="bg-background/85 supports-[backdrop-filter]:bg-background/70 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[88rem] items-center gap-2 px-4 md:gap-4 md:px-6">
        <MobileNav className="md:hidden" />
        <Logo />
        <MainNav className="ml-2 hidden md:flex" />
        <div className="ml-auto flex items-center gap-1 md:gap-2">
          <SearchCommand />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
