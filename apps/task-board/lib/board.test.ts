import { describe, expect, it } from "vitest";

import { boardReducer, parseTasks, tasksIn, type Task } from "./board";

const task = (id: string, column: Task["column"]): Task => ({
  id,
  title: `Task ${id}`,
  description: "",
  priority: "medium",
  column,
});

const ids = (tasks: Task[]) => tasks.map((t) => t.id);

describe("boardReducer", () => {
  const board = [task("a", "todo"), task("b", "todo"), task("c", "done")];

  it("adds a task with a trimmed title and description", () => {
    const next = boardReducer(board, {
      type: "add",
      id: "d",
      draft: { title: "  Write docs ", description: " soon ", priority: "high", column: "done" },
    });
    expect(next.at(-1)).toEqual({
      id: "d",
      title: "Write docs",
      description: "soon",
      priority: "high",
      column: "done",
    });
  });

  it("moves a task to the end of another column", () => {
    const next = boardReducer(board, { type: "move", id: "a", column: "done" });
    expect(ids(tasksIn(next, "todo"))).toEqual(["b"]);
    expect(ids(tasksIn(next, "done"))).toEqual(["c", "a"]);
  });

  it("moves a task before another task", () => {
    const next = boardReducer(board, { type: "move", id: "c", column: "todo", beforeId: "b" });
    expect(ids(tasksIn(next, "todo"))).toEqual(["a", "c", "b"]);
    expect(tasksIn(next, "done")).toEqual([]);
  });

  it("ignores a drop of a task onto itself", () => {
    expect(boardReducer(board, { type: "move", id: "a", column: "todo", beforeId: "a" })).toBe(
      board,
    );
  });

  it("updates a task in place, or at the end of its new column", () => {
    const draft = { title: "Renamed", description: "", priority: "low" as const };
    const same = boardReducer(board, {
      type: "update",
      id: "a",
      draft: { ...draft, column: "todo" },
    });
    expect(ids(same)).toEqual(["a", "b", "c"]);
    expect(same[0]?.title).toBe("Renamed");

    const moved = boardReducer(board, {
      type: "update",
      id: "a",
      draft: { ...draft, column: "done" },
    });
    expect(ids(tasksIn(moved, "done"))).toEqual(["c", "a"]);
  });

  it("deletes a task", () => {
    expect(ids(boardReducer(board, { type: "delete", id: "b" }))).toEqual(["a", "c"]);
  });
});

describe("parseTasks", () => {
  it("returns null when nothing valid is saved", () => {
    expect(parseTasks(null)).toBeNull();
    expect(parseTasks("not json")).toBeNull();
    expect(parseTasks("{}")).toBeNull();
  });

  it("keeps only valid tasks", () => {
    const saved = JSON.stringify([task("a", "todo"), { id: "b", title: "No column" }]);
    expect(ids(parseTasks(saved) ?? [])).toEqual(["a"]);
  });
});

describe("import", () => {
  it("adds only the tasks that aren't on the board, keeping the board's changes", () => {
    const board = [task("a", "done")];
    const next = boardReducer(board, {
      type: "import",
      tasks: [task("a", "todo"), task("b", "todo")],
    });
    expect(next.map((t) => [t.id, t.column])).toEqual([
      ["a", "done"],
      ["b", "todo"],
    ]);
    expect(boardReducer(next, { type: "import", tasks: [task("b", "todo")] })).toBe(next);
  });
});
