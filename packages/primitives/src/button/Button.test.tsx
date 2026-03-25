import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders a button with safe default attributes", () => {
    render(<Button>Send</Button>);

    const button = screen.getByRole("button", { name: "Send" });

    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-size", "md");
    expect(button).toHaveAttribute("data-variant", "solid");
    expect(button).toHaveAttribute("data-tone", "primary");
  });

  it("applies custom tone, variant, size, and className", () => {
    render(
      <Button className="custom-button" size="lg" tone="danger" variant="outline">
        Delete
      </Button>
    );

    const button = screen.getByRole("button", { name: "Delete" });

    expect(button).toHaveClass("chaand-button", "custom-button");
    expect(button).toHaveAttribute("data-size", "lg");
    expect(button).toHaveAttribute("data-variant", "outline");
    expect(button).toHaveAttribute("data-tone", "danger");
  });

  it("respects native button props", () => {
    render(
      <Button disabled type="submit">
        Save
      </Button>
    );

    const button = screen.getByRole("button", { name: "Save" });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("type", "submit");
  });
});
