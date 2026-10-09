"use client";

import { Bookmark, House, Plus, Search, SlidersVertical } from "@stefan-florescu/icons";
import { BottomNavigation, BottomNavigationItem } from "@stefan-florescu/ui";
import { useState } from "react";

const feeds = ["New", "Popular", "Following"];

const feedButton =
  "cursor-pointer rounded px-5 py-1.5 text-xs font-medium outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring";

export default function BottomNavigationButtonGroup() {
  const [feed, setFeed] = useState("Popular");

  return (
    <div className="border-default bg-neutral-primary rounded-base relative h-80 w-full transform-gpu overflow-hidden border">
      {/* The frame stands in for the browser window, so the fixed bar stays inside it. */}
      <BottomNavigation
        header={
          <div
            role="group"
            aria-label="Feed"
            className="bg-neutral-tertiary rounded-base mx-auto my-2 grid max-w-xs grid-cols-3 gap-1 p-1"
          >
            {feeds.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={feed === name}
                onClick={() => setFeed(name)}
                className={
                  feed === name
                    ? `${feedButton} bg-dark-strong text-dark-foreground`
                    : `${feedButton} text-body hover:bg-dark-strong hover:text-dark-foreground`
                }
              >
                {name}
              </button>
            ))}
          </div>
        }
      >
        <BottomNavigationItem href="/" icon={<House aria-hidden />} hideLabel className="p-4">
          Home
        </BottomNavigationItem>
        <BottomNavigationItem icon={<Bookmark aria-hidden />} hideLabel className="p-4">
          Bookmark
        </BottomNavigationItem>
        <BottomNavigationItem icon={<Plus aria-hidden />} hideLabel className="p-4">
          New post
        </BottomNavigationItem>
        <BottomNavigationItem icon={<Search aria-hidden />} hideLabel className="p-4">
          Search
        </BottomNavigationItem>
        <BottomNavigationItem
          href="/components/button"
          icon={<SlidersVertical aria-hidden />}
          hideLabel
          className="p-4"
        >
          Settings
        </BottomNavigationItem>
      </BottomNavigation>
    </div>
  );
}
