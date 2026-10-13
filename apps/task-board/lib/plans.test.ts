import { describe, expect, it } from "vitest";

import { parseTasks } from "./board";
import { missingTasks, priceTrackerPlan } from "./plans";

describe("priceTrackerPlan", () => {
  it("has every task from the plan, with unique ids", () => {
    const codes = priceTrackerPlan.tasks.map((t) => t.title.split(" ")[0]);
    expect(codes).toContain("T1.1");
    expect(codes).toContain("T3.11");
    expect(codes).toContain("T7.6");
    expect(codes).toHaveLength(45);
    expect(new Set(priceTrackerPlan.tasks.map((t) => t.id)).size).toBe(45);
  });

  it("is made of valid tasks", () => {
    expect(parseTasks(JSON.stringify(priceTrackerPlan.tasks))).toEqual(priceTrackerPlan.tasks);
  });

  it("lists the tasks missing from a board", () => {
    const [first, ...rest] = priceTrackerPlan.tasks;
    expect(missingTasks(priceTrackerPlan, first ? [first] : [])).toEqual(rest);
  });
});
