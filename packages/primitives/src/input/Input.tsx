import * as React from "react";
import { cn } from "@chaandui/utils";
import type { BaseProps, Size } from "../types/common";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size">,
    BaseProps {
  size?: Size;
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid = false, size = "md", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn("chaand-input", "chaand-focus-ring", className)}
      data-invalid={invalid ? "true" : undefined}
      data-size={size}
      {...props}
    />
  );
});
