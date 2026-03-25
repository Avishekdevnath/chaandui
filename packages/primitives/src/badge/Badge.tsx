import * as React from "react";
import { cn } from "@chaandui/utils";
import type { BaseProps, Size, Tone, Variant } from "../types/common";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, BaseProps {
  size?: Size;
  tone?: Tone;
  variant?: Variant;
}

export function Badge({
  children,
  className,
  size = "md",
  tone = "primary",
  variant = "soft",
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={cn("chaand-badge", className)}
      data-size={size}
      data-tone={tone}
      data-variant={variant}
    >
      {children}
    </span>
  );
}
