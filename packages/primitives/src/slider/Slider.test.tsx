import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders a range input with safe defaults", () => {
    render(<Slider aria-label="Volume" />);

    const slider = screen.getByRole("slider", { name: "Volume" });

    expect(slider.tagName).toBe("INPUT");
    expect(slider).toHaveAttribute("type", "range");
    expect(slider).toHaveAttribute("data-size", "md");
    expect(slider).toHaveValue("0");
    expect(slider).not.toHaveAttribute("aria-invalid");
  });

  it("supports controlled values and change callbacks", () => {
    const handleValueChange = vi.fn();
    const handleChange = vi.fn();

    render(
      <Slider
        aria-label="Progress"
        max={100}
        min={0}
        onChange={handleChange}
        onValueChange={handleValueChange}
        value={40}
      />
    );

    const slider = screen.getByRole("slider", { name: "Progress" });

    fireEvent.change(slider, { target: { value: "75" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleValueChange).toHaveBeenCalledWith(75);
  });

  it("updates uncontrolled state through keyboard interactions", () => {
    render(<Slider aria-label="Seek" defaultValue={25} max={100} min={0} step={5} />);

    const slider = screen.getByRole("slider", { name: "Seek" });

    expect(slider).toHaveValue("25");

    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveValue("30");

    fireEvent.keyDown(slider, { key: "PageUp" });
    expect(slider).toHaveValue("40");

    fireEvent.keyDown(slider, { key: "End" });
    expect(slider).toHaveValue("100");

    fireEvent.keyDown(slider, { key: "Home" });
    expect(slider).toHaveValue("0");
  });

  it("applies invalid and disabled attributes", () => {
    render(
      <Slider aria-label="Brightness" data-testid="brightness" disabled invalid size="lg" />
    );

    const slider = screen.getByTestId("brightness");

    expect(slider).toHaveAttribute("aria-invalid", "true");
    expect(slider).toHaveAttribute("data-size", "lg");
    expect(slider).toBeDisabled();
  });
});
