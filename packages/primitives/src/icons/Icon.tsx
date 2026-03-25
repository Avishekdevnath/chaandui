import * as React from "react";
import { cn } from "@chaandui/utils";

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Icon size in pixels. Defaults to 18. */
  size?: number | string;
}

/**
 * Base wrapper — every ChaandUI icon forwards ref and merges className.
 * Stroke-based, currentColor, rounded caps/joins — Lucide-compatible style.
 */
export const createIcon = (
  name: string,
  path: React.ReactNode
) => {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
    { className, size = 18, ...props },
    ref
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("chaand-icon", className)}
        aria-hidden="true"
        {...props}
      >
        {path}
      </svg>
    );
  });

  Icon.displayName = name;
  return Icon;
};
