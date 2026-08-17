import { useEffect, useState } from "react";

export function useAssetExists(url) {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!url) {
      setExists(false);
      return;
    }

    const controller = new AbortController();

    async function verify() {
      try {
        const head = await fetch(url, {
          method: "HEAD",
          cache: "no-store",
          signal: controller.signal,
        });

        if (head.ok) {
          setExists(true);
          return;
        }

        const get = await fetch(url, {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });
        setExists(get.ok);
      } catch {
        setExists(false);
      }
    }

    verify();

    return () => {
      controller.abort();
    };
  }, [url]);

  return exists;
}
