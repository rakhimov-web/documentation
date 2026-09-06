import { useEffect, useState } from "react";

/**
 * Returns `true` for `ms` milliseconds after `key` changes, then `false`.
 * Used to drive skeleton loaders when navigating between routes, since this
 * app has no real backend to wait on.
 */
export function useDelayedLoading(key: string, ms = 500) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [key, ms]);

  return loading;
}
