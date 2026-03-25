"use client";

import * as React from "react";
import {
  resolveMediaPlayerTheme,
  type MediaPlayerSkin,
  type MediaPlayerTheme,
} from "../shared/utils/playerHelpers";
import { useVideoPlayerController } from "./useVideoPlayerController";

export interface VideoPlayerProps extends React.ComponentPropsWithoutRef<"div"> {
  accent?: VideoPlayerAccent;
  source?: string;
  hoverControls?: boolean;
  /**
   * @deprecated Use `theme` instead.
   */
  skin?: MediaPlayerSkin;
  theme?: MediaPlayerTheme;
  variant?: VideoPlayerVariant | VideoPlayerVariant[];
}

export type VideoPlayerAccent =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "rose"
  | "violet"
  | "amber"
  | "teal"
  | "sky";

export type VideoPlayerVariant =
  | "default"
  | "minimal"
  | "floating"
  | "pill"
  | "rounded"
  | "cinema";

export function VideoPlayer({
  accent = "danger",
  children,
  className,
  hoverControls = false,
  source,
  skin,
  theme,
  variant = "default",
  ...props
}: VideoPlayerProps) {
  const resolvedTheme = resolveMediaPlayerTheme({
    defaultTheme: "cinema",
    skin,
    theme,
  });

  React.useEffect(() => {
    if (skin && !theme) {
      // eslint-disable-next-line no-console
      console.warn(
        "[ChaandUI] `skin` is deprecated and will be removed in v1.0. Use `theme` instead.",
      );
    }
  }, [skin, theme]);

  const rootClassName = ["chaand-video-player", className]
    .filter(Boolean)
    .join(" ");

  const variants = Array.isArray(variant) ? variant : [variant];
  const variantValue = Array.from(new Set(variants.filter(Boolean))).join(" ");

  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const settingsWrapRef = React.useRef<HTMLDivElement | null>(null);

  const {
    bufferedPercent,
    captionLanguageLabel,
    cycleCaptionLanguage,
    currentTime,
    duration,
    handleProgressClick,
    handleProgressKeyDown,
    handleVolumeKeyDown,
    handleVolumeTrackClick,
    hasSource,
    isCaptionsEnabled,
    isFullscreen,
    isLooping,
    isPlaying,
    progressPercent,
    qualityLabel,
    resetPlayerSettings,
    skipBy,
    speedLabel,
    surfaceRef,
    timeLabel,
    toggleFullscreen,
    toggleLoop,
    toggleCaptions,
    toggleMute,
    togglePictureInPicture,
    togglePlay,
    videoRef,
    volumeLabel,
    volumePercent,
    cyclePlaybackRate,
    cycleQuality,
    playbackRate,
    qualities,
    setPlaybackRateValue,
    setQualityValue,
    speeds,
  } = useVideoPlayerController({ source });

  React.useEffect(() => {
    if (!isSettingsOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!settingsWrapRef.current?.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSettingsOpen]);

  React.useEffect(() => {
    if (!hasSource) {
      setIsSettingsOpen(false);
    }
  }, [hasSource]);

  return (
    <div
      {...props}
      className={rootClassName}
      data-accent={accent}
      data-chaand-theme={resolvedTheme}
      data-has-source={hasSource ? "true" : "false"}
      data-hover-controls={hoverControls ? "true" : "false"}
      data-playing={isPlaying ? "true" : "false"}
      data-skin={resolvedTheme}
      data-variant={variantValue || "default"}
    >
      <div className="chaand-video-player-surface" ref={surfaceRef}>
        {source ? (
          <video className="chaand-video-player-viewport" playsInline ref={videoRef} src={source} />
        ) : (
          <div
            aria-label="Video preview"
            className="chaand-video-player-viewport chaand-video-player-viewport--placeholder"
            role="img"
          />
        )}

        <div className="chaand-video-player-gradient" />

        <div className="chaand-video-player-center-play">
          <button
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="chaand-video-player-play-ring"
            disabled={!hasSource}
            onClick={togglePlay}
            type="button"
          >
            {isPlaying ? (
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <rect height="16" rx="1" width="4" x="6" y="4" />
                <rect height="16" rx="1" width="4" x="14" y="4" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <polygon points="7,3 21,12 7,21" />
              </svg>
            )}
          </button>
        </div>

        <div className="chaand-video-player-top-bar">
          <span className="chaand-video-player-top-badge">{qualityLabel}</span>
          <div className="chaand-video-player-top-actions">
            <button
              aria-label="Picture in picture"
              className="chaand-video-player-icon-button"
              disabled={!hasSource}
              onClick={togglePictureInPicture}
              type="button"
            >
              <svg aria-hidden="true" className="chaand-video-player-icon" viewBox="0 0 24 24">
                <rect height="14" rx="2" width="20" x="2" y="3" />
                <rect height="6" rx="1" width="9" x="11" y="10" />
              </svg>
            </button>
            <button
              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              className="chaand-video-player-icon-button"
              disabled={!hasSource}
              onClick={toggleFullscreen}
              type="button"
            >
              <svg aria-hidden="true" className="chaand-video-player-icon" viewBox="0 0 24 24">
                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                <path d="M16 3h3a2 2 0 0 1 2 2v3" />
                <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
                <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="chaand-video-player-controls">
          <div
            aria-label="Seek timeline"
            aria-valuemax={Math.max(duration, 0)}
            aria-valuemin={0}
            aria-valuenow={Math.max(currentTime, 0)}
            className="chaand-video-player-progress-track"
            onClick={handleProgressClick}
            onKeyDown={handleProgressKeyDown}
            role="slider"
            tabIndex={hasSource ? 0 : -1}
          >
            <div className="chaand-video-player-progress-buffer" style={{ width: `${bufferedPercent}%` }} />
            <div className="chaand-video-player-progress-fill" style={{ width: `${progressPercent}%` }}>
              <div className="chaand-video-player-progress-thumb" />
            </div>
          </div>

          <div className="chaand-video-player-control-row">
            <button
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="chaand-video-player-control-button"
              disabled={!hasSource}
              onClick={togglePlay}
              type="button"
            >
              {isPlaying ? (
                <svg aria-hidden="true" className="chaand-video-player-icon" viewBox="0 0 24 24">
                  <rect height="16" rx="1" width="4" x="6" y="4" />
                  <rect height="16" rx="1" width="4" x="14" y="4" />
                </svg>
              ) : (
                <svg aria-hidden="true" className="chaand-video-player-icon" viewBox="0 0 24 24">
                  <polygon points="6,3 20,12 6,21" />
                </svg>
              )}
            </button>

            <button
              aria-label="Replay 10 seconds"
              className="chaand-video-player-control-button"
              disabled={!hasSource}
              onClick={() => skipBy(-10)}
              type="button"
            >
              <svg aria-hidden="true" className="chaand-video-player-icon" viewBox="0 0 24 24">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>

            <button
              aria-label="Forward 10 seconds"
              className="chaand-video-player-control-button"
              disabled={!hasSource}
              onClick={() => skipBy(10)}
              type="button"
            >
              <svg aria-hidden="true" className="chaand-video-player-icon" viewBox="0 0 24 24">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>

            <div className="chaand-video-player-volume-wrap">
              <button
                aria-label={volumeLabel}
                className="chaand-video-player-control-button"
                disabled={!hasSource}
                onClick={toggleMute}
                type="button"
              >
                {volumePercent <= 0 ? (
                  <svg aria-hidden="true" className="chaand-video-player-icon" viewBox="0 0 24 24">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19" />
                    <line x1="23" x2="17" y1="9" y2="15" />
                    <line x1="17" x2="23" y1="9" y2="15" />
                  </svg>
                ) : (
                  <svg aria-hidden="true" className="chaand-video-player-icon" viewBox="0 0 24 24">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
              <div
                aria-label="Volume"
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={volumePercent}
                className="chaand-video-player-volume-track"
                onClick={handleVolumeTrackClick}
                onKeyDown={handleVolumeKeyDown}
                role="slider"
                tabIndex={hasSource ? 0 : -1}
              >
                <div className="chaand-video-player-volume-fill" style={{ width: `${volumePercent}%` }} />
              </div>
            </div>

            <span className="chaand-video-player-time-label">{timeLabel}</span>
            <span className="chaand-video-player-spacer" />

            <button
              aria-label="Playback speed"
              className="chaand-video-player-control-badge"
              disabled={!hasSource}
              onClick={cyclePlaybackRate}
              type="button"
            >
              {speedLabel}
            </button>

            <button
              aria-label="Video quality"
              className="chaand-video-player-control-badge"
              disabled={!hasSource}
              onClick={cycleQuality}
              type="button"
            >
              {qualityLabel}
            </button>

            <div className="chaand-video-player-settings-wrap" ref={settingsWrapRef}>
              <button
                aria-controls="chaand-video-player-settings-menu"
                aria-expanded={isSettingsOpen}
                aria-label="Open settings"
                className="chaand-video-player-control-button"
                disabled={!hasSource}
                onClick={() => setIsSettingsOpen((previous) => !previous)}
                type="button"
              >
                <svg aria-hidden="true" className="chaand-video-player-icon" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1.18V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 2.82-1.18V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1.08 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </button>

              {isSettingsOpen ? (
                <div
                  className="chaand-video-player-settings-menu"
                  id="chaand-video-player-settings-menu"
                  role="menu"
                >
                  <div className="chaand-video-player-settings-group" role="group" aria-label="Playback speed">
                    <p className="chaand-video-player-settings-title">Speed</p>
                    <div className="chaand-video-player-settings-options">
                      {speeds.map((speed) => {
                        const isActive = Math.abs(speed - playbackRate) < 0.01;

                        return (
                          <button
                            aria-pressed={isActive}
                            className="chaand-video-player-settings-option"
                            data-active={isActive ? "true" : "false"}
                            key={speed}
                            onClick={() => setPlaybackRateValue(speed)}
                            role="menuitemradio"
                            type="button"
                          >
                            {speed}×
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="chaand-video-player-settings-group" role="group" aria-label="Video quality">
                    <p className="chaand-video-player-settings-title">Quality</p>
                    <div className="chaand-video-player-settings-options">
                      {qualities.map((quality) => {
                        const isActive = quality === qualityLabel;

                        return (
                          <button
                            aria-pressed={isActive}
                            className="chaand-video-player-settings-option"
                            data-active={isActive ? "true" : "false"}
                            key={quality}
                            onClick={() => setQualityValue(quality)}
                            role="menuitemradio"
                            type="button"
                          >
                            {quality}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="chaand-video-player-settings-group" role="group" aria-label="Playback utility">
                    <p className="chaand-video-player-settings-title">Utility</p>
                    <div className="chaand-video-player-settings-options">
                      <button
                        aria-pressed={isLooping}
                        className="chaand-video-player-settings-option"
                        data-active={isLooping ? "true" : "false"}
                        onClick={toggleLoop}
                        role="menuitemcheckbox"
                        type="button"
                      >
                        {isLooping ? "Loop On" : "Loop Off"}
                      </button>
                      <button
                        aria-pressed={isCaptionsEnabled}
                        className="chaand-video-player-settings-option"
                        data-active={isCaptionsEnabled ? "true" : "false"}
                        onClick={toggleCaptions}
                        role="menuitemcheckbox"
                        type="button"
                      >
                        {isCaptionsEnabled ? "CC On" : "CC Off"}
                      </button>
                      <button
                        className="chaand-video-player-settings-option"
                        onClick={cycleCaptionLanguage}
                        type="button"
                      >
                        Lang {captionLanguageLabel}
                      </button>
                    </div>
                  </div>

                  <button
                    className="chaand-video-player-settings-reset"
                    onClick={() => {
                      resetPlayerSettings();
                      setIsSettingsOpen(false);
                    }}
                    type="button"
                  >
                    Reset settings
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
