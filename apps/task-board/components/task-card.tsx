"use client";

import { ArrowRight, EllipsisVertical, SquarePen, Trash2 } from "@stefan-florescu/icons";
import {
  Badge,
  Card,
  Dropdown,
  DropdownDivider,
  DropdownGroup,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
} from "@stefan-florescu/ui";
import type { DragEvent } from "react";

import { columns, priorityLabels, type ColumnId, type Priority, type Task } from "@/lib/board";

const priorityBadge = {
  low: "gray",
  medium: "warning",
  high: "danger",
} as const satisfies Record<Priority, string>;

/** The `dataTransfer` type a dragged task carries its id in. */
export const taskDragType = "application/x-task-id";

export type TaskCardProps = {
  task: Task;
  /** Whether this card is the one being dragged. */
  dragging: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  /** A dragged task is dropped on this card: put it before this one. */
  onDropBefore: (draggedId: string, beforeId: string) => void;
  onEdit: (task: Task) => void;
  onMove: (task: Task, column: ColumnId) => void;
  onDelete: (task: Task) => void;
};

/**
 * One task. Drag it to another column (or onto another card to place it there), or use its
 * menu, which works with the keyboard and on touch screens.
 */
export function TaskCard({
  task,
  dragging,
  onDragStart,
  onDragEnd,
  onDropBefore,
  onEdit,
  onMove,
  onDelete,
}: TaskCardProps) {
  const titleId = `task-${task.id}-title`;

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(taskDragType, task.id);
    event.dataTransfer.effectAllowed = "move";
    onDragStart(task.id);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (!event.dataTransfer.types.includes(taskDragType)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    const draggedId = event.dataTransfer.getData(taskDragType);
    if (!draggedId) return;
    event.preventDefault();
    // The column under this card would otherwise move the task to the end.
    event.stopPropagation();
    onDropBefore(draggedId, task.id);
  };

  return (
    <Card
      role="article"
      aria-labelledby={titleId}
      data-task-id={task.id}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={cn("cursor-grab *:p-4 active:cursor-grabbing", dragging && "opacity-50")}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 id={titleId} className="text-heading text-base leading-6 font-semibold break-words">
          {task.title}
        </h3>
        <Dropdown placement="bottom-end">
          <DropdownTrigger
            variant="ghost"
            size="xs"
            iconOnly
            chevron={false}
            aria-label={`Actions for “${task.title}”`}
            data-task-menu
            className="-me-2 -mt-1 shrink-0"
          >
            <EllipsisVertical aria-hidden />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onClick={() => onEdit(task)}>
              <SquarePen aria-hidden />
              Edit
            </DropdownItem>
            <DropdownDivider />
            <DropdownGroup aria-label="Move to">
              {columns
                .filter((column) => column.id !== task.column)
                .map((column) => (
                  <DropdownItem key={column.id} onClick={() => onMove(task, column.id)}>
                    <ArrowRight aria-hidden />
                    Move to {column.title}
                  </DropdownItem>
                ))}
            </DropdownGroup>
            <DropdownDivider />
            <DropdownItem variant="danger" onClick={() => onDelete(task)}>
              <Trash2 aria-hidden />
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {task.description ? (
        <p className="text-body mt-1 text-sm break-words whitespace-pre-line">{task.description}</p>
      ) : null}
      <div className="mt-3">
        <Badge variant={priorityBadge[task.priority]}>
          <span className="sr-only">Priority: </span>
          {priorityLabels[task.priority]}
        </Badge>
      </div>
    </Card>
  );
}
