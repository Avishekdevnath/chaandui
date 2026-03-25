import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  MediaErrorBoundary,
  MediaPlaceholder,
  MediaStateAnnouncer,
} from "./index";

function Thrower() {
  throw new Error("boom");
}

describe("MediaErrorBoundary", () => {
  it("renders fallback when a child throws", () => {
    const onError = vi.fn();

    render(
      <MediaErrorBoundary fallback={<div>fallback</div>} onError={onError}>
        <Thrower />
      </MediaErrorBoundary>,
    );

    expect(screen.getByText("fallback")).toBeInTheDocument();
    expect(onError).toHaveBeenCalledTimes(1);
  });
});

describe("MediaStateAnnouncer", () => {
  it("renders a polite status region by default", () => {
    render(<MediaStateAnnouncer message="Paused" />);

    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-live", "polite");
    expect(region).toHaveTextContent("Paused");
  });

  it("renders an assertive alert region when requested", () => {
    render(<MediaStateAnnouncer message="Error" politeness="assertive" />);

    const region = screen.getByRole("alert");
    expect(region).toHaveAttribute("aria-live", "assertive");
  });
});

describe("MediaPlaceholder", () => {
  it("applies aspect ratio and skeleton variant by default", () => {
    render(<MediaPlaceholder data-testid="placeholder" />);

    const placeholder = screen.getByTestId("placeholder");
    expect(placeholder).toHaveAttribute("data-variant", "skeleton");
    expect(placeholder).toHaveStyle({ aspectRatio: "16/9" });
  });

  it("renders poster image for poster variant", () => {
    const { container } = render(
      <MediaPlaceholder poster="/poster.png" variant="poster" />,
    );

    const image = container.querySelector("img.chaand-media-placeholder-poster");
    if (!image) {
      throw new Error("Expected poster image to be rendered");
    }
    expect(image).toHaveAttribute("src", "/poster.png");
  });
});
