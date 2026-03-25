import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "../input";
import { Field } from "./Field";

describe("Field", () => {
  it("wires label, description, and error text to the child control", () => {
    render(
      <Field description="Used for receipts" error="Email is required" label="Email">
        <Input />
      </Field>
    );

    const input = screen.getByRole("textbox", { name: "Email" });
    const description = screen.getByText("Used for receipts");
    const error = screen.getByText("Email is required");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", `${description.id} ${error.id}`);
    expect(screen.getByText("Email").tagName).toBe("LABEL");
  });

  it("preserves existing child ids and aria-describedby values", () => {
    render(
      <Field description="Public handle" label="Username">
        <Input aria-describedby="external-hint" id="username-input" />
      </Field>
    );

    const input = screen.getByRole("textbox", { name: "Username" });
    const description = screen.getByText("Public handle");

    expect(input).toHaveAttribute("id", "username-input");
    expect(input).toHaveAttribute("aria-describedby", `external-hint ${description.id}`);
  });
});
