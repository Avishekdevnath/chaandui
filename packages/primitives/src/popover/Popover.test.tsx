import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

describe("Popover", () => {
  it("opens and closes in uncontrolled mode when the trigger is pressed", () => {
    render(
      <Popover>
        <PopoverTrigger>Open filters</PopoverTrigger>
        <PopoverContent>Filter content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: "Open filters" });

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);

    expect(screen.getByRole("dialog")).toHaveTextContent("Filter content");
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(trigger);

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("calls onOpenChange when escape or outside click requests close in controlled mode", () => {
    const onOpenChange = vi.fn();

    render(
      <div>
        <button type="button">Outside</button>
        <Popover onOpenChange={onOpenChange} open>
          <PopoverTrigger>Open filters</PopoverTrigger>
          <PopoverContent>Filter content</PopoverContent>
        </Popover>
      </div>
    );

    fireEvent.mouseDown(screen.getByRole("button", { name: "Outside" }));
    fireEvent.keyDown(window, { key: "Escape" });

    expect(onOpenChange).toHaveBeenCalledTimes(2);
    expect(onOpenChange).toHaveBeenNthCalledWith(1, false);
    expect(onOpenChange).toHaveBeenNthCalledWith(2, false);
  });

  it("moves focus into the content and restores it to the trigger when the popover closes", () => {
    const onOpenChange = vi.fn();

    function Harness({ open }: { open: boolean }) {
      return (
        <Popover onOpenChange={onOpenChange} open={open}>
          <PopoverTrigger>Open details</PopoverTrigger>
          <PopoverContent>Details panel</PopoverContent>
        </Popover>
      );
    }

    const { rerender } = render(<Harness open={false} />);
    const trigger = screen.getByRole("button", { name: "Open details" });

    trigger.focus();
    rerender(<Harness open />);

    expect(screen.getByRole("dialog")).toHaveFocus();

    rerender(<Harness open={false} />);

    expect(trigger).toHaveFocus();
  });

  it("exposes explicit side and align state for positioned content", () => {
    render(
      <Popover align="end" placement="top">
        <PopoverTrigger>Open actions</PopoverTrigger>
        <PopoverContent>Aligned content</PopoverContent>
      </Popover>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open actions" }));

    expect(screen.getByRole("dialog")).toHaveAttribute("data-side", "top");
    expect(screen.getByRole("dialog")).toHaveAttribute("data-align", "end");
  });
});
