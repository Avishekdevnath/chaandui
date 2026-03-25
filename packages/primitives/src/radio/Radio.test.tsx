import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Radio, RadioGroup } from "./Radio";

describe("RadioGroup", () => {
  it("renders grouped radios with a shared name and accessible group label", () => {
    render(
      <RadioGroup description="Choose one theme." label="Theme" name="theme">
        <Radio label="Light" value="light" />
        <Radio description="Recommended for low-light work." label="Dark" value="dark" />
      </RadioGroup>
    );

    const group = screen.getByRole("radiogroup", { name: "Theme" });
    const light = screen.getByRole("radio", { name: "Light" });
    const dark = screen.getByRole("radio", { name: "Dark" });

    expect(group).toHaveAttribute("aria-describedby");
    expect(light).toHaveAttribute("name", "theme");
    expect(dark).toHaveAttribute("name", "theme");
  });

  it("applies checked, invalid, disabled, and size state to radios", () => {
    render(
      <RadioGroup invalid name="visibility" size="lg">
        <Radio checked label="Public" onChange={() => {}} value="public" />
        <Radio disabled label="Private" value="private" />
      </RadioGroup>
    );

    const publicRadio = screen.getByRole("radio", { name: "Public" });
    const privateRadio = screen.getByRole("radio", { name: "Private" });
    const root = publicRadio.closest("label");

    expect(root).toHaveClass("chaand-radio");
    expect(publicRadio).toBeChecked();
    expect(publicRadio).toHaveAttribute("aria-invalid", "true");
    expect(publicRadio).toHaveAttribute("data-size", "lg");
    expect(privateRadio).toBeDisabled();
  });
});
