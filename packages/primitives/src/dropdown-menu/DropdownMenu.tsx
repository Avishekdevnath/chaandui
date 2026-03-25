import * as React from "react";
import { useControllableState } from "@chaandui/hooks";
import { cn } from "@chaandui/utils";
import type { BaseProps } from "../types/common";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext(component: string): DropdownMenuContextValue {
  const context = React.useContext(DropdownMenuContext);

  if (!context) {
    throw new Error(`${component} must be used within DropdownMenu.`);
  }

  return context;
}

function getMenuItems(root: HTMLElement | null): HTMLButtonElement[] {
  if (!root) {
    return [];
  }

  return Array.from(root.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)'));
}

export interface DropdownMenuProps extends Omit<BaseProps, "id"> {
  align?: "start" | "center" | "end";
  children: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placement?: "top" | "right" | "bottom" | "left";
}

export interface DropdownMenuTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    BaseProps {}

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement>, BaseProps {}

export interface DropdownMenuItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    BaseProps {
  onSelect?: () => void;
}

export function DropdownMenu({
  align,
  children,
  defaultOpen = false,
  onOpenChange,
  open,
  placement
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });

  return (
    <DropdownMenuContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>
      <Popover align={align} autoFocusContent={false} onOpenChange={setIsOpen} open={isOpen} placement={placement}>
        {children}
      </Popover>
    </DropdownMenuContext.Provider>
  );
}

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  function DropdownMenuTrigger(props, ref) {
    return <PopoverTrigger {...props} aria-haspopup="menu" ref={ref} />;
  }
);

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  function DropdownMenuContent({ children, className, onKeyDown, ...props }, ref) {
    const context = useDropdownMenuContext("DropdownMenuContent");
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (!context.open) {
        return;
      }

      getMenuItems(contentRef.current)[0]?.focus();
    }, [context.open]);

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      const items = getMenuItems(contentRef.current);
      const currentIndex = items.findIndex((item) => item === document.activeElement);

      if (items.length === 0) {
        return;
      }

      let nextIndex = currentIndex;

      if (event.key === "ArrowDown") {
        nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
      } else if (event.key === "ArrowUp") {
        nextIndex = currentIndex === -1 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = items.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      items[nextIndex]?.focus();
    }

    return (
      <PopoverContent
        {...props}
        ref={(node) => {
          contentRef.current = node;

          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn("chaand-dropdown-menu-content", className)}
        onKeyDown={handleKeyDown}
        role="menu"
      >
        {children}
      </PopoverContent>
    );
  }
);

export const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  function DropdownMenuItem({ children, className, onClick, onSelect, type = "button", ...props }, ref) {
    const context = useDropdownMenuContext("DropdownMenuItem");

    return (
      <button
        {...props}
        ref={ref}
        className={cn("chaand-dropdown-menu-item", className)}
        onClick={(event) => {
          onClick?.(event);

          if (event.defaultPrevented || props.disabled) {
            return;
          }

          onSelect?.();
          context.setOpen(false);
        }}
        role="menuitem"
        tabIndex={-1}
        type={type}
      >
        {children}
      </button>
    );
  }
);
