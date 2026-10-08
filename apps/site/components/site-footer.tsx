import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto flex h-14 max-w-[88rem] items-center px-4 text-sm md:px-6">
        <p>
          {siteConfig.name} · Source on{" "}
          <a
            href={siteConfig.links.github}
            className="text-foreground font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
