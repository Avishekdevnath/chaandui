import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useOutsideClick } from "../useOutsideClick";

function TestComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
  const ref = React.useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onOutsideClick);

  return (
    <div>
      <div ref={ref}>inside</div>
      <button type="button">outside</button>
    </div>
  );
}

describe("useOutsideClick", () => {
  it("calls the handler when a click happens outside the ref", () => {
    const handler = vi.fn();

    render(<TestComponent onOutsideClick={handler} />);

    fireEvent.mouseDown(screen.getByRole("button", { name: "outside" }));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not call the handler for inside clicks", () => {
    const handler = vi.fn();

    render(<TestComponent onOutsideClick={handler} />);

    fireEvent.mouseDown(screen.getByText("inside"));

    expect(handler).not.toHaveBeenCalled();
  });
});
