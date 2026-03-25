import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ToastProvider, useToast } from "./Toast";

function Harness() {
  const { pushToast } = useToast();

  return (
    <button
      onClick={() =>
        pushToast({
          description: "Phase 3 overlays shipped.",
          title: "Saved",
          tone: "success"
        })
      }
      type="button"
    >
      Notify
    </button>
  );
}

describe("Toast", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a toast from provider state when pushToast is called", () => {
    render(
      <ToastProvider>
        <Harness />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Notify" }));

    expect(screen.getByRole("status")).toHaveTextContent("Saved");
    expect(screen.getByRole("status")).toHaveTextContent("Phase 3 overlays shipped.");
  });

  it("dismisses a toast when its close button is pressed", () => {
    render(
      <ToastProvider>
        <Harness />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Notify" }));
    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));

    expect(screen.queryByRole("status")).toBeNull();
  });

  it("auto dismisses a toast after its duration", () => {
    vi.useFakeTimers();

    function AutoDismissHarness() {
      const { pushToast } = useToast();

      return (
        <button
          onClick={() =>
            pushToast({
              description: "This one should disappear.",
              duration: 1500,
              title: "Auto",
              tone: "neutral"
            })
          }
          type="button"
        >
          Auto notify
        </button>
      );
    }

    render(
      <ToastProvider>
        <AutoDismissHarness />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Auto notify" }));

    expect(screen.getByRole("status")).toHaveTextContent("Auto");

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.queryByRole("status")).toBeNull();
  });
});
