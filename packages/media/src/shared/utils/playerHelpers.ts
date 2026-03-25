export type MediaPlayerSkin = "cinema" | "luxe";
export type MediaPlayerTheme = "cinema" | "luxe" | "midnight" | "aurora";

export interface ResolveMediaPlayerThemeOptions {
  defaultTheme?: MediaPlayerTheme;
  skin?: MediaPlayerSkin;
  theme?: MediaPlayerTheme;
}

export function resolveMediaPlayerTheme({
  defaultTheme = "cinema",
  skin,
  theme,
}: ResolveMediaPlayerThemeOptions): MediaPlayerTheme {
  return theme ?? skin ?? defaultTheme;
}
