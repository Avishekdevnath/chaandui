import * as React from "react";

const iconSizes = {
  sm: "var(--chaand-space-4)",
  md: "var(--chaand-space-5)",
  lg: "var(--chaand-space-6)"
} as const;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  label?: string;
  size?: keyof typeof iconSizes;
}

export function Icon({
  children,
  label,
  size = "md",
  style,
  ...props
}: IconProps): React.JSX.Element {
  const dimension = iconSizes[size];

  return (
    <svg
      aria-hidden={label ? undefined : true}
      aria-label={label}
      focusable="false"
      role={label ? "img" : undefined}
      style={{
        width: dimension,
        height: dimension,
        flexShrink: 0,
        ...style
      }}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}
