import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useRovingFocus } from "./useRovingFocus";

function Toolbar() {
  const { getRovingProps, toolbarProps } = useRovingFocus({ itemCount: 3 });

  return (
    <div {...toolbarProps} data-testid="toolbar">
      <button {...getRovingProps(0)}>A</button>
      <button {...getRovingProps(1)}>B</button>
      <button {...getRovingProps(2)}>C</button>
    </div>
  );
}

describe("useRovingFocus", () => {
  it("sets tabIndex 0 on first item, -1 on others", () => {
    render(<Toolbar />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("tabindex", "0");
    expect(buttons[1]).toHaveAttribute("tabindex", "-1");
    expect(buttons[2]).toHaveAttribute("tabindex", "-1");
  });

  it("moves focus with ArrowRight", () => {
    render(<Toolbar />);
    const buttons = screen.getAllByRole("button");
    buttons[0].focus();
    fireEvent.keyDown(buttons[0], { key: "ArrowRight" });
    expect(buttons[1]).toHaveFocus();
  });

  it("moves focus with ArrowLeft", () => {
    render(<Toolbar />);
    const buttons = screen.getAllByRole("button");
    buttons[1].focus();
    fireEvent.keyDown(buttons[1], { key: "ArrowLeft" });
    expect(buttons[0]).toHaveFocus();
  });

  it("wraps with Home and End", () => {
    render(<Toolbar />);
    const buttons = screen.getAllByRole("button");
    buttons[0].focus();
    fireEvent.keyDown(buttons[0], { key: "End" });
    expect(buttons[2]).toHaveFocus();
    fireEvent.keyDown(buttons[2], { key: "Home" });
    expect(buttons[0]).toHaveFocus();
  });

  it("flips arrow direction in RTL", () => {
    function RtlToolbar() {
      const { getRovingProps, toolbarProps } = useRovingFocus({ itemCount: 3, rtl: true });
      return (
        <div {...toolbarProps}>
          <button {...getRovingProps(0)}>A</button>
          <button {...getRovingProps(1)}>B</button>
          <button {...getRovingProps(2)}>C</button>
        </div>
      );
    }
    render(<RtlToolbar />);
    const buttons = screen.getAllByRole("button");
    buttons[0].focus();
    fireEvent.keyDown(buttons[0], { key: "ArrowLeft" });
    expect(buttons[1]).toHaveFocus();
  });
});
