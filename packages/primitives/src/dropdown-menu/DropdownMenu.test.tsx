import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./DropdownMenu";

describe("DropdownMenu", () => {
  it("opens from the trigger and closes after an item is selected", () => {
    const onSelect = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Rename</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open actions" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Rename" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("moves focus through menu items with arrow keys", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>Archive</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const firstItem = screen.getByRole("menuitem", { name: "Rename" });

    expect(firstItem).toHaveFocus();

    fireEvent.keyDown(screen.getByRole("menu"), { key: "ArrowDown" });

    expect(screen.getByRole("menuitem", { name: "Duplicate" })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole("menu"), { key: "End" });

    expect(screen.getByRole("menuitem", { name: "Archive" })).toHaveFocus();
  });

  it("requests close on outside click and escape in controlled mode", () => {
    const onOpenChange = vi.fn();

    render(
      <div>
        <button type="button">Outside</button>
        <DropdownMenu onOpenChange={onOpenChange} open>
          <DropdownMenuTrigger>Open actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Rename</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );

    fireEvent.mouseDown(screen.getByRole("button", { name: "Outside" }));
    fireEvent.keyDown(window, { key: "Escape" });

    expect(onOpenChange).toHaveBeenCalledTimes(2);
    expect(onOpenChange).toHaveBeenNthCalledWith(1, false);
    expect(onOpenChange).toHaveBeenNthCalledWith(2, false);
  });

  it("supports explicit top/end placement for bottom-bar style menus", () => {
    render(
      <DropdownMenu align="end" placement="top">
        <DropdownMenuTrigger>Open actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Rename</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open actions" }));

    expect(screen.getByRole("menu")).toHaveAttribute("data-side", "top");
    expect(screen.getByRole("menu")).toHaveAttribute("data-align", "end");
  });
});
