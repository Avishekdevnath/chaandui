"use client";

import * as React from "react";

const SPEED_STEPS = [0.5, 1, 1.25, 1.5, 2] as const;
const QUALITY_STEPS = ["SD", "HD", "4K"] as const;
const CAPTION_LANGUAGES = ["EN", "ES", "HI", "AR"] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function toPercent(value: number, total: number) {
  if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0) {
    return 0;
  }

  return clamp((value / total) * 100, 0, 100);
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const whole = Math.floor(seconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const secs = whole % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

interface UseVideoPlayerControllerOptions {
  source?: string;
}

export function useVideoPlayerController({ source }: UseVideoPlayerControllerOptions) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const surfaceRef = React.useRef<HTMLDivElement | null>(null);
  const lastNonZeroVolumeRef = React.useRef(0.75);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [bufferedTime, setBufferedTime] = React.useState(0);
  const [volume, setVolume] = React.useState(0.75);
  const [isMuted, setIsMuted] = React.useState(false);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [qualityIndex, setQualityIndex] = React.useState(1);
  const [isLooping, setIsLooping] = React.useState(false);
  const [isCaptionsEnabled, setIsCaptionsEnabled] = React.useState(false);
  const [captionLanguageIndex, setCaptionLanguageIndex] = React.useState(0);

  const hasSource = Boolean(source);

  const updateBufferedTime = React.useCallback((node: HTMLVideoElement) => {
    const { buffered } = node;

    if (!buffered || buffered.length === 0) {
      setBufferedTime(0);
      return;
    }

    setBufferedTime(buffered.end(buffered.length - 1));
  }, []);

  const syncFromVideo = React.useCallback(() => {
    const node = videoRef.current;

    if (!node) {
      return;
    }

    setDuration(Number.isFinite(node.duration) ? node.duration : 0);
    setCurrentTime(Number.isFinite(node.currentTime) ? node.currentTime : 0);
    setIsPlaying(!node.paused && !node.ended);
    setVolume(clamp(Number.isFinite(node.volume) ? node.volume : 0.75, 0, 1));
    setIsMuted(node.muted || node.volume === 0);
    setPlaybackRate(node.playbackRate);
    setIsLooping(node.loop);
    updateBufferedTime(node);
  }, [updateBufferedTime]);

  const applyCaptionState = React.useCallback((node: HTMLVideoElement, enabled: boolean, language: string) => {
    const tracks = Array.from(node.textTracks ?? []);

    if (tracks.length === 0) {
      return;
    }

    const normalizedLanguage = language.toLowerCase();

    const matchingTrack = tracks.find((track) =>
      (track.language ?? "").toLowerCase().startsWith(normalizedLanguage),
    );

    tracks.forEach((track) => {
      // eslint-disable-next-line no-param-reassign
      track.mode = "disabled";
    });

    if (enabled) {
      if (matchingTrack) {
        matchingTrack.mode = "showing";
      } else {
        tracks[0].mode = "showing";
      }
    }
  }, []);

  React.useEffect(() => {
    const node = videoRef.current;

    if (!node) {
      return;
    }

    const handleLoadedMetadata = () => syncFromVideo();
    const handleTimeUpdate = () => syncFromVideo();
    const handleProgress = () => syncFromVideo();
    const handlePlay = () => syncFromVideo();
    const handlePause = () => syncFromVideo();
    const handleVolumeChange = () => syncFromVideo();
    const handleRateChange = () => syncFromVideo();
    const handleEnded = () => syncFromVideo();

    node.addEventListener("loadedmetadata", handleLoadedMetadata);
    node.addEventListener("timeupdate", handleTimeUpdate);
    node.addEventListener("progress", handleProgress);
    node.addEventListener("play", handlePlay);
    node.addEventListener("pause", handlePause);
    node.addEventListener("volumechange", handleVolumeChange);
    node.addEventListener("ratechange", handleRateChange);
    node.addEventListener("ended", handleEnded);

    syncFromVideo();

    return () => {
      node.removeEventListener("loadedmetadata", handleLoadedMetadata);
      node.removeEventListener("timeupdate", handleTimeUpdate);
      node.removeEventListener("progress", handleProgress);
      node.removeEventListener("play", handlePlay);
      node.removeEventListener("pause", handlePause);
      node.removeEventListener("volumechange", handleVolumeChange);
      node.removeEventListener("ratechange", handleRateChange);
      node.removeEventListener("ended", handleEnded);
    };
  }, [syncFromVideo]);

  React.useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setBufferedTime(0);
    setPlaybackRate(1);
  }, [source]);

  const togglePlay = React.useCallback(async () => {
    const node = videoRef.current;

    if (!node) {
      return;
    }

    if (node.paused || node.ended) {
      try {
        await node.play();
      } catch {
        // Ignore autoplay/play interruption errors in demo contexts.
      }

      return;
    }

    node.pause();
  }, []);

  const seekToTime = React.useCallback((time: number) => {
    const node = videoRef.current;

    if (!node || !Number.isFinite(node.duration) || node.duration <= 0) {
      return;
    }

    node.currentTime = clamp(time, 0, node.duration);
    syncFromVideo();
  }, [syncFromVideo]);

  const skipBy = React.useCallback((deltaSeconds: number) => {
    const node = videoRef.current;

    if (!node) {
      return;
    }

    seekToTime(node.currentTime + deltaSeconds);
  }, [seekToTime]);

  const seekFromClientX = React.useCallback((clientX: number, container: HTMLDivElement) => {
    const rect = container.getBoundingClientRect();

    if (rect.width <= 0 || !Number.isFinite(duration) || duration <= 0) {
      return;
    }

    const percent = clamp((clientX - rect.left) / rect.width, 0, 1);
    seekToTime(percent * duration);
  }, [duration, seekToTime]);

  const handleProgressClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    seekFromClientX(event.clientX, event.currentTarget);
  }, [seekFromClientX]);

  const handleProgressKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      skipBy(-5);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      skipBy(5);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      seekToTime(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      seekToTime(duration);
    }
  }, [duration, seekToTime, skipBy]);

  const setVolumeFromPercent = React.useCallback((nextVolume: number) => {
    const node = videoRef.current;

    if (!node) {
      return;
    }

    const clamped = clamp(nextVolume, 0, 1);
    node.volume = clamped;
    node.muted = clamped === 0;

    if (clamped > 0) {
      lastNonZeroVolumeRef.current = clamped;
    }

    syncFromVideo();
  }, [syncFromVideo]);

  const handleVolumeTrackClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    if (rect.width <= 0) {
      return;
    }

    const percent = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    setVolumeFromPercent(percent);
  }, [setVolumeFromPercent]);

  const handleVolumeKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setVolumeFromPercent((isMuted ? 0 : volume) - 0.05);
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setVolumeFromPercent((isMuted ? 0 : volume) + 0.05);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setVolumeFromPercent(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setVolumeFromPercent(1);
    }
  }, [isMuted, setVolumeFromPercent, volume]);

  const toggleMute = React.useCallback(() => {
    const node = videoRef.current;

    if (!node) {
      return;
    }

    if (node.muted || node.volume === 0) {
      node.muted = false;
      node.volume = clamp(lastNonZeroVolumeRef.current || 0.75, 0.05, 1);
      syncFromVideo();
      return;
    }

    if (node.volume > 0) {
      lastNonZeroVolumeRef.current = node.volume;
    }

    node.muted = true;
    syncFromVideo();
  }, [syncFromVideo]);

  const cyclePlaybackRate = React.useCallback(() => {
    const node = videoRef.current;

    if (!node) {
      return;
    }

    const currentIndex = SPEED_STEPS.findIndex((speed) => Math.abs(speed - playbackRate) < 0.01);
    const nextRate = SPEED_STEPS[(currentIndex + 1 + SPEED_STEPS.length) % SPEED_STEPS.length];
    node.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  }, [playbackRate]);

  const setPlaybackRateValue = React.useCallback((nextRate: number) => {
    const node = videoRef.current;

    if (!node) {
      return;
    }

    const isValid = SPEED_STEPS.some((step) => Math.abs(step - nextRate) < 0.01);

    if (!isValid) {
      return;
    }

    node.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  }, []);

  const cycleQuality = React.useCallback(() => {
    setQualityIndex((previous) => (previous + 1) % QUALITY_STEPS.length);
  }, []);

  const toggleLoop = React.useCallback(() => {
    const node = videoRef.current;

    if (!node) {
      return;
    }

    const nextLoop = !node.loop;
    node.loop = nextLoop;
    setIsLooping(nextLoop);
  }, []);

  const toggleCaptions = React.useCallback(() => {
    const node = videoRef.current;
    const nextEnabled = !isCaptionsEnabled;

    setIsCaptionsEnabled(nextEnabled);

    if (!node) {
      return;
    }

    applyCaptionState(node, nextEnabled, CAPTION_LANGUAGES[captionLanguageIndex]);
  }, [applyCaptionState, captionLanguageIndex, isCaptionsEnabled]);

  const cycleCaptionLanguage = React.useCallback(() => {
    setCaptionLanguageIndex((previous) => {
      const nextIndex = (previous + 1) % CAPTION_LANGUAGES.length;
      const node = videoRef.current;

      if (node) {
        applyCaptionState(node, isCaptionsEnabled, CAPTION_LANGUAGES[nextIndex]);
      }

      return nextIndex;
    });
  }, [applyCaptionState, isCaptionsEnabled]);

  const setQualityValue = React.useCallback((nextQuality: (typeof QUALITY_STEPS)[number]) => {
    const nextIndex = QUALITY_STEPS.findIndex((value) => value === nextQuality);

    if (nextIndex < 0) {
      return;
    }

    setQualityIndex(nextIndex);
  }, []);

  const resetPlayerSettings = React.useCallback(() => {
    const node = videoRef.current;

    if (!node) {
      return;
    }

    node.playbackRate = 1;
    node.muted = false;
    node.volume = clamp(lastNonZeroVolumeRef.current || 0.75, 0.05, 1);
    node.loop = false;
    setQualityIndex(1);
    setIsLooping(false);
    setIsCaptionsEnabled(false);
    setCaptionLanguageIndex(0);
    applyCaptionState(node, false, CAPTION_LANGUAGES[0]);
    syncFromVideo();
  }, [applyCaptionState, syncFromVideo]);

  const togglePictureInPicture = React.useCallback(async () => {
    const node = videoRef.current as (HTMLVideoElement & {
      requestPictureInPicture?: () => Promise<unknown>;
    }) | null;

    if (!node || typeof document === "undefined") {
      return;
    }

    const activePipElement = document.pictureInPictureElement;

    try {
      if (activePipElement === node && document.exitPictureInPicture) {
        await document.exitPictureInPicture();
        return;
      }

      if (node.requestPictureInPicture) {
        await node.requestPictureInPicture();
      }
    } catch {
      // Ignore unsupported or blocked PiP requests in demo environments.
    }
  }, []);

  const toggleFullscreen = React.useCallback(async () => {
    const node = surfaceRef.current;

    if (!node || typeof document === "undefined") {
      return;
    }

    try {
      if (document.fullscreenElement === node && document.exitFullscreen) {
        await document.exitFullscreen();
        return;
      }

      if (node.requestFullscreen) {
        await node.requestFullscreen();
      }
    } catch {
      // Ignore unsupported or blocked fullscreen requests in demo environments.
    }
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (target) {
        const tagName = target.tagName.toLowerCase();

        if (tagName === "input" || tagName === "textarea" || target.isContentEditable) {
          return;
        }
      }

      const key = event.key.toLowerCase();

      if (key === " " || key === "k") {
        event.preventDefault();
        void togglePlay();
        return;
      }

      if (key === "j") {
        event.preventDefault();
        skipBy(-10);
        return;
      }

      if (key === "l") {
        event.preventDefault();
        skipBy(10);
        return;
      }

      if (key === "m") {
        event.preventDefault();
        toggleMute();
        return;
      }

      if (key === "f") {
        event.preventDefault();
        void toggleFullscreen();
        return;
      }

      if (key === "c") {
        event.preventDefault();
        toggleCaptions();
        return;
      }

      if (key === "v") {
        event.preventDefault();
        cycleCaptionLanguage();
        return;
      }

      if (key === "r") {
        event.preventDefault();
        toggleLoop();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [cycleCaptionLanguage, skipBy, toggleCaptions, toggleFullscreen, toggleLoop, toggleMute, togglePlay]);

  const isFullscreen = typeof document !== "undefined" && document.fullscreenElement === surfaceRef.current;
  const progressPercent = toPercent(currentTime, duration);
  const bufferedPercent = toPercent(bufferedTime, duration);
  const volumePercent = Math.round((isMuted ? 0 : volume) * 100);

  const volumeLabel = isMuted || volume <= 0
    ? "Unmute"
    : "Mute";

  const timeLabel = `${formatTime(currentTime)} / ${formatTime(duration)}`;
  const speedLabel = `${playbackRate}×`;
  const qualityLabel = QUALITY_STEPS[qualityIndex];
  const captionLanguageLabel = CAPTION_LANGUAGES[captionLanguageIndex];
  const captionsLabel = isCaptionsEnabled ? `CC ${captionLanguageLabel}` : "CC Off";

  return {
    bufferedPercent,
    captionLanguageLabel,
    captionsLabel,
    cyclePlaybackRate,
    cycleQuality,
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
    playbackRate,
    progressPercent,
    qualities: QUALITY_STEPS,
    qualityLabel,
    resetPlayerSettings,
    setPlaybackRateValue,
    setQualityValue,
    skipBy,
    speeds: SPEED_STEPS,
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
  };
}
