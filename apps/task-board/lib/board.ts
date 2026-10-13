/** The board's columns, in display order. */
export const columns = [
  { id: "todo", title: "To do" },
  { id: "in-progress", title: "In progress" },
  { id: "done", title: "Done" },
] as const;

export type ColumnId = (typeof columns)[number]["id"];

export const priorities = ["low", "medium", "high"] as const;

export type Priority = (typeof priorities)[number];

export const priorityLabels: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  column: ColumnId;
};

/** What the add and edit forms collect. */
export type TaskDraft = Pick<Task, "title" | "description" | "priority" | "column">;

export type BoardAction =
  | { type: "add"; id: string; draft: TaskDraft }
  | { type: "update"; id: string; draft: TaskDraft }
  | { type: "delete"; id: string }
  /** Adds tasks (such as a plan's) whose ids aren't on the board yet; existing ones are kept. */
  | { type: "import"; tasks: Task[] }
  /** Moves a task to a column: before the task `beforeId`, or to the end of the column. */
  | { type: "move"; id: string; column: ColumnId; beforeId?: string };

/**
 * Every change to the board. Tasks live in one list; a column shows its tasks in list order, so
 * moving a task re-inserts it in the list next to its new neighbours.
 */
export function boardReducer(tasks: Task[], action: BoardAction): Task[] {
  switch (action.type) {
    case "add": {
      return [...tasks, { id: action.id, ...normalize(action.draft) }];
    }
    case "update": {
      const task = tasks.find((t) => t.id === action.id);
      if (!task) return tasks;
      const updated = { ...task, ...normalize(action.draft) };
      // A task moved to another column by the edit form goes to the end of that column.
      if (updated.column !== task.column) {
        return [...tasks.filter((t) => t.id !== action.id), updated];
      }
      return tasks.map((t) => (t.id === action.id ? updated : t));
    }
    case "delete": {
      return tasks.filter((t) => t.id !== action.id);
    }
    case "import": {
      const ids = new Set(tasks.map((t) => t.id));
      const added = action.tasks.filter((t) => !ids.has(t.id));
      return added.length > 0 ? [...tasks, ...added] : tasks;
    }
    case "move": {
      const task = tasks.find((t) => t.id === action.id);
      if (!task || action.beforeId === action.id) return tasks;
      const rest = tasks.filter((t) => t.id !== action.id);
      const moved = { ...task, column: action.column };
      const index = action.beforeId ? rest.findIndex((t) => t.id === action.beforeId) : -1;
      if (index === -1) return [...rest, moved];
      return [...rest.slice(0, index), moved, ...rest.slice(index)];
    }
  }
}

function normalize(draft: TaskDraft): TaskDraft {
  return { ...draft, title: draft.title.trim(), description: draft.description.trim() };
}

export function tasksIn(tasks: Task[], column: ColumnId) {
  return tasks.filter((task) => task.column === column);
}

export function columnTitle(column: ColumnId) {
  return columns.find((c) => c.id === column)?.title ?? column;
}

export function isColumnId(value: unknown): value is ColumnId {
  return columns.some((c) => c.id === value);
}

function isPriority(value: unknown): value is Priority {
  return priorities.some((p) => p === value);
}

/** Reads tasks saved by an earlier visit, dropping anything that is not a valid task. */
export function parseTasks(json: string | null): Task[] | null {
  if (!json) return null;
  try {
    const value: unknown = JSON.parse(json);
    if (!Array.isArray(value)) return null;
    return value.filter(
      (item): item is Task =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.description === "string" &&
        isPriority(item.priority) &&
        isColumnId(item.column),
    );
  } catch {
    return null;
  }
}

/** The board a first-time visitor sees, so it is clear what each column is for. */
export const sampleTasks: Task[] = [
  {
    id: "sample-1",
    title: "Add your first task",
    description: "Use “Add task” to create a card in any column.",
    priority: "high",
    column: "todo",
  },
  {
    id: "sample-2",
    title: "Drag a card to another column",
    description: "Or open a card's menu and choose where to move it.",
    priority: "medium",
    column: "in-progress",
  },
  {
    id: "sample-3",
    title: "Open the task board",
    description: "",
    priority: "low",
    column: "done",
  },
];
