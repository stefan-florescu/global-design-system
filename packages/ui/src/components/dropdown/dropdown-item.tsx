"use client";

import { Check } from "@stefan-florescu/icons";
import {
  useContext,
  useId,
  useState,
  type ComponentProps,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

import {
  DropdownPanelKindContext,
  DropdownRadioGroupContext,
  focusOnHover,
  useDropdownContext,
} from "./dropdown-context";
import { Slot } from "./dropdown-slot";
import {
  dropdownCheckboxIndicatorClassName,
  dropdownChoiceLabelClassName,
  dropdownControlLineClassName,
  dropdownDescriptionVariants,
  dropdownDividerClassName,
  dropdownHeaderClassName,
  dropdownIndicatorEndClassName,
  dropdownItemVariants,
  dropdownRadioDotClassName,
  dropdownRadioIndicatorClassName,
  dropdownToggleIndicatorClassName,
  type DropdownItemVariantProps,
} from "./dropdown.variants";

/** Props shared by every kind of item. */
type ItemBaseProps = DropdownItemVariantProps & {
  /** Shown and announced as unavailable; it can still be focused but not chosen. */
  disabled?: boolean;
  /** Text used for typeahead when the label is not plain text. */
  textValue?: string;
};

/** Click handling shared by all items: ignore when disabled, then close unless prevented. */
function useItemSelect(disabled: boolean | undefined, closeOnSelect: boolean) {
  const context = useDropdownContext("DropdownItem");
  return (event: MouseEvent<HTMLElement>, onClick?: (event: MouseEvent<HTMLElement>) => void) => {
    if (disabled) {
      event.preventDefault();
      return false;
    }
    onClick?.(event);
    if (event.defaultPrevented) return false;
    if (closeOnSelect) context.closeAll("trigger");
    return true;
  };
}

/* ------------------------------------------------------------------------------------------ */
/* DropdownItem                                                                               */
/* ------------------------------------------------------------------------------------------ */

export type DropdownItemProps = Omit<ComponentProps<"button">, "type"> &
  ItemBaseProps & {
    /** Render a link (`<a>`) instead of a button. */
    href?: string;
    target?: string;
    rel?: string;
    /** Render the only child (such as a router `Link`) as the item. */
    asChild?: boolean;
    /** Close the dropdown when the item is chosen. Call `preventDefault()` in `onClick` to keep it open once. */
    closeOnSelect?: boolean;
  };

/**
 * An action (`<button>`) or a link (`href`) in a dropdown. In a `DropdownMenu` it is a
 * `menuitem` reached with the arrow keys; in a `DropdownContent` it is a plain link or button.
 * Choosing it closes the dropdown and returns focus to the trigger.
 */
export function DropdownItem({
  variant,
  disabled,
  textValue,
  href,
  asChild = false,
  closeOnSelect = true,
  className,
  onClick,
  onPointerMove,
  children,
  ...props
}: DropdownItemProps) {
  const inMenu = useContext(DropdownPanelKindContext) === "menu";
  const select = useItemSelect(disabled, closeOnSelect);

  const itemProps = {
    ...props,
    role: inMenu ? "menuitem" : undefined,
    tabIndex: inMenu ? -1 : props.tabIndex,
    "aria-disabled": disabled || undefined,
    "data-text-value": textValue,
    "data-slot": "dropdown-item",
    className: cn(dropdownItemVariants({ variant }), className),
    onClick: (event: MouseEvent<HTMLElement>) =>
      select(event, onClick as (event: MouseEvent<HTMLElement>) => void),
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      onPointerMove?.(event as PointerEvent<HTMLButtonElement>);
      if (inMenu) focusOnHover(event);
    },
  };

  if (asChild) return <Slot {...itemProps}>{children}</Slot>;
  if (href !== undefined) {
    return (
      <a {...(itemProps as ComponentProps<"a">)} href={disabled ? undefined : href}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" {...(itemProps as ComponentProps<"button">)}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Checkbox and radio items                                                                   */
/* ------------------------------------------------------------------------------------------ */

type ChoiceItemProps = Omit<ComponentProps<"button">, "type" | "role"> &
  ItemBaseProps & {
    /** Helper text under the label, read as the item's description. */
    description?: ReactNode;
    /** Where the control sits: before the label (default) or pushed to the end of the row. */
    indicatorPosition?: "start" | "end";
    /** Close the dropdown when the item is chosen. Off by default, so several can be changed. */
    closeOnSelect?: boolean;
  };

/** The row layout shared by checkbox, switch and radio items. */
function ChoiceRow({
  indicator,
  description,
  indicatorPosition = "start",
  children,
}: {
  indicator: ReactNode;
  description?: ReactNode;
  indicatorPosition?: "start" | "end";
  children?: ReactNode;
}) {
  if (indicatorPosition === "end") {
    return (
      <>
        {children}
        <span className={dropdownIndicatorEndClassName}>{indicator}</span>
      </>
    );
  }
  if (!description) {
    return (
      <>
        {indicator}
        {children}
      </>
    );
  }
  return (
    <>
      <span className={dropdownControlLineClassName}>{indicator}</span>
      {children}
    </>
  );
}

function choiceItemClassName(
  variant: DropdownItemVariantProps["variant"],
  gap: "control" | "toggle",
  description: ReactNode,
  indicatorPosition: "start" | "end",
  className?: string,
) {
  return cn(
    dropdownItemVariants({
      variant,
      gap: indicatorPosition === "end" ? "icon" : gap,
      align: description ? "start" : "center",
    }),
    "group",
    indicatorPosition === "start" && dropdownChoiceLabelClassName,
    className,
  );
}

/** The label, or the label and its helper text. */
function ChoiceText({
  children,
  description,
  id,
  titleClassName,
}: {
  children?: ReactNode;
  description?: ReactNode;
  id: string;
  titleClassName: string;
}) {
  if (!description) return <>{children}</>;
  return (
    <span className="block">
      <span
        id={`${id}-label`}
        className={cn(dropdownDescriptionVariants({ part: "title" }), titleClassName)}
      >
        {children}
      </span>
      <span
        id={`${id}-description`}
        className={dropdownDescriptionVariants({ part: "description" })}
      >
        {description}
      </span>
    </span>
  );
}

export type DropdownCheckboxItemProps = ChoiceItemProps & {
  /** Whether the option is on (controlled). */
  checked?: boolean;
  /** Whether the option is on at first (uncontrolled). */
  defaultChecked?: boolean;
  /** Called with the new state when the item is chosen. */
  onCheckedChange?: (checked: boolean) => void;
  /** Draw the state as a checkbox (default) or a switch. */
  indicator?: "checkbox" | "toggle";
};

/**
 * An option that can be turned on and off (`menuitemcheckbox`), drawn as a checkbox or a switch.
 * Choosing it toggles the state and keeps the menu open.
 */
export function DropdownCheckboxItem({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  indicator = "checkbox",
  indicatorPosition = "start",
  description,
  closeOnSelect = false,
  variant,
  disabled,
  textValue,
  className,
  onClick,
  onPointerMove,
  children,
  ...props
}: DropdownCheckboxItemProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const checked = checkedProp ?? internal;
  const select = useItemSelect(disabled, closeOnSelect);
  const id = useId();
  const gap = indicator === "toggle" ? "toggle" : "control";

  const control =
    indicator === "toggle" ? (
      <span aria-hidden className={dropdownToggleIndicatorClassName} />
    ) : (
      <span aria-hidden className={dropdownCheckboxIndicatorClassName}>
        <Check />
      </span>
    );

  return (
    <button
      type="button"
      {...props}
      role="menuitemcheckbox"
      tabIndex={-1}
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      aria-labelledby={description ? `${id}-label` : props["aria-labelledby"]}
      aria-describedby={description ? `${id}-description` : props["aria-describedby"]}
      data-text-value={textValue}
      data-slot="dropdown-checkbox-item"
      className={choiceItemClassName(variant, gap, description, indicatorPosition, className)}
      onClick={(event) => {
        // Toggle first so `closeOnSelect` handlers see the new state.
        if (disabled) {
          event.preventDefault();
          return;
        }
        if (checkedProp === undefined) setInternal(!checked);
        onCheckedChange?.(!checked);
        select(event, onClick as (event: MouseEvent<HTMLElement>) => void);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        focusOnHover(event);
      }}
    >
      <ChoiceRow
        indicator={control}
        description={description}
        indicatorPosition={indicatorPosition}
      >
        <ChoiceText description={description} id={id} titleClassName="mb-0.5">
          {children}
        </ChoiceText>
      </ChoiceRow>
    </button>
  );
}

export type DropdownRadioGroupProps = Omit<ComponentProps<"div">, "role" | "defaultValue"> & {
  /** The chosen value (controlled). */
  value?: string;
  /** The value chosen at first (uncontrolled). */
  defaultValue?: string;
  /** Called with the value of the chosen item. */
  onValueChange?: (value: string) => void;
};

/** A set of `DropdownRadioItem`s of which one is chosen. Name it with `aria-label` when useful. */
export function DropdownRadioGroup({
  value: valueProp,
  defaultValue,
  onValueChange,
  ...props
}: DropdownRadioGroupProps) {
  const [internal, setInternal] = useState(defaultValue);
  const value = valueProp ?? internal;
  const setValue = (next: string) => {
    if (valueProp === undefined) setInternal(next);
    onValueChange?.(next);
  };
  return (
    <DropdownRadioGroupContext value={{ value, setValue }}>
      <div role="group" data-slot="dropdown-radio-group" {...props} />
    </DropdownRadioGroupContext>
  );
}

export type DropdownRadioItemProps = ChoiceItemProps & {
  /** The value this item sets on its `DropdownRadioGroup`. */
  value: string;
};

/** One choice in a `DropdownRadioGroup` (`menuitemradio`). Choosing it keeps the menu open. */
export function DropdownRadioItem({
  value,
  indicatorPosition = "start",
  description,
  closeOnSelect = false,
  variant,
  disabled,
  textValue,
  className,
  onClick,
  onPointerMove,
  children,
  ...props
}: DropdownRadioItemProps) {
  const group = useContext(DropdownRadioGroupContext);
  if (!group) throw new Error("<DropdownRadioItem> must be used inside <DropdownRadioGroup>.");
  const checked = group.value === value;
  const select = useItemSelect(disabled, closeOnSelect);
  const id = useId();

  return (
    <button
      type="button"
      {...props}
      role="menuitemradio"
      tabIndex={-1}
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      aria-labelledby={description ? `${id}-label` : props["aria-labelledby"]}
      aria-describedby={description ? `${id}-description` : props["aria-describedby"]}
      data-text-value={textValue}
      data-slot="dropdown-radio-item"
      className={choiceItemClassName(variant, "control", description, indicatorPosition, className)}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        group.setValue(value);
        select(event, onClick as (event: MouseEvent<HTMLElement>) => void);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        focusOnHover(event);
      }}
    >
      <ChoiceRow
        indicator={
          <span aria-hidden className={dropdownRadioIndicatorClassName}>
            <span className={dropdownRadioDotClassName} />
          </span>
        }
        description={description}
        indicatorPosition={indicatorPosition}
      >
        <ChoiceText description={description} id={id} titleClassName="mb-1">
          {children}
        </ChoiceText>
      </ChoiceRow>
    </button>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Structure                                                                                  */
/* ------------------------------------------------------------------------------------------ */

export type DropdownHeaderProps = ComponentProps<"div">;

/**
 * Information above the items, such as the signed-in user.
 * It is not an item: keyboard focus skips it.
 */
export function DropdownHeader({ className, ...props }: DropdownHeaderProps) {
  return (
    <div
      data-slot="dropdown-header"
      className={cn(dropdownHeaderClassName, className)}
      {...props}
    />
  );
}

export type DropdownGroupProps = Omit<ComponentProps<"div">, "role">;

/**
 * Groups items, for example in a scrolling area. Give it an `aria-label` to name the group.
 */
export function DropdownGroup(props: DropdownGroupProps) {
  return <div role="group" data-slot="dropdown-group" {...props} />;
}

export type DropdownDividerProps = Omit<ComponentProps<"div">, "role" | "children">;

/** A line between groups of items (`separator`). */
export function DropdownDivider({ className, ...props }: DropdownDividerProps) {
  return (
    <div
      role="separator"
      data-slot="dropdown-divider"
      className={cn(dropdownDividerClassName, className)}
      {...props}
    />
  );
}
