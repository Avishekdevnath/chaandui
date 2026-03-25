import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useLockBodyScroll } from "../useLockBodyScroll";

describe("useLockBodyScroll", () => {
  it("locks body overflow when enabled and restores it when disabled", () => {
    document.body.style.overflow = "auto";

    const { rerender } = renderHook(({ enabled }) => useLockBodyScroll(enabled), {
      initialProps: { enabled: true }
    });

    expect(document.body.style.overflow).toBe("hidden");

    rerender({ enabled: false });

    expect(document.body.style.overflow).toBe("auto");
  });

  it("restores the original overflow on unmount", () => {
    document.body.style.overflow = "scroll";

    const { unmount } = renderHook(() => useLockBodyScroll(true));

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("scroll");
  });
});
