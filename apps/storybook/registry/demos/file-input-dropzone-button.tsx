"use client";

import { useRef } from "react";

import { Search, Upload } from "@stefan-florescu/icons";
import { Button } from "@stefan-florescu/ui";

export default function FileInputDropzoneButton() {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="border-input bg-neutral-secondary-medium rounded-base flex h-64 w-full flex-col items-center justify-center border border-dashed">
        <div className="text-body flex flex-col items-center justify-center pt-5 pb-6">
          <Upload aria-hidden className="mb-4 size-8" />
          <p className="mb-2 text-sm">Click the button below to upload</p>
          <p className="mb-4 text-xs">
            Max. File Size: <span className="font-semibold">30MB</span>
          </p>
          <Button size="sm" onClick={() => input.current?.click()}>
            <Search aria-hidden />
            Browse file
          </Button>
        </div>
      </div>
      {/* The button opens the file dialog, so the input itself stays out of the tab order. */}
      <input ref={input} type="file" hidden aria-label="Browse file" />
    </div>
  );
}
