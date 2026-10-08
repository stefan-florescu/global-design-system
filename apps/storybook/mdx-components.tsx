import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps, ReactElement } from "react";

import { Callout } from "@/components/callout";
import { CodeBlock } from "@/components/code-block";
import { ComponentPreview } from "@/components/component-preview";
import { H2, H3 } from "@/components/heading";
import { InstallCommand } from "@/components/install-command";
import { PageHeader } from "@/components/page-header";

type CodeElement = ReactElement<{ className?: string; children?: string }>;

/**
 * MDX renders plain HTML inside <article class="content prose">, so the prose styles in
 * app/docs.css apply. Only elements that need extra markup are mapped here.
 */
const components: MDXComponents = {
  h2: ({ children, ...props }) => <H2 {...props}>{children}</H2>,
  h3: ({ children, ...props }) => <H3 {...props}>{children}</H3>,
  a: ({ href = "", children, ...props }: ComponentProps<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  table: (props) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
  // Fenced code blocks → highlighted CodeBlock. The language comes from ```lang.
  pre: ({ children }) => {
    const code = children as CodeElement;
    const lang = code.props.className?.replace("language-", "") ?? "text";
    return <CodeBlock code={String(code.props.children ?? "")} lang={lang} />;
  },
  Callout,
  ComponentPreview,
  InstallCommand,
  PageHeader,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
