"use client";

import {
  Captions,
  Expand,
  ListMusic,
  Pause,
  Play,
  RefreshCw,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "@stefan-florescu/icons";
import {
  bottomNavigationVariants,
  Button,
  cn,
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  Label,
  Progress,
  Range,
  Tooltip,
} from "@stefan-florescu/ui";
import { useId, useState } from "react";

/* Flowbite's borderless icon buttons: `p-2` around a 20px icon. A pressed toggle is filled and brand. */
const toolButton =
  "me-1 text-body hover:bg-neutral-tertiary-medium hover:text-heading aria-pressed:bg-neutral-tertiary-medium aria-pressed:text-fg-brand";

export default function BottomNavigationVideoPlayer() {
  const [paused, setPaused] = useState(false);
  const [captions, setCaptions] = useState(false);

  return (
    <div className="bg-neutral-primary relative h-80 w-full transform-gpu overflow-hidden">
      {/* The frame stands in for the browser window, so the fixed bar stays inside it. */}
      <section aria-label="Video player" className={cn(bottomNavigationVariants(), "@container")}>
        {/* The bar is the query container, so the layout follows its width. */}
        <div className="grid h-24 grid-cols-1 px-8 @2xl:grid-cols-3">
          <div className="me-auto hidden items-center justify-center @2xl:flex">
            <img className="me-3 h-8 rounded-sm" src="/images/landscape-1.svg" alt="" />
            <span className="text-body text-sm">Flowbite Crash Course</span>
          </div>
          <div className="flex w-full items-center">
            <div className="w-full">
              <div
                role="group"
                aria-label="Playback controls"
                className="mx-auto mb-1 flex items-center justify-center"
              >
                <Tooltip content="Shuffle video" mode="label">
                  <Button variant="ghost" pill iconOnly size="sm" className={toolButton}>
                    <Shuffle aria-hidden />
                  </Button>
                </Tooltip>
                <Tooltip content="Previous video" mode="label">
                  <Button variant="ghost" pill iconOnly size="sm" className={toolButton}>
                    <SkipBack aria-hidden className="rtl:rotate-180" />
                  </Button>
                </Tooltip>
                {/* Play and pause swap: the name, tooltip and icon say what pressing it does. */}
                <Tooltip content={paused ? "Play video" : "Pause video"} mode="label">
                  <Button
                    pill
                    iconOnly
                    onClick={() => setPaused(!paused)}
                    className="mx-2 size-auto p-2.5 [&_svg]:size-4"
                  >
                    {paused ? (
                      <Play aria-hidden fill="currentColor" />
                    ) : (
                      <Pause aria-hidden fill="currentColor" />
                    )}
                  </Button>
                </Tooltip>
                <Tooltip content="Next video" mode="label">
                  <Button variant="ghost" pill iconOnly size="sm" className={toolButton}>
                    <SkipForward aria-hidden className="rtl:rotate-180" />
                  </Button>
                </Tooltip>
                <Tooltip content="Restart video" mode="label">
                  <Button variant="ghost" pill iconOnly size="sm" className={toolButton}>
                    <RefreshCw aria-hidden />
                  </Button>
                </Tooltip>
              </div>
              <div className="flex items-center justify-between gap-2">
                {/* The bar announces both times, so the visible ones aren't read twice. */}
                <span aria-hidden className="text-body text-sm font-medium">
                  3:45
                </span>
                <Progress
                  size="sm"
                  value={225}
                  max={300}
                  aria-label="Playback position"
                  valueText="3:45 of 5:00"
                />
                <span aria-hidden className="text-body text-sm font-medium">
                  5:00
                </span>
              </div>
            </div>
          </div>
          <div
            role="group"
            aria-label="Player tools"
            className="ms-auto hidden items-center justify-center @2xl:flex"
          >
            <Tooltip content="View playlist" mode="label">
              <Button variant="ghost" pill iconOnly size="sm" className={toolButton}>
                <ListMusic aria-hidden />
              </Button>
            </Tooltip>
            <Tooltip content="Captions" mode="label">
              <Button
                variant="ghost"
                pill
                iconOnly
                size="sm"
                aria-pressed={captions}
                onClick={() => setCaptions(!captions)}
                className={toolButton}
              >
                <Captions aria-hidden />
              </Button>
            </Tooltip>
            <Tooltip content="Full screen" mode="label">
              <Button variant="ghost" pill iconOnly size="sm" className={toolButton}>
                <Expand aria-hidden />
              </Button>
            </Tooltip>
            <VolumeControl />
          </div>
        </div>
      </section>
    </div>
  );
}

/** "Adjust volume" opens a small panel with a volume slider. */
function VolumeControl() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState(60);

  return (
    <Dropdown placement="top-end" onOpenChange={setOpen}>
      {/* The tooltip steps aside while the panel is open, so they don't overlap. */}
      <Tooltip content="Adjust volume" mode="label" open={open ? false : undefined}>
        <DropdownTrigger
          variant="ghost"
          pill
          iconOnly
          size="sm"
          chevron={false}
          className={toolButton}
        >
          <Volume2 aria-hidden />
        </DropdownTrigger>
      </Tooltip>
      {/* Holds a slider, so a dialog: focus moves to the slider when it opens. */}
      <DropdownContent role="dialog" aria-label="Volume" className="w-48 p-3">
        <div className="flex items-baseline justify-between">
          <Label htmlFor={id}>Volume</Label>
          <span aria-hidden className="text-body text-sm">
            {volume}%
          </span>
        </div>
        <Range
          id={id}
          size="sm"
          min={0}
          max={100}
          value={volume}
          aria-valuetext={`${volume}%`}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      </DropdownContent>
    </Dropdown>
  );
}
