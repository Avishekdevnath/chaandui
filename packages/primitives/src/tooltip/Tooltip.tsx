import * as React from "react";
import * as ReactDOM from "react-dom";
import { useControllableState, useEscapeKey } from "@chaandui/hooks";
import { cn } from "@chaandui/utils";
import type { BaseProps } from "../types/common";

type TooltipPlacement = "top" | "right" | "bottom" | "left";
type TooltipTriggerElementProps = React.HTMLAttributes<HTMLElement> &
  React.AriaAttributes & {
    "aria-describedby"?: string;
  };

function getTooltipPosition({
  contentRect,
  offset,
  placement,
  triggerRect
}: {
  contentRect: DOMRect;
  offset: number;
  placement: TooltipPlacement;
  triggerRect: DOMRect;
}) {
  const horizontalCenter = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
  const verticalCenter = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;

  if (placement === "top") {
    return {
      left: horizontalCenter,
      top: triggerRect.top - contentRect.height - offset
    };
  }

  if (placement === "right") {
    return {
      left: triggerRect.right + offset,
      top: verticalCenter
    };
  }

  if (placement === "left") {
    return {
      left: triggerRect.left - contentRect.width - offset,
      top: verticalCenter
    };
  }

  return {
    left: horizontalCenter,
    top: triggerRect.bottom + offset
  };
}

export interface TooltipProps extends Omit<BaseProps, "children" | "id"> {
  children: React.ReactElement<TooltipTriggerElementProps>;
  content: React.ReactNode;
  defaultOpen?: boolean;
  offset?: number;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placement?: TooltipPlacement;
}

export function Tooltip({
  children,
  className,
  content,
  defaultOpen = false,
  offset = 10,
  onOpenChange,
  open,
  placement = "top",
  style
}: TooltipProps) {
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });
  const triggerRef = React.useRef<HTMLElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const tooltipId = React.useId().replace(/:/g, "");
  const [position, setPosition] = React.useState({ left: 0, top: 0 });

  useEscapeKey(() => setIsOpen(false), isOpen);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    function updatePosition() {
      const triggerNode = triggerRef.current;
      const tooltipNode = tooltipRef.current;

      if (!triggerNode || !tooltipNode) {
        return;
      }

      const nextPosition = getTooltipPosition({
        contentRect: tooltipNode.getBoundingClientRect(),
        offset,
        placement,
        triggerRect: triggerNode.getBoundingClientRect()
      });

      setPosition({
        left: Math.max(8, nextPosition.left),
        top: Math.max(8, nextPosition.top)
      });
    }

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, offset, placement]);

  const child = React.Children.only(children) as React.ReactElement<TooltipTriggerElementProps>;
  const childProps = child.props;
  const childRef = (child as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref;

  const trigger = React.cloneElement(child as React.ReactElement<any>, {
    "aria-describedby": isOpen ? `chd-tooltip-${tooltipId}` : childProps["aria-describedby"],
    onBlur: (event: React.FocusEvent<HTMLElement>) => {
      childProps.onBlur?.(event);

      if (!event.defaultPrevented) {
        setIsOpen(false);
      }
    },
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      childProps.onFocus?.(event);

      if (!event.defaultPrevented) {
        setIsOpen(true);
      }
    },
    onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
      childProps.onMouseEnter?.(event);

      if (!event.defaultPrevented) {
        setIsOpen(true);
      }
    },
    onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
      childProps.onMouseLeave?.(event);

      if (!event.defaultPrevented) {
        setIsOpen(false);
      }
    },
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;

      if (typeof childRef === "function") {
        childRef(node);
      } else if (childRef) {
        childRef.current = node;
      }
    }
  });

  if (!isOpen || typeof document === "undefined") {
    return trigger;
  }

  const tooltip = (
    <div
      ref={tooltipRef}
      className={cn("chaand-tooltip", className)}
      data-placement={placement}
      id={`chd-tooltip-${tooltipId}`}
      role="tooltip"
      style={{
        left: `${position.left}px`,
        position: "fixed",
        top: `${position.top}px`,
        ...style
      }}
    >
      {content}
    </div>
  );

  return (
    <>
      {trigger}
      {ReactDOM.createPortal(tooltip, document.body)}
    </>
  );
}
