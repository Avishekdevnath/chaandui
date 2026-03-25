import * as React from "react";
import { cn } from "@chaandui/utils";
import type { BaseProps, Size } from "../types/common";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "children">,
    BaseProps {
  size?: Size;
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid = false, rows = 4, size = "md", ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn("chaand-textarea", "chaand-focus-ring", className)}
      data-invalid={invalid ? "true" : undefined}
      data-size={size}
      rows={rows}
      {...props}
    />
  );
});
