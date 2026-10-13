"use client";

import { CircleUser, LogIn, LogOut, Settings } from "@stefan-florescu/icons";
import {
  Badge,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  buttonVariants,
} from "@stefan-florescu/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { leaveDemo, signOut, useSession } from "@/lib/session";

/** The signed-in user's menu, or the way to sign in from the demo or landing page. */
export function AccountMenu() {
  const session = useSession();
  const router = useRouter();

  if (session.mode === "loading") return null;

  if (session.mode !== "account") {
    return (
      <div className="flex items-center gap-2">
        {session.mode === "demo" ? <Badge variant="gray">Demo</Badge> : null}
        <Link
          href="/sign-in"
          onClick={() => leaveDemo()}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <LogIn aria-hidden />
          <span className="max-md:sr-only">Sign in</span>
        </Link>
      </div>
    );
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger variant="ghost" size="sm" iconOnly chevron={false} aria-label="Account">
        <CircleUser aria-hidden />
      </DropdownTrigger>
      <DropdownMenu className="w-64">
        <DropdownHeader>
          <div className="min-w-0">
            <div className="text-heading font-medium">Signed in as</div>
            <div className="text-body truncate">{session.user.email}</div>
          </div>
        </DropdownHeader>
        <DropdownItem onClick={() => router.push("/settings")}>
          <Settings aria-hidden />
          Settings
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem
          onClick={async () => {
            await signOut();
            router.push("/");
          }}
        >
          <LogOut aria-hidden />
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
