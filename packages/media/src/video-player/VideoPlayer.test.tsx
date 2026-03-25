import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { VideoPlayer } from "./VideoPlayer";

const demoSource = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

function primeVideoElement(video: HTMLVideoElement, overrides?: Partial<{
  currentTime: number;
  duration: number;
  paused: boolean;
  ended: boolean;
  muted: boolean;
  volume: number;
  playbackRate: number;
}>) {
  const settings = {
    currentTime: 0,
    duration: 120,
    paused: true,
    ended: false,
    muted: false,
    volume: 0.75,
    playbackRate: 1,
    ...overrides,
  };

  Object.defineProperty(video, "currentTime", {
    configurable: true,
    writable: true,
    value: settings.currentTime,
  });
  Object.defineProperty(video, "duration", {
    configurable: true,
    writable: true,
    value: settings.duration,
  });
  Object.defineProperty(video, "paused", {
    configurable: true,
    writable: true,
    value: settings.paused,
  });
  Object.defineProperty(video, "ended", {
    configurable: true,
    writable: true,
    value: settings.ended,
  });
  Object.defineProperty(video, "muted", {
    configurable: true,
    writable: true,
    value: settings.muted,
  });
  Object.defineProperty(video, "volume", {
    configurable: true,
    writable: true,
    value: settings.volume,
  });
  Object.defineProperty(video, "playbackRate", {
    configurable: true,
    writable: true,
    value: settings.playbackRate,
  });
}

describe("VideoPlayer", () => {
  let playSpy: any;
  let pauseSpy: any;

  beforeEach(() => {
    playSpy = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockImplementation(async function playMock(this: HTMLMediaElement) {
        Object.defineProperty(this, "paused", {
          configurable: true,
          writable: true,
          value: false,
        });
      });

    pauseSpy = vi
      .spyOn(HTMLMediaElement.prototype, "pause")
      .mockImplementation(function pauseMock(this: HTMLMediaElement) {
        Object.defineProperty(this, "paused", {
          configurable: true,
          writable: true,
          value: true,
        });
      });
  });

  afterEach(() => {
    playSpy.mockRestore();
    pauseSpy.mockRestore();
  });

  it("calls play when play control is pressed", () => {
    const { container } = render(<VideoPlayer source={demoSource} />);

    const video = container.querySelector("video");

    expect(video).not.toBeNull();

    primeVideoElement(video as HTMLVideoElement, { paused: true });

    fireEvent.click(screen.getAllByRole("button", { name: "Play video" })[0]);

    expect(playSpy).toHaveBeenCalled();
  });

  it("cycles playback speed labels", () => {
    const { container } = render(<VideoPlayer source={demoSource} />);

    const video = container.querySelector("video") as HTMLVideoElement;

    primeVideoElement(video, { playbackRate: 1, paused: true });

    fireEvent(video, new Event("loadedmetadata"));

    const speedButton = screen.getByRole("button", { name: "Playback speed" });

    expect(speedButton.textContent).toContain("1×");

    fireEvent.click(speedButton);
    expect(speedButton.textContent).toContain("1.25×");

    fireEvent.click(speedButton);
    expect(speedButton.textContent).toContain("1.5×");
  });

  it("seeks forward 10 seconds when forward control is pressed", () => {
    const { container } = render(<VideoPlayer source={demoSource} />);

    const video = container.querySelector("video") as HTMLVideoElement;

    primeVideoElement(video, { currentTime: 20, duration: 120, paused: false });

    fireEvent(video, new Event("loadedmetadata"));

    fireEvent.click(screen.getByRole("button", { name: "Forward 10 seconds" }));

    expect(video.currentTime).toBe(30);
    expect(screen.getByRole("slider", { name: "Seek timeline" }).getAttribute("aria-valuenow")).toBe("30");
  });

  it("disables source-dependent controls when source is missing", () => {
    render(<VideoPlayer />);

    const playButtons = screen.getAllByRole("button", { name: "Play video" });

    expect(playButtons.some((button) => (button as HTMLButtonElement).disabled)).toBe(true);
    expect((screen.getByRole("button", { name: "Playback speed" }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole("button", { name: "Video quality" }) as HTMLButtonElement).disabled).toBe(true);
  });

  it("applies hover-controls dataset when enabled", () => {
    const { container } = render(<VideoPlayer hoverControls source={demoSource} />);

    const root = container.firstElementChild;

    expect(root?.getAttribute("data-hover-controls")).toBe("true");
  });

  it("opens settings menu when settings button is pressed", () => {
    render(<VideoPlayer source={demoSource} />);

    fireEvent.click(screen.getByRole("button", { name: "Open settings" }));

    expect(screen.getByRole("menu")).not.toBeNull();
    expect(screen.getByText("Reset settings")).not.toBeNull();
  });

  it("toggles loop state from the settings menu", () => {
    render(<VideoPlayer source={demoSource} />);

    fireEvent.click(screen.getByRole("button", { name: "Open settings" }));

    const loopButton = screen.getByText("Loop Off").closest("button");

    expect(loopButton).not.toBeNull();

    fireEvent.click(loopButton as HTMLButtonElement);

    expect(screen.getByText("Loop On")).not.toBeNull();
  });

  it("toggles captions and cycles caption language from settings menu", () => {
    render(<VideoPlayer source={demoSource} />);

    fireEvent.click(screen.getByRole("button", { name: "Open settings" }));

    const captionsButton = screen.getByText("CC Off").closest("button");
    const languageButton = screen.getByText("Lang EN").closest("button");

    expect(captionsButton).not.toBeNull();
    expect(languageButton).not.toBeNull();

    fireEvent.click(captionsButton as HTMLButtonElement);
    expect(screen.getByText("CC On")).not.toBeNull();

    fireEvent.click(languageButton as HTMLButtonElement);
    expect(screen.getByText("Lang ES")).not.toBeNull();
  });
});
