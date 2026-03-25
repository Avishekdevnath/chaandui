import * as React from "react";
import { useControllableState } from "@chaandui/hooks";
import { cn } from "@chaandui/utils";
import type { BaseProps, Size } from "../types/common";

function toNumber(value: number | string | undefined, fallback: number) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "type" | "value" | "defaultValue">,
    BaseProps {
  size?: Size;
  invalid?: boolean;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    className,
    defaultValue,
    invalid = false,
    max,
    min,
    onChange,
    onKeyDown,
    onValueChange,
    size = "md",
    step,
    value,
    ...props
  },
  ref
) {
  const lowerBound = toNumber(min, 0);
  const upperBound = Math.max(toNumber(max, 100), lowerBound);
  const stepValue = step === "any" ? 1 : Math.max(toNumber(step, 1), 0.0001);
  const pageStep = Math.max((upperBound - lowerBound) / 10, stepValue);
  const initialValue = clamp(value ?? defaultValue ?? lowerBound, lowerBound, upperBound);

  const [currentValue, setCurrentValue] = useControllableState<number>({
    value,
    defaultValue: initialValue,
    onChange: onValueChange
  });

  return (
    <input
      {...props}
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn("chaand-slider", "chaand-focus-ring", className)}
      data-invalid={invalid ? "true" : undefined}
      data-size={size}
      max={upperBound}
      min={lowerBound}
      onChange={(event) => {
        const nextValue = clamp(Number(event.currentTarget.value), lowerBound, upperBound);

        setCurrentValue(nextValue);
        onChange?.(event);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);

        if (event.defaultPrevented) {
          return;
        }

        let nextValue: number | null = null;

        if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
          nextValue = currentValue - stepValue;
        } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
          nextValue = currentValue + stepValue;
        } else if (event.key === "PageDown") {
          nextValue = currentValue - pageStep;
        } else if (event.key === "PageUp") {
          nextValue = currentValue + pageStep;
        } else if (event.key === "Home") {
          nextValue = lowerBound;
        } else if (event.key === "End") {
          nextValue = upperBound;
        }

        if (nextValue === null) {
          return;
        }

        event.preventDefault();
        setCurrentValue(clamp(nextValue, lowerBound, upperBound));
      }}
      step={step ?? 1}
      type="range"
      value={currentValue}
    />
  );
});
