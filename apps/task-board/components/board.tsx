"use client";

import { Plus } from "@stefan-florescu/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  SkeletonBlock,
} from "@stefan-florescu/ui";
import { useState } from "react";

import {
  columns,
  columnTitle,
  tasksIn,
  type ColumnId,
  type Task,
  type TaskDraft,
} from "@/lib/board";
import { useBoard } from "@/lib/use-board";

import { BoardColumn } from "./board-column";
import { TaskCard } from "./task-card";
import { TaskFormModal } from "./task-form-modal";

type FormState =
  { mode: "add"; initial: TaskDraft } | { mode: "edit"; taskId: string; initial: TaskDraft };

const emptyDraft: TaskDraft = { title: "", description: "", priority: "medium", column: "todo" };

/** Focuses an element once React has re-rendered the board, e.g. a card in its new column. */
function focusAfterRender(selector: string) {
  requestAnimationFrame(() => document.querySelector<HTMLElement>(selector)?.focus());
}

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** The task board: three columns of tasks that can be added, edited, moved and deleted. */
export function Board() {
  const { tasks, dispatch } = useBoard();
  const [form, setForm] = useState<FormState | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<Task | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  // Read out by screen readers after each change.
  const [announcement, setAnnouncement] = useState("");

  const find = (id: string) => tasks?.find((task) => task.id === id);

  const openForm = (next: FormState) => {
    setForm(next);
    setFormOpen(true);
  };

  const moveTask = (id: string, column: ColumnId, beforeId?: string) => {
    const task = find(id);
    if (!task) return;
    dispatch({ type: "move", id, column, beforeId });
    setAnnouncement(
      task.column === column
        ? `Reordered “${task.title}” in ${columnTitle(column)}.`
        : `Moved “${task.title}” to ${columnTitle(column)}.`,
    );
  };

  const submitForm = (draft: TaskDraft) => {
    if (!form) return;
    if (form.mode === "add") {
      const id = newId();
      dispatch({ type: "add", id, draft });
      setAnnouncement(`Added “${draft.title.trim()}” to ${columnTitle(draft.column)}.`);
    } else {
      dispatch({ type: "update", id: form.taskId, draft });
      setAnnouncement(`Saved “${draft.title.trim()}”.`);
    }
  };

  const confirmDelete = () => {
    if (!deleting) return;
    dispatch({ type: "delete", id: deleting.id });
    setAnnouncement(`Deleted “${deleting.title}”.`);
    // The deleted card's menu had focus: continue from its column's "Add task" button.
    focusAfterRender(`[data-column-add="${deleting.column}"]`);
    setDeleting(null);
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-heading text-3xl font-bold">Task Board</h1>
          <p className="text-body">
            Add tasks and drag them between columns, or use a card&apos;s menu to move it.
          </p>
        </div>
        <Button onClick={() => openForm({ mode: "add", initial: emptyDraft })}>
          <Plus aria-hidden />
          Add task
        </Button>
      </div>

      {tasks === null ? (
        <div className="grid gap-6 md:grid-cols-3" aria-busy="true" aria-label="Loading tasks">
          {columns.map((column) => (
            <SkeletonBlock key={column.id} className="h-64" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {columns.map((column) => {
            const columnTasks = tasksIn(tasks, column.id);
            return (
              <BoardColumn
                key={column.id}
                id={column.id}
                title={column.title}
                count={columnTasks.length}
                onDropTask={(taskId, columnId) => moveTask(taskId, columnId)}
                onAdd={(columnId) =>
                  openForm({ mode: "add", initial: { ...emptyDraft, column: columnId } })
                }
              >
                {columnTasks.length > 0 ? (
                  <ul className="flex flex-col gap-3">
                    {columnTasks.map((task) => (
                      <li key={task.id}>
                        <TaskCard
                          task={task}
                          dragging={draggingId === task.id}
                          onDragStart={setDraggingId}
                          onDragEnd={() => setDraggingId(null)}
                          onDropBefore={(draggedId, beforeId) =>
                            moveTask(draggedId, task.column, beforeId)
                          }
                          onEdit={(t) =>
                            openForm({
                              mode: "edit",
                              taskId: t.id,
                              initial: {
                                title: t.title,
                                description: t.description,
                                priority: t.priority,
                                column: t.column,
                              },
                            })
                          }
                          onMove={(t, columnId) => {
                            moveTask(t.id, columnId);
                            // Keep focus on the card, now in its new column.
                            focusAfterRender(`[data-task-id="${t.id}"] [data-task-menu]`);
                          }}
                          onDelete={setDeleting}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="rounded-base border-default-medium text-body-subtle border border-dashed p-4 text-center text-sm">
                    No tasks yet. Drop one here or add a new task.
                  </p>
                )}
              </BoardColumn>
            );
          })}
        </div>
      )}

      {form ? (
        <TaskFormModal
          open={formOpen}
          onOpenChange={setFormOpen}
          mode={form.mode}
          initial={form.initial}
          onSubmit={submitForm}
        />
      ) : null}

      <Modal
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
        size="md"
      >
        <ModalContent role="alertdialog">
          <ModalHeader>
            <ModalTitle>Delete task?</ModalTitle>
            <ModalClose label="Close" />
          </ModalHeader>
          <ModalBody>
            <p className="text-body">
              “{deleting?.title}” will be removed from the board. This can&apos;t be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
            <ModalClose asChild>
              <Button variant="secondary" data-autofocus>
                Cancel
              </Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div aria-live="polite" role="status" className="sr-only">
        {announcement}
      </div>
    </>
  );
}
