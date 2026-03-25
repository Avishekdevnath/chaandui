import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VideoPlayerPreset } from "./VideoPlayerPreset";

describe("VideoPlayerPreset", () => {
  it("renders a polite announcer by default", () => {
    render(<VideoPlayerPreset source="/movie.mp4" state="paused" />);

    const region = screen.getByRole("status");

    expect(region).toHaveAttribute("aria-live", "polite");
    expect(region).toHaveTextContent("Paused");
  });

  it("uses assertive announcer for error state", () => {
    render(<VideoPlayerPreset state="error" />);

    const region = screen.getByRole("alert");

    expect(region).toHaveAttribute("aria-live", "assertive");
    expect(region).toHaveTextContent("Playback error");
  });

  it("allows custom announcement message and can disable announcer", () => {
    const { rerender } = render(
      <VideoPlayerPreset announceMessage="Custom message" state="playing" />,
    );

    expect(screen.getByRole("status")).toHaveTextContent("Custom message");

    rerender(<VideoPlayerPreset announce={false} state="playing" />);

    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("forwards resolved theme attributes to the root", () => {
    const { container } = render(
      <VideoPlayerPreset data-testid="preset" theme="luxe" />,
    );

    const root = container.querySelector("[data-testid='preset']");

    expect(root).toHaveAttribute("data-chaand-theme", "luxe");
    expect(root).toHaveAttribute("data-skin", "luxe");
  });
});
