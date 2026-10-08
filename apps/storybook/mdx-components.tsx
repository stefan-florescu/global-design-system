import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps, ReactElement } from "react";

import { Callout } from "@/components/callout";
import { CodeBlock } from "@/components/code-block";
import { ComponentPreview } from "@/components/component-preview";
import { ColorPalette } from "@/components/foundation/color-palette";
import { ContrastTable } from "@/components/foundation/contrast-table";
import { SemanticColorTable } from "@/components/foundation/semantic-color-table";
import { InstallCommand } from "@/components/install-command";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";

type CodeElement = ReactElement<{ className?: string; children?: string }>;

/** Typography for MDX pages, modelled on ui.shadcn.com. */
const components: MDXComponents = {
  h2: ({ className, children, ...props }) => (
    <h2
      className={cn(
        "mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }) => (
    <h3
      className={cn("mt-8 scroll-m-20 text-lg font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ className, children, ...props }) => (
    <h4 className={cn("mt-6 scroll-m-20 font-semibold tracking-tight", className)} {...props}>
      {children}
    </h4>
  ),
  p: ({ className, ...props }) => (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-4", className)} {...props} />
  ),
  a: ({ className, href = "", children, ...props }: ComponentProps<"a">) => {
    const classes = cn("font-medium underline underline-offset-4", className);
    return href.startsWith("/") ? (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  },
  ul: ({ className, ...props }) => (
    <ul className={cn("my-4 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-4 ml-6 list-decimal [&>li]:mt-2", className)} {...props} />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold", className)} {...props} />
  ),
  hr: (props) => <hr className="my-8" {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props} />
  ),
  table: ({ className, ...props }) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border">
      <table className={cn("w-full text-sm", className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }) => <thead className={cn("bg-surface", className)} {...props} />,
  tr: ({ className, ...props }) => (
    <tr className={cn("border-b last:border-b-0", className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th className={cn("px-4 py-2 text-left font-medium", className)} {...props} />
  ),
  td: ({ className, ...props }) => (
    <td className={cn("px-4 py-2 align-top [&_code]:whitespace-nowrap", className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.85em]",
        className,
      )}
      {...props}
    />
  ),
  // Fenced code blocks → highlighted CodeBlock. The language comes from ```lang.
  pre: ({ children }) => {
    const code = children as CodeElement;
    const lang = code.props.className?.replace("language-", "") ?? "text";
    return <CodeBlock code={String(code.props.children ?? "")} lang={lang} className="my-6" />;
  },
  Callout,
  ColorPalette,
  ComponentPreview,
  ContrastTable,
  InstallCommand,
  PageHeader,
  SemanticColorTable,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
