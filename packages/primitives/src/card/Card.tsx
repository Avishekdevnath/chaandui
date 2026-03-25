import * as React from "react";
import { cn } from "@chaandui/utils";
import type { BaseProps } from "../types/common";

export interface CardProps extends React.HTMLAttributes<HTMLElement>, BaseProps {}
export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement>, BaseProps {}
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement>, BaseProps {}
export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    BaseProps {}

export const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  { children, className, ...props },
  ref
) {
  return (
    <section ref={ref} className={cn("chaand-card", className)} {...props}>
      {children}
    </section>
  );
});

export const CardHeader = React.forwardRef<HTMLDivElement, CardSectionProps>(function CardHeader(
  { children, className, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn("chaand-card-header", className)} {...props}>
      {children}
    </div>
  );
});

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { children, className, ...props },
  ref
) {
  return (
    <h3 ref={ref} className={cn("chaand-card-title", className)} {...props}>
      {children}
    </h3>
  );
});

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription({ children, className, ...props }, ref) {
    return (
      <p ref={ref} className={cn("chaand-card-description", className)} {...props}>
        {children}
      </p>
    );
  }
);

export const CardContent = React.forwardRef<HTMLDivElement, CardSectionProps>(function CardContent(
  { children, className, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn("chaand-card-content", className)} {...props}>
      {children}
    </div>
  );
});

export const CardFooter = React.forwardRef<HTMLDivElement, CardSectionProps>(function CardFooter(
  { children, className, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn("chaand-card-footer", className)} {...props}>
      {children}
    </div>
  );
});
