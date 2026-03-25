import { render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { useMounted } from "../useMounted";

function MountedProbe() {
  const mounted = useMounted();

  return <div data-testid="mounted-probe" data-mounted={String(mounted)} />;
}

describe("useMounted", () => {
  it("returns false during server render", () => {
    const markup = renderToString(<MountedProbe />);

    expect(markup).toContain('data-mounted="false"');
  });

  it("returns true after the first client render effect", async () => {
    render(<MountedProbe />);

    await waitFor(() => {
      expect(screen.getByTestId("mounted-probe").getAttribute("data-mounted")).toBe("true");
    });
  });
});
