"use client";

import { Plus } from "@stefan-florescu/icons";
import { Badge, Button, cn } from "@stefan-florescu/ui";
import { useState, type DragEvent, type ReactNode } from "react";

import type { ColumnId } from "@/lib/board";

import { taskDragType } from "./task-card";

export type BoardColumnProps = {
  id: ColumnId;
  title: string;
  count: number;
  /** A task dropped on the column, outside any card: it goes to the end. */
  onDropTask: (taskId: string, column: ColumnId) => void;
  onAdd: (column: ColumnId) => void;
  /** The column's task cards. */
  children: ReactNode;
};

/** A board column: its heading and task count, the tasks, and a button to add one here. */
export function BoardColumn({ id, title, count, onDropTask, onAdd, children }: BoardColumnProps) {
  const headingId = `column-${id}-heading`;
  // Counts dragenter/dragleave pairs, which also fire for every card the pointer crosses.
  const [dragDepth, setDragDepth] = useState(0);

  const isTaskDrag = (event: DragEvent) => event.dataTransfer.types.includes(taskDragType);

  return (
    // Drag and drop is a pointer shortcut; keyboard and touch users move tasks from the card menu.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section
      aria-labelledby={headingId}
      data-column={id}
      onDragEnter={(event) => {
        if (isTaskDrag(event)) setDragDepth((depth) => depth + 1);
      }}
      onDragLeave={(event) => {
        if (isTaskDrag(event)) setDragDepth((depth) => Math.max(0, depth - 1));
      }}
      onDragOver={(event) => {
        if (!isTaskDrag(event)) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }}
      onDrop={(event) => {
        setDragDepth(0);
        const taskId = event.dataTransfer.getData(taskDragType);
        if (!taskId) return;
        event.preventDefault();
        onDropTask(taskId, id);
      }}
      onDragEnd={() => setDragDepth(0)}
      className={cn(
        "rounded-base border-default bg-neutral-secondary-soft flex min-h-64 flex-col gap-4 border p-4 transition-colors motion-reduce:transition-none",
        dragDepth > 0 && "border-brand bg-brand-softer",
      )}
    >
      <header className="flex items-center justify-between gap-2">
        <h2 id={headingId} className="text-heading flex items-center gap-2 text-lg font-semibold">
          {title}
          <Badge variant="gray" bordered>
            {count}
            <span className="sr-only">{count === 1 ? " task" : " tasks"}</span>
          </Badge>
        </h2>
      </header>
      {children}
      <Button
        variant="ghost"
        size="sm"
        className="mt-auto justify-start"
        onClick={() => onAdd(id)}
        data-column-add={id}
      >
        <Plus aria-hidden />
        Add task<span className="sr-only"> to {title}</span>
      </Button>
    </section>
  );
}
