import * as React from "react";

export type Size = "sm" | "md" | "lg";
export type Tone = "neutral" | "primary" | "success" | "warning" | "danger";
export type Variant = "solid" | "soft" | "outline" | "ghost";

export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  id?: string;
  "data-testid"?: string;
}
