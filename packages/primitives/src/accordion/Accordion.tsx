import * as React from "react";
import { useControllableState } from "@chaandui/hooks";
import { cn } from "@chaandui/utils";
import type { BaseProps } from "../types/common";

interface AccordionContextValue {
  baseId: string;
  multiple: boolean;
  openValues: string[];
  toggleItem: (value: string) => void;
}

interface AccordionItemContextValue {
  disabled: boolean;
  value: string;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);
const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionContext(component: string): AccordionContextValue {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw new Error(`${component} must be used within Accordion.`);
  }

  return context;
}

function useAccordionItemContext(component: string): AccordionItemContextValue {
  const context = React.useContext(AccordionItemContext);

  if (!context) {
    throw new Error(`${component} must be used within AccordionItem.`);
  }

  return context;
}

function normalizeValues(value?: string | string[]): string[] {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

export interface AccordionProps extends Omit<BaseProps, "id"> {
  children: React.ReactNode;
  defaultValue?: string | string[];
  multiple?: boolean;
  onValueChange?: (value: string | string[]) => void;
  value?: string | string[];
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement>, BaseProps {
  disabled?: boolean;
  value: string;
}

export interface AccordionTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    BaseProps {}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement>, BaseProps {
  forceMount?: boolean;
}

export function Accordion({
  children,
  className,
  defaultValue,
  multiple = false,
  onValueChange,
  value
}: AccordionProps) {
  const [openValues, setOpenValues] = useControllableState({
    value: value === undefined ? undefined : normalizeValues(value),
    defaultValue: normalizeValues(defaultValue),
    onChange: (nextValues) => {
      onValueChange?.(multiple ? nextValues : (nextValues[0] ?? ""));
    }
  });
  const baseId = React.useId().replace(/:/g, "");

  function toggleItem(nextValue: string) {
    setOpenValues((currentValues) => {
      const isOpen = currentValues.includes(nextValue);

      if (multiple) {
        return isOpen
          ? currentValues.filter((currentValue) => currentValue !== nextValue)
          : [...currentValues, nextValue];
      }

      return isOpen ? [] : [nextValue];
    });
  }

  return (
    <AccordionContext.Provider
      value={{
        baseId: `chd-accordion-${baseId}`,
        multiple,
        openValues,
        toggleItem
      }}
    >
      <div className={cn("chaand-accordion", className)} data-accordion-root>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  children,
  className,
  disabled = false,
  value,
  ...props
}: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ disabled, value }}>
      <div {...props} className={cn("chaand-accordion-item", className)} data-disabled={disabled}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ children, className, onClick, onKeyDown, ...props }, ref) {
    const accordion = useAccordionContext("AccordionTrigger");
    const item = useAccordionItemContext("AccordionTrigger");
    const isOpen = accordion.openValues.includes(item.value);
    const triggerId = `${accordion.baseId}-trigger-${item.value}`;
    const contentId = `${accordion.baseId}-content-${item.value}`;

    function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        return;
      }

      const root = event.currentTarget.closest("[data-accordion-root]");
      const triggers = root
        ? Array.from(root.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]"))
        : [];
      const currentIndex = triggers.findIndex((trigger) => trigger === event.currentTarget);

      if (currentIndex === -1 || triggers.length === 0) {
        return;
      }

      event.preventDefault();

      let nextIndex = currentIndex;

      if (event.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % triggers.length;
      } else if (event.key === "ArrowUp") {
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = triggers.length - 1;
      }

      triggers[nextIndex]?.focus();
    }

    return (
      <button
        {...props}
        ref={ref}
        aria-controls={contentId}
        aria-expanded={isOpen}
        className={cn("chaand-accordion-trigger", className)}
        data-accordion-trigger
        disabled={item.disabled}
        id={triggerId}
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented && !item.disabled) {
            accordion.toggleItem(item.value);
          }
        }}
        onKeyDown={handleKeyDown}
        type="button"
      >
        <span>{children}</span>
        <span aria-hidden="true" className="chaand-accordion-icon">
          {isOpen ? "−" : "+"}
        </span>
      </button>
    );
  }
);

export function AccordionContent({
  children,
  className,
  forceMount = false,
  ...props
}: AccordionContentProps) {
  const accordion = useAccordionContext("AccordionContent");
  const item = useAccordionItemContext("AccordionContent");
  const isOpen = accordion.openValues.includes(item.value);

  if (!isOpen && !forceMount) {
    return null;
  }

  return (
    <div
      {...props}
      aria-labelledby={`${accordion.baseId}-trigger-${item.value}`}
      className={cn("chaand-accordion-content", className)}
      hidden={!isOpen}
      id={`${accordion.baseId}-content-${item.value}`}
      role="region"
    >
      {children}
    </div>
  );
}
