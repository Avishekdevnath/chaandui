import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders a textarea with safe default attributes", () => {
    render(<Textarea aria-label="Message" />);

    const textarea = screen.getByRole("textbox", { name: "Message" });

    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("data-size", "md");
    expect(textarea).not.toHaveAttribute("aria-invalid");
  });

  it("applies invalid state, custom className, and native textarea props", () => {
    render(
      <Textarea
        aria-label="Notes"
        className="custom-textarea"
        defaultValue="Draft copy"
        invalid
        placeholder="Write something"
        rows={6}
        size="lg"
      />
    );

    const textarea = screen.getByRole("textbox", { name: "Notes" });

    expect(textarea).toHaveClass("chaand-textarea", "custom-textarea");
    expect(textarea).toHaveAttribute("data-size", "lg");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAttribute("rows", "6");
    expect(textarea).toHaveValue("Draft copy");
  });
});
