"use client";

import {
  ChartPie,
  ChevronDown,
  Columns3,
  Inbox,
  LogIn,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "@stefan-florescu/icons";
import {
  Badge,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@stefan-florescu/ui";
import { useId, useState } from "react";

// Flowbite's sidebar links, with a keyboard focus outline.
const item =
  "group flex w-full items-center rounded-base px-2 py-1.5 text-body hover:bg-neutral-tertiary hover:text-fg-brand outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid focus-visible:outline-ring";
const icon = "size-5 shrink-0 transition duration-75 group-hover:text-fg-brand";

export default function DrawerScrollLocked() {
  const id = useId();
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <Drawer>
      <DrawerTrigger>Show body scrolling disabled</DrawerTrigger>
      <DrawerContent className="w-80">
        <DrawerHeader className="mb-0">
          <DrawerTitle className="text-heading font-semibold">Menu</DrawerTitle>
          <DrawerClose label="Close menu" />
        </DrawerHeader>
        <nav aria-label="Main" className="overflow-y-auto py-5">
          <ul className="space-y-2 font-medium">
            <li>
              <a href="/dashboard" className={item}>
                <ChartPie aria-hidden className={icon} />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                className={`${item} cursor-pointer justify-between`}
                aria-expanded={shopOpen}
                aria-controls={`${id}-shop`}
                onClick={() => setShopOpen(!shopOpen)}
              >
                <ShoppingCart aria-hidden className={icon} />
                <span className="ms-3 flex-1 text-start whitespace-nowrap">E-commerce</span>
                <ChevronDown
                  aria-hidden
                  className={`size-5 transition-transform motion-reduce:transition-none ${shopOpen ? "rotate-180" : ""}`}
                />
              </button>
              <ul id={`${id}-shop`} hidden={!shopOpen} className="space-y-2 py-2">
                <li>
                  <a href="/products" className={`${item} ps-10`}>
                    Products
                  </a>
                </li>
                <li>
                  <a href="/billing" className={`${item} ps-10`}>
                    Billing
                  </a>
                </li>
                <li>
                  <a href="/invoices" className={`${item} ps-10`}>
                    Invoice
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/kanban" className={item}>
                <Columns3 aria-hidden className={icon} />
                <span className="ms-3 flex-1 whitespace-nowrap">Kanban</span>
                <Badge variant="gray" bordered>
                  Pro
                </Badge>
              </a>
            </li>
            <li>
              <a href="/inbox" className={item}>
                <Inbox aria-hidden className={icon} />
                <span className="ms-3 flex-1 whitespace-nowrap">Inbox</span>
                <Badge variant="danger" bordered pill className="ms-2 size-4.5 p-0">
                  2<span className="sr-only"> unread messages</span>
                </Badge>
              </a>
            </li>
            <li>
              <a href="/users" className={item}>
                <Users aria-hidden className={icon} />
                <span className="ms-3 flex-1 whitespace-nowrap">Users</span>
              </a>
            </li>
            <li>
              <a href="/products" className={item}>
                <ShoppingBag aria-hidden className={icon} />
                <span className="ms-3 flex-1 whitespace-nowrap">Products</span>
              </a>
            </li>
            <li>
              <a href="/sign-in" className={item}>
                <LogIn aria-hidden className={icon} />
                <span className="ms-3 flex-1 whitespace-nowrap">Sign In</span>
              </a>
            </li>
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
