/**
 * ChaandUI Icon Library
 *
 * Inline SVG icons — zero dependencies, currentColor-aware, tree-shakeable.
 * Stroke style: 2px, round caps/joins, 24×24 viewBox (rendered at 18px default).
 * Paths sourced from Lucide icon geometry (MIT-licensed).
 */

import { createIcon } from "./Icon";

/* ─── Media transport ─── */

export const PlayIcon = createIcon("PlayIcon",
  <polygon points="6 3 20 12 6 21 6 3" />
);

export const PauseIcon = createIcon("PauseIcon",
  <><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></>
);

export const SkipBackIcon = createIcon("SkipBackIcon",
  <><polygon points="19 20 9 12 19 4 19 20" /><line x1="5" y1="19" x2="5" y2="5" /></>
);

export const SkipForwardIcon = createIcon("SkipForwardIcon",
  <><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" /></>
);

/* ─── Volume ─── */

export const Volume2Icon = createIcon("Volume2Icon",
  <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></>
);

export const VolumeXIcon = createIcon("VolumeXIcon",
  <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></>
);

export const Volume1Icon = createIcon("Volume1Icon",
  <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></>
);

/* ─── Screen controls ─── */

export const MaximizeIcon = createIcon("MaximizeIcon",
  <><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>
);

export const MinimizeIcon = createIcon("MinimizeIcon",
  <><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></>
);

export const PictureInPictureIcon = createIcon("PictureInPictureIcon",
  <><rect x="2" y="3" width="20" height="14" rx="2" /><rect x="11" y="10" width="9" height="6" rx="1" /></>
);

export const SubtitlesIcon = createIcon("SubtitlesIcon",
  <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M7 15h4" /><path d="M15 15h2" /><path d="M7 11h2" /><path d="M13 11h4" /></>
);

/* ─── Zoom / image ─── */

export const ZoomInIcon = createIcon("ZoomInIcon",
  <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></>
);

export const ZoomOutIcon = createIcon("ZoomOutIcon",
  <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" /></>
);

export const RotateCcwIcon = createIcon("RotateCcwIcon",
  <><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></>
);

/* ─── Navigation ─── */

export const ChevronLeftIcon = createIcon("ChevronLeftIcon",
  <polyline points="15 18 9 12 15 6" />
);

export const ChevronRightIcon = createIcon("ChevronRightIcon",
  <polyline points="9 18 15 12 9 6" />
);

export const ChevronUpIcon = createIcon("ChevronUpIcon",
  <polyline points="18 15 12 9 6 15" />
);

export const ChevronDownIcon = createIcon("ChevronDownIcon",
  <polyline points="6 9 12 15 18 9" />
);

/* ─── Actions ─── */

export const XIcon = createIcon("XIcon",
  <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
);

export const UploadCloudIcon = createIcon("UploadCloudIcon",
  <><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></>
);

export const TrashIcon = createIcon("TrashIcon",
  <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>
);

/* ─── Status ─── */

export const AlertCircleIcon = createIcon("AlertCircleIcon",
  <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>
);

export const LoaderIcon = createIcon("LoaderIcon",
  <><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" /></>
);

/* ─── File types ─── */

export const FileIcon = createIcon("FileIcon",
  <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>
);

export const ImageIcon = createIcon("ImageIcon",
  <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>
);

export const MusicIcon = createIcon("MusicIcon",
  <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>
);

export const FilmIcon = createIcon("FilmIcon",
  <><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /><line x1="17" y1="17" x2="22" y2="17" /></>
);

/* ─── Misc ─── */

export const GaugeIcon = createIcon("GaugeIcon",
  <><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" /><path d="M12 6v6l4 2" /></>
);

export const SettingsIcon = createIcon("SettingsIcon",
  <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>
);
