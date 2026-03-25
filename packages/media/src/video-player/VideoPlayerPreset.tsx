"use client";

import { MediaStateAnnouncer } from "../shared";
import { VideoPlayer, type VideoPlayerProps } from "./VideoPlayer";

export type VideoPlayerPresetState =
  | "idle"
  | "playing"
  | "paused"
  | "buffering"
  | "ended"
  | "error";

export interface VideoPlayerPresetProps
  extends Omit<VideoPlayerProps, "children"> {
  announce?: boolean;
  announceMessage?: string;
  announcerPoliteness?: "polite" | "assertive";
  state?: VideoPlayerPresetState;
}

const stateMessages: Record<VideoPlayerPresetState, string> = {
  idle: "Video ready",
  playing: "Playing",
  paused: "Paused",
  buffering: "Buffering",
  ended: "Playback ended",
  error: "Playback error",
};

function resolveAnnounceMessage({
  announceMessage,
  state,
}: {
  announceMessage?: string;
  state: VideoPlayerPresetState;
}) {
  return announceMessage ?? stateMessages[state];
}

export function VideoPlayerPreset({
  announce = true,
  announceMessage,
  announcerPoliteness,
  state = "idle",
  ...props
}: VideoPlayerPresetProps) {
  const message = resolveAnnounceMessage({ announceMessage, state });
  const politeness =
    announcerPoliteness ?? (state === "error" ? "assertive" : "polite");

  return (
    <VideoPlayer {...props}>
      {announce ? (
        <MediaStateAnnouncer message={message} politeness={politeness} />
      ) : null}
    </VideoPlayer>
  );
}
