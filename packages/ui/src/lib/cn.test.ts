import { cn } from "./cn";

describe("cn", () => {
  it("joins truthy class names and drops falsy ones", () => {
    const isActive = false;
    expect(cn("a", isActive && "b", undefined, "c")).toBe("a c");
  });

  it("resolves conflicting Tailwind utilities, last one wins", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("knows the rounded-base radius", () => {
    expect(cn("rounded-base", "rounded-full")).toBe("rounded-full");
  });
});
