import { Link as LinkIcon } from "@stefan-florescu/icons";
import type { ComponentProps, ReactNode } from "react";

type HeadingProps = ComponentProps<"h2"> & { children: ReactNode; tocLabel?: string };

function anchor(id: string | undefined, children: ReactNode) {
  if (!id) return null;
  return (
    <a
      className="heading-anchor"
      href={`#${id}`}
      aria-label={`Link to "${typeof children === "string" ? children : id}"`}
    >
      <LinkIcon aria-hidden size={14} />
    </a>
  );
}

/** Section headings with a hover anchor link; picked up by "On this page". */
export function H2({ id, children, tocLabel, ...props }: HeadingProps) {
  return (
    <h2 id={id} data-toc-label={tocLabel} {...props}>
      {children}
      {anchor(id, children)}
    </h2>
  );
}

export function H3({ id, children, tocLabel, ...props }: HeadingProps) {
  return (
    <h3 id={id} data-toc-label={tocLabel} {...props}>
      {children}
      {anchor(id, children)}
    </h3>
  );
}
