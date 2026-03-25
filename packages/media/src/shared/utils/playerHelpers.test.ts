import { describe, expect, it } from "vitest";

import { resolveMediaPlayerTheme } from "./playerHelpers";

describe("resolveMediaPlayerTheme", () => {
  it("prefers explicit theme", () => {
    expect(resolveMediaPlayerTheme({ theme: "aurora" })).toBe("aurora");
  });

  it("falls back to legacy skin", () => {
    expect(resolveMediaPlayerTheme({ skin: "luxe" })).toBe("luxe");
  });

  it("uses default theme when no explicit value exists", () => {
    expect(resolveMediaPlayerTheme({ defaultTheme: "midnight" })).toBe("midnight");
  });

  it("falls back to cinema by default", () => {
    expect(resolveMediaPlayerTheme({})).toBe("cinema");
  });
});
