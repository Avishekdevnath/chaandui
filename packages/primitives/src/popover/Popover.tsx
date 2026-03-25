import * as React from "react";
import * as ReactDOM from "react-dom";
import { useControllableState, useEscapeKey } from "@chaandui/hooks";
import { cn } from "@chaandui/utils";
import type { BaseProps } from "../types/common";

type PopoverPlacement = "top" | "right" | "bottom" | "left";
type PopoverAlign = "start" | "center" | "end";

interface PopoverContextValue {
  align: PopoverAlign;
  contentId: string;
  contentRef: React.RefObject<HTMLDivElement | null>;
  offset: number;
  open: boolean;
  placement: PopoverPlacement;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function usePopoverContext(component: string): PopoverContextValue {
  const context = React.useContext(PopoverContext);

  if (!context) {
    throw new Error(`${component} must be used within Popover.`);
  }

  return context;
}

function getPopoverPosition({
  align,
  contentRect,
  offset,
  placement,
  triggerRect
}: {
  align: PopoverAlign;
  contentRect: DOMRect;
  offset: number;
  placement: PopoverPlacement;
  triggerRect: DOMRect;
}) {
  const horizontalStart = triggerRect.left;
  const horizontalCenter = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
  const horizontalEnd = triggerRect.right - contentRect.width;
  const verticalStart = triggerRect.top;
  const verticalCenter = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
  const verticalEnd = triggerRect.bottom - contentRect.height;

  const horizontalPosition =
    align === "start" ? horizontalStart : align === "end" ? horizontalEnd : horizontalCenter;
  const verticalPosition =
    align === "start" ? verticalStart : align === "end" ? verticalEnd : verticalCenter;

  if (placement === "top") {
    return {
      left: horizontalPosition,
      top: triggerRect.top - contentRect.height - offset
    };
  }

  if (placement === "right") {
    return {
      left: triggerRect.right + offset,
      top: verticalPosition
    };
  }

  if (placement === "left") {
    return {
      left: triggerRect.left - contentRect.width - offset,
      top: verticalPosition
    };
  }

  return {
    left: horizontalPosition,
    top: triggerRect.bottom + offset
  };
}

export interface PopoverProps extends Omit<BaseProps, "id"> {
  align?: PopoverAlign;
  autoFocusContent?: boolean;
  children: React.ReactNode;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  defaultOpen?: boolean;
  offset?: number;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placement?: PopoverPlacement;
}

export interface PopoverTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    BaseProps {}

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement>, BaseProps {
  align?: PopoverAlign;
  forceMount?: boolean;
  placement?: PopoverPlacement;
}

export function Popover({
  align = "center",
  autoFocusContent = true,
  children,
  className,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  defaultOpen = false,
  offset = 12,
  onOpenChange,
  open,
  placement = "bottom",
  style
}: PopoverProps) {
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const previousActiveElementRef = React.useRef<HTMLElement | null>(null);
  const contentId = React.useId().replace(/:/g, "");

  useEscapeKey(() => setIsOpen(false), isOpen && closeOnEscape);

  React.useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (triggerRef.current?.contains(target) || contentRef.current?.contains(target)) {
        return;
      }

      setIsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [closeOnOutsideClick, isOpen, setIsOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousActiveElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    if (autoFocusContent) {
      contentRef.current?.focus();
    }

    return () => {
      previousActiveElementRef.current?.focus();
      previousActiveElementRef.current = null;
    };
  }, [autoFocusContent, isOpen]);

  return (
    <PopoverContext.Provider
      value={{
        align,
        contentId: `chd-popover-${contentId}`,
        contentRef,
        offset,
        open: isOpen,
        placement,
        setOpen: setIsOpen,
        triggerRef
      }}
    >
      <div className={cn("chaand-popover", className)} data-state={isOpen ? "open" : "closed"} style={style}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  function PopoverTrigger(
    { children, className, onClick, type = "button", "aria-haspopup": ariaHaspopup, ...props },
    ref
  ) {
    const context = usePopoverContext("PopoverTrigger");

    return (
      <button
        {...props}
        ref={(node) => {
          context.triggerRef.current = node;

          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        aria-controls={context.contentId}
        aria-expanded={context.open}
        aria-haspopup={ariaHaspopup ?? "dialog"}
        className={cn("chaand-popover-trigger", className)}
        data-state={context.open ? "open" : "closed"}
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            context.setOpen(!context.open);
          }
        }}
        type={type}
      >
        {children}
      </button>
    );
  }
);

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { align, children, className, forceMount = false, placement, role, style, ...props },
  ref
) {
  const context = usePopoverContext("PopoverContent");
  const [position, setPosition] = React.useState({ left: 0, top: 0 });
  const resolvedAlign = align ?? context.align;
  const resolvedPlacement = placement ?? context.placement;

  React.useEffect(() => {
    if (!context.open) {
      return;
    }

    function updatePosition() {
      const triggerNode = context.triggerRef.current;
      const contentNode = context.contentRef.current;

      if (!triggerNode || !contentNode) {
        return;
      }

      const nextPosition = getPopoverPosition({
        align: resolvedAlign,
        contentRect: contentNode.getBoundingClientRect(),
        offset: context.offset,
        placement: resolvedPlacement,
        triggerRect: triggerNode.getBoundingClientRect()
      });

      const maxLeft = Math.max(12, window.innerWidth - contentNode.offsetWidth - 12);
      const maxTop = Math.max(12, window.innerHeight - contentNode.offsetHeight - 12);

      setPosition({
        left: Math.min(maxLeft, Math.max(12, nextPosition.left)),
        top: Math.min(maxTop, Math.max(12, nextPosition.top))
      });
    }

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [context, resolvedAlign, resolvedPlacement]);

  if ((!context.open && !forceMount) || typeof document === "undefined") {
    return null;
  }

  const content = (
    <div
      {...props}
      ref={(node) => {
        context.contentRef.current = node;

        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      className={cn("chaand-popover-content", "chaand-surface", className)}
      data-align={resolvedAlign}
      data-placement={resolvedPlacement}
      data-side={resolvedPlacement}
      data-state={context.open ? "open" : "closed"}
      id={context.contentId}
      role={role ?? "dialog"}
      style={{
        left: `${position.left}px`,
        position: "fixed",
        top: `${position.top}px`,
        ...style
      }}
      tabIndex={-1}
    >
      {children}
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
});
