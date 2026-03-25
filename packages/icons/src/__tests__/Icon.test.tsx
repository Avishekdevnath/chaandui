import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from "../Icon";

describe("Icon", () => {
  it("is aria-hidden by default", () => {
    render(
      <Icon data-testid="icon">
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );

    const icon = screen.getByTestId("icon");

    expect(icon.getAttribute("aria-hidden")).toBe("true");
    expect(icon.getAttribute("role")).toBeNull();
  });

  it("uses the label for accessibility and applies mapped sizing", () => {
    render(
      <Icon data-testid="icon" label="Search" size="lg">
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );

    const icon = screen.getByTestId("icon");

    expect(icon.getAttribute("role")).toBe("img");
    expect(icon.getAttribute("aria-label")).toBe("Search");
    expect(icon.style.width).toBe("var(--chaand-space-6)");
    expect(icon.style.height).toBe("var(--chaand-space-6)");
  });
});
