import * as React from "react";
import { cn } from "@chaandui/utils";
import type { BaseProps, Size, Tone, Variant } from "../types/common";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    BaseProps {
  /** Stretch to fill container width (useful for mobile CTAs). */
  fullWidth?: boolean;
  size?: Size;
  tone?: Tone;
  variant?: Variant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    fullWidth,
    size = "md",
    tone = "primary",
    type = "button",
    variant = "solid",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn("chaand-button", "chaand-focus-ring", className)}
      data-full-width={fullWidth || undefined}
      data-size={size}
      data-tone={tone}
      data-variant={variant}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
});
