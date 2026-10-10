"use client";

import {
  Clock,
  EllipsisVertical,
  Info,
  Mic,
  MicOff,
  SlidersVertical,
  Smile,
  Users,
  Video,
  VideoOff,
  Volume2,
} from "@stefan-florescu/icons";
import {
  bottomNavigationVariants,
  Button,
  cn,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Label,
  Range,
  Tooltip,
} from "@stefan-florescu/ui";
import { useId, useState } from "react";

/* Round call buttons: `p-2.5` around a 16px icon. Pressed toggles keep the hover fill. */
const callButton =
  "size-auto p-2.5 [&_svg]:size-4 aria-pressed:bg-neutral-secondary-medium aria-pressed:text-heading";
/* Borderless icon buttons on the right of the bar. */
const toolButton = "me-1 text-body hover:bg-neutral-tertiary-medium hover:text-heading";

export default function BottomNavigationMeeting() {
  const [muted, setMuted] = useState(false);
  const [cameraHidden, setCameraHidden] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <div className="bg-neutral-primary relative h-80 w-full transform-gpu overflow-hidden">
      {/* The frame stands in for the browser window, so the fixed bar stays inside it. */}
      <section
        aria-label="Meeting controls"
        className={cn(bottomNavigationVariants(), "@container")}
      >
        {/* The bar is the query container, so the layout follows its width. */}
        <div className="grid h-16 grid-cols-1 px-8 @2xl:grid-cols-[1fr_auto_1fr]">
          <div className="text-body me-auto hidden items-center justify-center @2xl:flex">
            <Clock aria-hidden className="me-1.5 size-4" />
            <time dateTime="12:43" className="text-sm">
              12:43 PM
            </time>
          </div>
          <div
            role="group"
            aria-label="Call controls"
            className="mx-auto flex items-center justify-center gap-3"
          >
            {/* Toggle buttons: the name stays the same and `aria-pressed` says whether it is on. */}
            <Tooltip content="Mute microphone" mode="label">
              <Button
                variant="tertiary"
                pill
                iconOnly
                aria-pressed={muted}
                onClick={() => setMuted(!muted)}
                className={callButton}
              >
                {muted ? <MicOff aria-hidden /> : <Mic aria-hidden />}
              </Button>
            </Tooltip>
            <Tooltip content="Hide camera" mode="label">
              <Button
                variant="tertiary"
                pill
                iconOnly
                aria-pressed={cameraHidden}
                onClick={() => setCameraHidden(!cameraHidden)}
                className={callButton}
              >
                {cameraHidden ? <VideoOff aria-hidden /> : <Video aria-hidden />}
              </Button>
            </Tooltip>
            <Tooltip content="Share feedback" mode="label">
              <Button variant="tertiary" pill iconOnly className={callButton}>
                <Smile aria-hidden />
              </Button>
            </Tooltip>
            <Tooltip content="Video settings" mode="label">
              <Button variant="tertiary" pill iconOnly className={callButton}>
                <SlidersVertical aria-hidden />
              </Button>
            </Tooltip>
            <Dropdown placement="top" onOpenChange={setOptionsOpen}>
              {/* The tooltip steps aside while the menu is open, so they don't overlap. */}
              <Tooltip content="Show options" mode="label" open={optionsOpen ? false : undefined}>
                <DropdownTrigger
                  variant="tertiary"
                  pill
                  iconOnly
                  chevron={false}
                  className={callButton}
                >
                  <EllipsisVertical aria-hidden />
                </DropdownTrigger>
              </Tooltip>
              <DropdownMenu className="w-48">
                <DropdownItem>Show participants</DropdownItem>
                <DropdownItem>Adjust volume</DropdownItem>
                <DropdownItem>Show information</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div
            role="group"
            aria-label="Meeting tools"
            className="ms-auto hidden items-center justify-center @2xl:flex"
          >
            <Tooltip content="Show participants" mode="label">
              <Button variant="ghost" pill iconOnly size="sm" className={toolButton}>
                <Users aria-hidden />
              </Button>
            </Tooltip>
            <VolumeControl />
            <Tooltip content="Show information" mode="label">
              <Button variant="ghost" pill iconOnly size="sm" className={toolButton}>
                <Info aria-hidden />
              </Button>
            </Tooltip>
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
