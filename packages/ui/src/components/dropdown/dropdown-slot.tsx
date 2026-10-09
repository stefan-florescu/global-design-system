import {
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  type Ref,
  type RefCallback,
} from "react";

import { cn } from "../../lib/cn";

type AnyProps = Record<string, unknown>;

/** One ref callback that fills several refs. */
export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }
  };
}

/**
 * Renders its only child with the dropdown's props merged in (the `asChild` pattern): event
 * handlers run the child's first, then the dropdown's unless the child called
 * `preventDefault()`; class names and styles are merged; refs are combined.
 */
export function Slot({ children, ...props }: AnyProps & { children?: ReactNode }) {
  if (!isValidElement(children)) return null;
  const child = children as ReactElement<AnyProps>;
  const childProps = child.props;
  const merged: AnyProps = { ...childProps, ...props };

  for (const key of Object.keys(props)) {
    const ours = props[key];
    const theirs = childProps[key];
    if (/^on[A-Z]/.test(key) && typeof ours === "function" && typeof theirs === "function") {
      merged[key] = (event: { defaultPrevented?: boolean }, ...rest: unknown[]) => {
        theirs(event, ...rest);
        if (!event?.defaultPrevented) ours(event, ...rest);
      };
    }
  }
  merged.className = cn(childProps.className as string, props.className as string);
  merged.style = { ...(childProps.style as CSSProperties), ...(props.style as CSSProperties) };
  merged.ref = mergeRefs(childProps.ref as Ref<unknown>, props.ref as Ref<unknown>);

  return cloneElement(child, merged);
}
