import * as React from "react";
import { cn } from "@chaandui/utils";
import type { BaseProps, Tone } from "../types/common";

type ToastPlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface ToastRecord {
  description?: React.ReactNode;
  duration: number;
  id: string;
  title?: React.ReactNode;
  tone: Tone;
}

interface ToastContextValue {
  dismissToast: (id: string) => void;
  pushToast: (toast: ToastInput) => string;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

function useToastContext(): ToastContextValue {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider.");
  }

  return context;
}

export interface ToastInput {
  description?: React.ReactNode;
  duration?: number;
  id?: string;
  title?: React.ReactNode;
  tone?: Tone;
}

export interface ToastProviderProps extends Omit<BaseProps, "id"> {
  children: React.ReactNode;
  maxVisible?: number;
  placement?: ToastPlacement;
}

export interface ToastViewportProps extends React.HTMLAttributes<HTMLDivElement>, BaseProps {
  placement?: ToastPlacement;
}

export interface ToastItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, BaseProps {
  closeLabel?: string;
  description?: React.ReactNode;
  onDismiss?: () => void;
  title?: React.ReactNode;
  tone?: Tone;
}

export function ToastProvider({
  children,
  maxVisible = 3,
  placement = "bottom-right"
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([]);
  const counterRef = React.useRef(0);
  const timeoutsRef = React.useRef(new Map<string, number>());

  const dismissToast = React.useCallback((id: string) => {
    const timeoutId = timeoutsRef.current.get(id);

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }

    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = React.useCallback(
    ({ description, duration = 4000, id, title, tone = "neutral" }: ToastInput) => {
      const nextId = id ?? `chd-toast-${counterRef.current++}`;
      const nextToast = {
        description,
        duration,
        id: nextId,
        title,
        tone
      };

      setToasts((currentToasts) => [...currentToasts.slice(-(maxVisible - 1)), nextToast]);

      if (duration > 0) {
        const timeoutId = window.setTimeout(() => {
          dismissToast(nextId);
        }, duration);

        timeoutsRef.current.set(nextId, timeoutId);
      }

      return nextId;
    },
    [dismissToast, maxVisible]
  );

  React.useEffect(() => {
    return () => {
      for (const timeoutId of timeoutsRef.current.values()) {
        window.clearTimeout(timeoutId);
      }

      timeoutsRef.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{
        dismissToast,
        pushToast
      }}
    >
      {children}
      <ToastViewport placement={placement}>
        {toasts.map((toast) => (
          <ToastItem
            description={toast.description}
            key={toast.id}
            onDismiss={() => dismissToast(toast.id)}
            title={toast.title}
            tone={toast.tone}
          />
        ))}
      </ToastViewport>
    </ToastContext.Provider>
  );
}

export function ToastViewport({
  children,
  className,
  placement = "bottom-right",
  style,
  ...props
}: ToastViewportProps) {
  return (
    <div
      {...props}
      aria-label="Notifications"
      className={cn("chaand-toast-viewport", className)}
      data-placement={placement}
      role="region"
      style={style}
    >
      {children}
    </div>
  );
}

export function ToastItem({
  children,
  className,
  closeLabel = "Dismiss notification",
  description,
  onDismiss,
  title,
  tone = "neutral",
  ...props
}: ToastItemProps) {
  return (
    <div
      {...props}
      aria-live="polite"
      className={cn("chaand-toast", "chaand-surface", className)}
      data-tone={tone}
      role="status"
    >
      <div className="chaand-toast-copy">
        {title ? <strong className="chaand-toast-title">{title}</strong> : null}
        {description ? <p className="chaand-toast-description">{description}</p> : null}
        {children}
      </div>
      <button
        aria-label={closeLabel}
        className="chaand-toast-close"
        onClick={onDismiss}
        type="button"
      >
        ×
      </button>
    </div>
  );
}

export function useToast(): ToastContextValue {
  return useToastContext();
}
