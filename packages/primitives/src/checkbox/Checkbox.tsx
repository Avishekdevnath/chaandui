import * as React from "react";
import { cn } from "@chaandui/utils";
import type { BaseProps, Size } from "../types/common";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "type">,
    BaseProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  invalid?: boolean;
  size?: Size;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    className,
    description,
    id,
    invalid = false,
    label,
    size = "md",
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref
  ) {
    const generatedId = React.useId().replace(/:/g, "");
    const inputId = id ?? `chd-checkbox-${generatedId}`;
    const labelId = label ? `${inputId}-label` : undefined;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const describedBy = [ariaDescribedBy, descriptionId].filter(Boolean).join(" ");

    return (
      <label
        className={cn("chaand-checkbox", className)}
        data-disabled={props.disabled ? "true" : undefined}
        data-invalid={invalid ? "true" : undefined}
        data-size={size}
      >
        <span className="chaand-checkbox-control">
          <input
            {...props}
            ref={ref}
            aria-describedby={describedBy || undefined}
            aria-invalid={invalid || undefined}
            aria-labelledby={labelId}
            className="chd-visually-hidden chaand-checkbox-input"
            data-size={size}
            id={inputId}
            type="checkbox"
          />
          <span aria-hidden="true" className="chaand-checkbox-box" />
        </span>
        {label || description ? (
          <span className="chaand-checkbox-copy">
            {label ? (
              <span className="chaand-checkbox-label" id={labelId}>
                {label}
              </span>
            ) : null}
            {description ? (
              <span className="chaand-checkbox-description" id={descriptionId}>
                {description}
              </span>
            ) : null}
          </span>
        ) : null}
      </label>
    );
  }
);
