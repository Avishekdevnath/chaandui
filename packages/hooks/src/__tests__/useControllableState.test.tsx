import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useControllableState } from "../useControllableState";

describe("useControllableState", () => {
  it("updates local state in uncontrolled mode", () => {
    const { result } = renderHook(() =>
      useControllableState({
        defaultValue: "initial"
      })
    );

    act(() => {
      result.current[1]("next");
    });

    expect(result.current[0]).toBe("next");
  });

  it("calls onChange and waits for external value updates in controlled mode", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) =>
        useControllableState({
          value,
          defaultValue: "fallback",
          onChange
        }),
      {
        initialProps: { value: "controlled" }
      }
    );

    act(() => {
      result.current[1]("updated");
    });

    expect(onChange).toHaveBeenCalledWith("updated");
    expect(result.current[0]).toBe("controlled");

    rerender({ value: "updated" });

    expect(result.current[0]).toBe("updated");
  });
});
