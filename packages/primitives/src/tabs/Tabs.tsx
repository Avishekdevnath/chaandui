import * as React from "react";
import { useControllableState } from "@chaandui/hooks";
import { cn } from "@chaandui/utils";
import type { BaseProps } from "../types/common";

interface TabsContextValue {
  baseId: string;
  orientation: "horizontal" | "vertical";
  setValue: (value: string) => void;
  value: string;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error(`${component} must be used within Tabs.`);
  }

  return context;
}

export interface TabsProps extends Omit<BaseProps, "id"> {
  children: React.ReactNode;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  value?: string;
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement>, BaseProps {}
export interface TabsTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    BaseProps {
  value: string;
}
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement>, BaseProps {
  forceMount?: boolean;
  value: string;
}

export function Tabs({
  children,
  className,
  defaultValue = "",
  onValueChange,
  orientation = "horizontal",
  value
}: TabsProps) {
  const [currentValue, setCurrentValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange
  });
  const baseId = React.useId().replace(/:/g, "");

  return (
    <TabsContext.Provider
      value={{
        baseId: `chd-tabs-${baseId}`,
        orientation,
        setValue: setCurrentValue,
        value: currentValue
      }}
    >
      <div className={cn("chaand-tabs", className)} data-orientation={orientation}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className, ...props }: TabsListProps) {
  const { orientation } = useTabsContext("TabsList");

  return (
    <div
      {...props}
      aria-orientation={orientation}
      className={cn("chaand-tabs-list", className)}
      role="tablist"
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ children, className, onClick, onKeyDown, value, ...props }: TabsTriggerProps) {
  const context = useTabsContext("TabsTrigger");
  const selected = context.value === value;
  const triggerId = `${context.baseId}-trigger-${value}`;
  const panelId = `${context.baseId}-panel-${value}`;

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const horizontalKeys = ["ArrowLeft", "ArrowRight"];
    const verticalKeys = ["ArrowUp", "ArrowDown"];
    const keys = context.orientation === "horizontal" ? horizontalKeys : verticalKeys;

    if (!keys.includes(event.key) && event.key !== "Home" && event.key !== "End") {
      return;
    }

    const parent = event.currentTarget.parentElement;
    const triggers = parent
      ? Array.from(parent.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
      : [];
    const currentIndex = triggers.findIndex((trigger) => trigger === event.currentTarget);

    if (currentIndex === -1 || triggers.length === 0) {
      return;
    }

    event.preventDefault();

    let nextIndex = currentIndex;

    if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = triggers.length - 1;
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % triggers.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    }

    const nextTrigger = triggers[nextIndex];
    const nextValue = nextTrigger.dataset.value;

    nextTrigger?.focus();

    if (nextValue) {
      context.setValue(nextValue);
    }
  }

  return (
    <button
      {...props}
      aria-controls={panelId}
      aria-selected={selected}
      className={cn("chaand-tabs-trigger", className)}
      data-state={selected ? "active" : "inactive"}
      data-value={value}
      id={triggerId}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          context.setValue(value);
        }
      }}
      onKeyDown={handleKeyDown}
      role="tab"
      tabIndex={selected ? 0 : -1}
      type="button"
    >
      {children}
    </button>
  );
}

export function TabsContent({
  children,
  className,
  forceMount = false,
  value,
  ...props
}: TabsContentProps) {
  const context = useTabsContext("TabsContent");
  const selected = context.value === value;

  if (!selected && !forceMount) {
    return null;
  }

  return (
    <div
      {...props}
      aria-labelledby={`${context.baseId}-trigger-${value}`}
      className={cn("chaand-tabs-content", className)}
      hidden={!selected}
      id={`${context.baseId}-panel-${value}`}
      role="tabpanel"
      tabIndex={0}
    >
      {children}
    </div>
  );
}
