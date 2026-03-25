import type { ComponentProps } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { VideoPlayerPreset } from "./VideoPlayerPreset";

const demoSource =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const meta = {
  title: "Media/VideoPlayer",
  component: VideoPlayer,
  args: {
    accent: "danger",
    hoverControls: false,
    source: demoSource,
    style: { width: "min(860px, 100%)", borderRadius: 16, overflow: "hidden" },
    theme: "cinema",
    variant: "default",
  },
  argTypes: {
    accent: {
      control: "select",
      options: ["primary", "success", "danger", "warning", "info", "rose", "violet", "amber", "teal", "sky"],
    },
    theme: {
      control: "inline-radio",
      options: ["cinema", "luxe", "midnight", "aurora"],
    },
    variant: {
      control: "multi-select",
      options: ["default", "minimal", "floating", "pill", "rounded", "cinema"],
    },
    hoverControls: {
      control: "boolean",
    },
    skin: {
      control: "inline-radio",
      options: ["cinema", "luxe"],
    },
  },
};

export default meta;

export const Playground = {};

export const ThemeMatrix = {
  render: (args: ComponentProps<typeof VideoPlayer>) => (
    <div style={{ display: "grid", gap: 16 }}>
      {(["cinema", "luxe", "midnight", "aurora"] as const).map((theme) => (
        <div key={theme} style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, opacity: 0.75, textTransform: "uppercase" }}>
            {theme}
          </span>
          <VideoPlayer {...args} theme={theme} />
        </div>
      ))}
    </div>
  ),
};

export const AccentMatrix = {
  render: (args: ComponentProps<typeof VideoPlayer>) => (
    <div style={{ display: "grid", gap: 16 }}>
      {(["primary", "success", "danger", "warning", "info", "rose", "violet", "amber", "teal", "sky"] as const).map((accent) => (
        <div key={accent} style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, opacity: 0.75, textTransform: "uppercase" }}>
            {accent}
          </span>
          <VideoPlayer {...args} accent={accent} />
        </div>
      ))}
    </div>
  ),
};

export const VariantMatrix = {
  render: (args: ComponentProps<typeof VideoPlayer>) => (
    <div style={{ display: "grid", gap: 16 }}>
      {([
        "default",
        "minimal",
        "floating",
        "pill",
        "rounded",
        "cinema",
      ] as const).map((variant) => (
        <div key={variant} style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, opacity: 0.75, textTransform: "uppercase" }}>
            {variant}
          </span>
          <VideoPlayer {...args} variant={variant} />
        </div>
      ))}
    </div>
  ),
};

export const PresetStates = {
  render: (args: ComponentProps<typeof VideoPlayer>) => (
    <div style={{ display: "grid", gap: 16 }}>
      {([
        "idle",
        "playing",
        "paused",
        "buffering",
        "ended",
        "error",
      ] as const).map((state) => (
        <div key={state} style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, opacity: 0.75, textTransform: "uppercase" }}>
            {state}
          </span>
          <VideoPlayerPreset {...args} state={state} />
        </div>
      ))}
    </div>
  ),
};
