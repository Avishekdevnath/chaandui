import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders an inline badge with safe default attrs", () => {
    render(<Badge>Stable</Badge>);

    const badge = screen.getByText("Stable");

    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass("chaand-badge");
    expect(badge).toHaveAttribute("data-size", "md");
    expect(badge).toHaveAttribute("data-tone", "primary");
    expect(badge).toHaveAttribute("data-variant", "soft");
  });

  it("applies custom tone, variant, size, and className", () => {
    render(
      <Badge className="custom-badge" size="lg" tone="warning" variant="outline">
        In Review
      </Badge>
    );

    const badge = screen.getByText("In Review");

    expect(badge).toHaveClass("chaand-badge", "custom-badge");
    expect(badge).toHaveAttribute("data-size", "lg");
    expect(badge).toHaveAttribute("data-tone", "warning");
    expect(badge).toHaveAttribute("data-variant", "outline");
  });
});
