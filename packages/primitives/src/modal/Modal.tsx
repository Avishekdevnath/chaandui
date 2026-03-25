import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEscapeKey, useLockBodyScroll } from "@chaandui/hooks";
import { cn } from "@chaandui/utils";
import type { BaseProps, Size } from "../types/common";

export interface ModalProps extends Omit<BaseProps, "id"> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  size?: Size;
  closeLabel?: string;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    children,
    className,
    closeLabel = "Close",
    closeOnEscape = true,
    closeOnOverlayClick = true,
    description,
    footer,
    onOpenChange,
    open,
    showCloseButton = true,
    size = "md",
    style,
    title
  },
  ref
) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const previousActiveElementRef = React.useRef<HTMLElement | null>(null);
  const titleId = React.useId().replace(/:/g, "");
  const descriptionId = React.useId().replace(/:/g, "");

  useLockBodyScroll(open);
  useEscapeKey(() => onOpenChange(false), open && closeOnEscape);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    previousActiveElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    dialogRef.current?.focus();

    return () => {
      previousActiveElementRef.current?.focus();
      previousActiveElementRef.current = null;
    };
  }, [open]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  function handleOverlayMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onOpenChange(false);
    }
  }

  const dialog = (
    <div
      className="chaand-modal-layer"
      data-testid="chaand-modal-overlay"
      onMouseDown={handleOverlayMouseDown}
    >
      <div
        ref={(node) => {
          dialogRef.current = node;

          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={title ? titleId : undefined}
        aria-modal="true"
        className={cn("chaand-modal", "chaand-surface", className)}
        data-size={size}
        role="dialog"
        style={style}
        tabIndex={-1}
      >
        {title || description || showCloseButton ? (
          <div className="chaand-modal-header">
            <div className="chaand-modal-heading">
              {title ? (
                <h2 className="chaand-modal-title" id={titleId}>
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="chaand-modal-description" id={descriptionId}>
                  {description}
                </p>
              ) : null}
            </div>
            {showCloseButton ? (
              <button
                aria-label={closeLabel}
                className="chaand-modal-close"
                onClick={() => onOpenChange(false)}
                type="button"
              >
                ×
              </button>
            ) : null}
          </div>
        ) : null}
        <div className="chaand-modal-body">{children}</div>
        {footer ? <div className="chaand-modal-footer">{footer}</div> : null}
      </div>
    </div>
  );

  return ReactDOM.createPortal(dialog, document.body);
});
