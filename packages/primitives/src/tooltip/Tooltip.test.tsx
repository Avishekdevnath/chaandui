import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("opens on hover and closes on pointer leave", () => {
    render(
      <Tooltip content="Phase 3 overlays are in progress.">
        <button type="button">Hover target</button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: "Hover target" });

    expect(screen.queryByRole("tooltip")).toBeNull();

    fireEvent.mouseEnter(trigger);

    expect(screen.getByRole("tooltip")).toHaveTextContent("Phase 3 overlays are in progress.");

    fireEvent.mouseLeave(trigger);

    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("opens on focus and requests close on escape", () => {
    const onOpenChange = vi.fn();

    render(
      <Tooltip content="Keyboard users should get the same hint." onOpenChange={onOpenChange}>
        <button type="button">Focus target</button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: "Focus target" });

    fireEvent.focus(trigger);
    fireEvent.keyDown(window, { key: "Escape" });

    expect(onOpenChange).toHaveBeenNthCalledWith(1, true);
    expect(onOpenChange).toHaveBeenNthCalledWith(2, false);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("respects controlled open state and wires the trigger with aria-describedby", () => {
    render(
      <Tooltip content="Controlled hint" open>
        <button type="button">Controlled trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: "Controlled trigger" });
    const tooltip = screen.getByRole("tooltip");

    expect(trigger).toHaveAttribute("aria-describedby", tooltip.getAttribute("id"));
  });
});
