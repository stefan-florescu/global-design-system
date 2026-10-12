"use client";

import {
  Button,
  Input,
  Label,
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Select,
  Textarea,
} from "@stefan-florescu/ui";
import { useId, type FormEvent } from "react";

import { columns, isColumnId, priorities, priorityLabels, type TaskDraft } from "@/lib/board";

export type TaskFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** `add` creates a task; `edit` saves changes to one. */
  mode: "add" | "edit";
  /** The form's starting values. */
  initial: TaskDraft;
  onSubmit: (draft: TaskDraft) => void;
};

/** The add / edit task dialog. */
export function TaskFormModal({ open, onOpenChange, mode, initial, onSubmit }: TaskFormModalProps) {
  const id = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const column = data.get("column");
    const priority = priorities.find((p) => p === data.get("priority")) ?? "medium";
    onSubmit({
      title: String(data.get("title") ?? ""),
      description: String(data.get("description") ?? ""),
      priority,
      column: isColumnId(column) ? column : initial.column,
    });
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} size="md">
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{mode === "add" ? "Add task" : "Edit task"}</ModalTitle>
          <ModalClose label="Close" />
        </ModalHeader>
        {/* Keyed by the starting values, so reopening the dialog resets the fields. */}
        <form key={JSON.stringify(initial)} onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 py-4 md:py-6">
            <div className="col-span-2">
              <Label htmlFor={`${id}-title`}>Title</Label>
              <Input
                id={`${id}-title`}
                name="title"
                defaultValue={initial.title}
                placeholder="What needs doing?"
                required
                // Whitespace-only titles are rejected by the browser's validation.
                pattern=".*\S.*"
                maxLength={120}
                data-autofocus
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor={`${id}-description`}>
                Description <span className="text-body-subtle font-normal">(optional)</span>
              </Label>
              <Textarea
                id={`${id}-description`}
                name="description"
                defaultValue={initial.description}
                placeholder="Add details"
                rows={3}
                maxLength={1000}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor={`${id}-priority`}>Priority</Label>
              <Select id={`${id}-priority`} name="priority" defaultValue={initial.priority}>
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priorityLabels[priority]}
                  </option>
                ))}
              </Select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor={`${id}-column`}>Column</Label>
              <Select id={`${id}-column`} name="column" defaultValue={initial.column}>
                {columns.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.title}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="border-default flex items-center gap-4 border-t pt-4 md:pt-6">
            <Button type="submit">{mode === "add" ? "Add task" : "Save changes"}</Button>
            <ModalClose asChild>
              <Button variant="secondary">Cancel</Button>
            </ModalClose>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
}
