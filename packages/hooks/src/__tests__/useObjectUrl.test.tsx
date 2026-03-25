import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useObjectUrl } from "../useObjectUrl";

describe("useObjectUrl", () => {
  const createObjectURL = vi.fn<(value: Blob | File) => string>();
  const revokeObjectURL = vi.fn<(value: string) => void>();

  beforeEach(() => {
    createObjectURL.mockReset();
    revokeObjectURL.mockReset();
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: createObjectURL
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: revokeObjectURL
    });
  });

  afterEach(() => {
    createObjectURL.mockReset();
    revokeObjectURL.mockReset();
  });

  it("creates an object URL for the current blob and revokes previous ones", async () => {
    const first = new Blob(["first"], { type: "text/plain" });
    const second = new Blob(["second"], { type: "text/plain" });

    createObjectURL.mockReturnValueOnce("blob:first").mockReturnValueOnce("blob:second");

    const { result, rerender, unmount } = renderHook(({ value }) => useObjectUrl(value), {
      initialProps: { value: first as Blob | null }
    });

    await waitFor(() => {
      expect(result.current).toBe("blob:first");
    });

    rerender({ value: second });

    await waitFor(() => {
      expect(result.current).toBe("blob:second");
    });

    expect(revokeObjectURL).toHaveBeenCalledWith("blob:first");

    unmount();

    expect(revokeObjectURL).toHaveBeenCalledWith("blob:second");
  });

  it("returns undefined when there is no blob", () => {
    const { result } = renderHook(() => useObjectUrl(null));

    expect(result.current).toBeUndefined();
    expect(createObjectURL).not.toHaveBeenCalled();
  });
});
