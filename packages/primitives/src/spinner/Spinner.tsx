import * as React from "react";
import { cn } from "@chaandui/utils";

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  /** Spinner size in pixels. Defaults to 18. */
  size?: number | string;
}

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(function Spinner(
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
      className={cn("chaand-spinner", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
});
