import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Select } from "./Select";

describe("Select", () => {
  it("renders a select with placeholder and option content", () => {
    render(
      <Select
        aria-label="Framework"
        options={[
          { label: "React", value: "react" },
          { label: "Vue", value: "vue" }
        ]}
        placeholder="Choose framework"
      />
    );

    const select = screen.getByRole("combobox", { name: "Framework" });

    expect(select).toHaveAttribute("data-size", "md");
    expect(screen.getByRole("option", { name: "Choose framework" })).toHaveValue("");
    expect(screen.getByRole("option", { name: "React" })).toHaveValue("react");
    expect(screen.getByRole("option", { name: "Vue" })).toHaveValue("vue");
  });

  it("applies invalid, disabled, custom className, and selected value", () => {
    render(
      <Select
        aria-label="Visibility"
        className="custom-select"
        defaultValue="private"
        disabled
        invalid
        options={[
          { label: "Public", value: "public" },
          { label: "Private", value: "private" }
        ]}
        size="lg"
      />
    );

    const select = screen.getByRole("combobox", { name: "Visibility" });

    expect(select).toHaveClass("chaand-select", "custom-select");
    expect(select).toHaveAttribute("data-size", "lg");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toBeDisabled();
    expect(select).toHaveValue("private");
  });
});
