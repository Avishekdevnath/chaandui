import * as React from "react";
import { cn } from "@chaandui/utils";
import type { BaseProps, Size } from "../types/common";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "type">,
    BaseProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  invalid?: boolean;
  size?: Size;
}

export interface RadioGroupProps extends Omit<BaseProps, "children" | "id"> {
  children: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  invalid?: boolean;
  name: string;
  size?: Size;
}

export function RadioGroup({
  children,
  className,
  description,
  invalid = false,
  label,
  name,
  size = "md"
}: RadioGroupProps) {
  const generatedId = React.useId().replace(/:/g, "");
  const groupId = `chd-radio-group-${generatedId}`;
  const labelId = label ? `${groupId}-label` : undefined;
  const descriptionId = description ? `${groupId}-description` : undefined;

  return (
    <div
      aria-describedby={descriptionId}
      aria-labelledby={labelId}
      className={cn("chaand-radio-group", className)}
      data-invalid={invalid ? "true" : undefined}
      data-size={size}
      role="radiogroup"
    >
      {label ? (
        <div className="chaand-radio-group-label" id={labelId}>
          {label}
        </div>
      ) : null}
      {description ? (
        <p className="chaand-radio-group-description" id={descriptionId}>
          {description}
        </p>
      ) : null}
      <div className="chaand-radio-group-options">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          const element = child as React.ReactElement<Record<string, unknown>>;
          const childProps = element.props as {
            invalid?: boolean;
            name?: string;
            size?: Size;
          };

          return React.cloneElement(element, {
            invalid: childProps.invalid ?? invalid,
            name: childProps.name ?? name,
            size: childProps.size ?? size
          });
        })}
      </div>
    </div>
  );
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
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
    const inputId = id ?? `chd-radio-${generatedId}`;
    const labelId = label ? `${inputId}-label` : undefined;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const describedBy = [ariaDescribedBy, descriptionId].filter(Boolean).join(" ");

    return (
      <label
        className={cn("chaand-radio", className)}
        data-disabled={props.disabled ? "true" : undefined}
        data-invalid={invalid ? "true" : undefined}
        data-size={size}
      >
        <span className="chaand-radio-control">
          <input
            {...props}
            ref={ref}
            aria-describedby={describedBy || undefined}
            aria-invalid={invalid || undefined}
            aria-labelledby={labelId}
            className="chd-visually-hidden chaand-radio-input"
            data-size={size}
            id={inputId}
            type="radio"
          />
          <span aria-hidden="true" className="chaand-radio-dot" />
        </span>
        {label || description ? (
          <span className="chaand-radio-copy">
            {label ? (
              <span className="chaand-radio-label" id={labelId}>
                {label}
              </span>
            ) : null}
            {description ? (
              <span className="chaand-radio-description" id={descriptionId}>
                {description}
              </span>
            ) : null}
          </span>
        ) : null}
      </label>
    );
  }
);
