"use client";

import { ClipboardList } from "@stefan-florescu/icons";
import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@stefan-florescu/ui";

import { columns, tasksIn, type Task } from "@/lib/board";
import { missingTasks, plans, type Plan } from "@/lib/plans";

export type ImportPlanModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tasks: Task[];
  onImport: (plan: Plan, tasks: Task[]) => void;
};

/** Lists the project plans that can be added to the board as tasks. */
export function ImportPlanModal({ open, onOpenChange, tasks, onImport }: ImportPlanModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} size="lg">
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Import a project plan</ModalTitle>
          <ModalClose label="Close" />
        </ModalHeader>
        <ModalBody>
          <p className="text-body mb-4">
            Adds a plan&apos;s tasks to your board, each in the column that matches how far it has
            got. Tasks you already have are left as they are.
          </p>
          <ul className="flex flex-col gap-3">
            {plans.map((plan) => {
              const missing = missingTasks(plan, tasks);
              return (
                <li
                  key={plan.id}
                  className="rounded-base border-default flex flex-col gap-3 border p-4 sm:flex-row sm:items-center"
                >
                  <ClipboardList aria-hidden className="text-fg-brand size-6 shrink-0" />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="text-heading font-semibold">{plan.name}</p>
                    <p className="text-body text-sm">{plan.description}</p>
                    <ul className="flex flex-wrap gap-1.5" aria-label="Tasks by column">
                      {columns.map((column) => (
                        <li key={column.id}>
                          <Badge variant="gray">
                            {column.title}: {tasksIn(plan.tasks, column.id).length}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {missing.length > 0 ? (
                    <Button
                      size="sm"
                      onClick={() => {
                        onImport(plan, missing);
                        onOpenChange(false);
                      }}
                    >
                      Import {missing.length} {missing.length === 1 ? "task" : "tasks"}
                    </Button>
                  ) : (
                    <Badge variant="success" size="lg">
                      On your board
                    </Badge>
                  )}
                </li>
              );
            })}
          </ul>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">Close</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
