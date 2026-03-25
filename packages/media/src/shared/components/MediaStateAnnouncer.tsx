import * as React from "react";

export interface MediaStateAnnouncerProps {
  message: string;
  politeness?: "polite" | "assertive";
}

const visuallyHiddenStyle: React.CSSProperties = {
  borderWidth: 0,
  clip: "rect(0, 0, 0, 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
};

export function MediaStateAnnouncer({
  message,
  politeness = "polite",
}: MediaStateAnnouncerProps) {
  return (
    <div
      aria-live={politeness}
      role={politeness === "assertive" ? "alert" : "status"}
      style={visuallyHiddenStyle}
    >
      {message}
    </div>
  );
}
