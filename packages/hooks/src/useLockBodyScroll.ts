import * as React from "react";

export function useLockBodyScroll(enabled: boolean): void {
  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [enabled]);
}
