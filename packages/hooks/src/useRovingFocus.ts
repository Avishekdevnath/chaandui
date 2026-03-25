import * as React from "react";

export interface UseRovingFocusOptions {
  itemCount: number;
  defaultIndex?: number;
  orientation?: "horizontal" | "vertical";
  rtl?: boolean;
}

export function useRovingFocus({
  itemCount,
  defaultIndex = 0,
  orientation = "horizontal",
  rtl = false
}: UseRovingFocusOptions) {
  const [focusedIndex, setFocusedIndex] = React.useState(defaultIndex);
  const itemRefs = React.useRef<Map<number, HTMLElement>>(new Map());

  function focusItem(index: number) {
    const clamped = Math.max(0, Math.min(index, itemCount - 1));
    setFocusedIndex(clamped);
    itemRefs.current.get(clamped)?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    const nextKey = orientation === "horizontal"
      ? (rtl ? "ArrowLeft" : "ArrowRight")
      : "ArrowDown";
    const prevKey = orientation === "horizontal"
      ? (rtl ? "ArrowRight" : "ArrowLeft")
      : "ArrowUp";

    switch (event.key) {
      case nextKey:
        event.preventDefault();
        focusItem(focusedIndex + 1);
        break;
      case prevKey:
        event.preventDefault();
        focusItem(focusedIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        focusItem(0);
        break;
      case "End":
        event.preventDefault();
        focusItem(itemCount - 1);
        break;
    }
  }

  function getRovingProps(index: number) {
    return {
      tabIndex: index === focusedIndex ? 0 : -1,
      ref: (el: HTMLElement | null) => {
        if (el) {
          itemRefs.current.set(index, el);
        } else {
          itemRefs.current.delete(index);
        }
      },
      onKeyDown: handleKeyDown,
      onFocus: () => setFocusedIndex(index)
    };
  }

  const toolbarProps = {
    role: "toolbar" as const,
    "aria-orientation": orientation as "horizontal" | "vertical"
  };

  return { focusedIndex, getRovingProps, toolbarProps };
}
