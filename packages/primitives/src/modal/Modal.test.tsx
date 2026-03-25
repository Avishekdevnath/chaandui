import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders nothing when closed", () => {
    render(
      <Modal onOpenChange={() => {}} open={false} title="Invite team">
        Hidden content
      </Modal>
    );

    expect(screen.queryByRole("dialog", { name: "Invite team" })).toBeNull();
  });

  it("renders dialog content and closes on overlay click or escape", () => {
    const onOpenChange = vi.fn();

    render(
      <Modal description="Share workspace access." onOpenChange={onOpenChange} open title="Invite team">
        Modal body
      </Modal>
    );

    const dialog = screen.getByRole("dialog", { name: "Invite team" });

    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.mouseDown(screen.getByTestId("chaand-modal-overlay"));
    fireEvent.keyDown(window, { key: "Escape" });

    expect(onOpenChange).toHaveBeenCalledTimes(2);
    expect(onOpenChange).toHaveBeenNthCalledWith(1, false);
    expect(onOpenChange).toHaveBeenNthCalledWith(2, false);
  });

  it("restores focus to the previously active element when it closes", () => {
    const onOpenChange = vi.fn();

    function Harness({ open }: { open: boolean }) {
      return (
        <>
          <button type="button">Trigger</button>
          <Modal onOpenChange={onOpenChange} open={open} title="Compose">
            Body
          </Modal>
        </>
      );
    }

    const { rerender } = render(<Harness open={false} />);
    const trigger = screen.getByRole("button", { name: "Trigger" });

    trigger.focus();
    rerender(<Harness open />);

    expect(screen.getByRole("dialog", { name: "Compose" })).toHaveFocus();

    rerender(<Harness open={false} />);

    expect(trigger).toHaveFocus();
  });
});
