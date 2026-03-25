import * as React from "react";

interface UseControllableStateOptions<T> {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}

type SetValue<T> = (value: T | ((previousValue: T) => T)) => void;

export function useControllableState<T>({
  value,
  defaultValue,
  onChange
}: UseControllableStateOptions<T>): [T, SetValue<T>] {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as T) : uncontrolledValue;

  const setValue: SetValue<T> = (nextValue) => {
    const resolvedValue =
      typeof nextValue === "function"
        ? (nextValue as (previousValue: T) => T)(currentValue)
        : nextValue;

    if (!isControlled) {
      setUncontrolledValue(resolvedValue);
    }

    onChange?.(resolvedValue);
  };

  return [currentValue, setValue];
}
