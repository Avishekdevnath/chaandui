import * as React from "react";

export function useObjectUrl(value: Blob | File | null): string | undefined {
  const [objectUrl, setObjectUrl] = React.useState<string>();

  React.useEffect(() => {
    if (!value) {
      setObjectUrl(undefined);
      return;
    }

    const nextObjectUrl = URL.createObjectURL(value);
    setObjectUrl(nextObjectUrl);

    return () => {
      URL.revokeObjectURL(nextObjectUrl);
    };
  }, [value]);

  return objectUrl;
}
