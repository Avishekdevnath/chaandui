import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders an input with safe default attributes", () => {
    render(<Input aria-label="Email" />);

    const input = screen.getByRole("textbox", { name: "Email" });

    expect(input.tagName).toBe("INPUT");
    expect(input).toHaveAttribute("data-size", "md");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("applies invalid state, custom className, and native input props", () => {
    render(
      <Input
        aria-label="Search"
        className="custom-input"
        defaultValue="Chaand"
        invalid
        placeholder="Search components"
        size="lg"
      />
    );

    const input = screen.getByRole("textbox", { name: "Search" });

    expect(input).toHaveClass("chaand-input", "custom-input");
    expect(input).toHaveAttribute("data-size", "lg");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("placeholder", "Search components");
    expect(input).toHaveValue("Chaand");
  });
});
