import * as React from "react";
import { cn } from "@chaandui/utils";
import type { BaseProps, Size } from "../types/common";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children" | "size">,
    BaseProps {
  invalid?: boolean;
  options: SelectOption[];
  placeholder?: string;
  size?: Size;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalid = false, options, placeholder, size = "md", ...props },
  ref
) {
  return (
    <select
      {...props}
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn("chaand-select", "chaand-focus-ring", className)}
      data-invalid={invalid ? "true" : undefined}
      data-size={size}
    >
      {placeholder ? <option value="">{placeholder}</option> : null}
      {options.map((option) => (
        <option disabled={option.disabled} key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});
