import * as React from "react";
import { cn } from "@chaandui/utils";
import type { BaseProps } from "../types/common";

export interface FieldProps extends Omit<BaseProps, "children"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  children: React.ReactElement;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(function Field(
  { children, className, description, error, id, label, required = false, ...props },
  ref
) {
  const generatedId = React.useId().replace(/:/g, "");

  if (!React.isValidElement(children)) {
    return null;
  }

  const child = children as React.ReactElement<Record<string, unknown>>;
  const childProps = child.props as {
    id?: string;
    required?: boolean;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean | "true" | "false";
  };

  const controlId = childProps.id ?? id ?? `chd-field-${generatedId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [childProps["aria-describedby"], descriptionId, errorId]
    .filter(Boolean)
    .join(" ");
  const invalid =
    Boolean(error) ||
    childProps["aria-invalid"] === true ||
    childProps["aria-invalid"] === "true";

  return (
    <div
      ref={ref}
      className={cn("chaand-field", className)}
      data-invalid={invalid ? "true" : undefined}
      {...props}
    >
      {label ? (
        <label className="chaand-field-label" htmlFor={controlId}>
          {label}
          {required ? (
            <span aria-hidden="true" className="chaand-field-required">
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <div className="chaand-field-control">
        {React.cloneElement(child, {
          "aria-describedby": describedBy || undefined,
          "aria-invalid": invalid || undefined,
          id: controlId,
          required: required || childProps.required
        })}
      </div>
      {description ? (
        <p className="chaand-field-description" id={descriptionId}>
          {description}
        </p>
      ) : null}
      {error ? (
        <p className="chaand-field-error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
});
