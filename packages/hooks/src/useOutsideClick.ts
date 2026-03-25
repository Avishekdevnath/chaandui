import * as React from "react";

export function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void
): void {
  React.useEffect(() => {
    function onPointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target;
      const currentElement = ref.current;

      if (!currentElement || !(target instanceof Node) || currentElement.contains(target)) {
        return;
      }

      handler();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [handler, ref]);
}
