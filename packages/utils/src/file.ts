export function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${parseFloat((bytes / Math.pow(1024, index)).toFixed(1))} ${units[index]}`;
}

export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".");

  return lastDot === -1 ? "" : filename.slice(lastDot + 1).toLowerCase();
}
