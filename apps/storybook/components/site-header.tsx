import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { SearchCommand } from "./search-command";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="bg-background/85 supports-[backdrop-filter]:bg-background/70 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="page-container flex h-14 items-center gap-2 md:gap-4">
        <MobileNav className="lg:hidden" />
        <Logo />
        <MainNav className="ml-2 hidden lg:flex" />
        <div className="ml-auto flex items-center gap-1 md:gap-2">
          <SearchCommand />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
