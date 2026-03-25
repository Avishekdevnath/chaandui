import * as React from "react";

export interface MediaPlaceholderProps
  extends React.ComponentPropsWithoutRef<"div"> {
  aspectRatio?: string;
  poster?: string;
  variant?: "skeleton" | "poster";
}

export function MediaPlaceholder({
  aspectRatio = "16/9",
  className,
  poster,
  style,
  variant = "skeleton",
  ...props
}: MediaPlaceholderProps) {
  const resolvedClassName = ["chaand-media-placeholder", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      {...props}
      className={resolvedClassName}
      data-variant={variant}
      style={{ ...style, aspectRatio }}
    >
      {variant === "poster" && poster ? (
        <img alt="" className="chaand-media-placeholder-poster" src={poster} />
      ) : null}
    </div>
  );
}
