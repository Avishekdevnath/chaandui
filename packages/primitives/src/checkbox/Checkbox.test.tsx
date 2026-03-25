import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a checkbox with label and description wiring", () => {
    render(<Checkbox description="Used in weekly summaries." label="Email updates" />);

    const checkbox = screen.getByRole("checkbox", { name: "Email updates" });
    const description = screen.getByText("Used in weekly summaries.");

    expect(checkbox).toHaveAttribute("type", "checkbox");
    expect(checkbox).toHaveAttribute("data-size", "md");
    expect(checkbox).toHaveAttribute("aria-describedby", description.id);
  });

  it("applies checked, invalid, disabled, and custom className state", () => {
    render(
      <Checkbox
        checked
        className="custom-checkbox"
        disabled
        invalid
        label="Launch now"
        onChange={() => {}}
        size="lg"
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: "Launch now" });
    const root = checkbox.closest("label");

    expect(root).toHaveClass("chaand-checkbox", "custom-checkbox");
    expect(checkbox).toBeChecked();
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAttribute("data-size", "lg");
  });
});
