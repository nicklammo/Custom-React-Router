import { useEffect } from "react"

export const useScrollRestoration = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const positions = new Map<string, number>();

    const saveScrollPosition = () => {
      positions.set(window.location.pathname, window.scrollY);
    }

    const restoreScrollPosition = () => {
      const y = positions.get(window.location.pathname) || 0;
      window.scrollTo(0, y);
    }

    window.addEventListener("beforeunload", saveScrollPosition);
    window.addEventListener("popstate", restoreScrollPosition);

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
      window.removeEventListener("popstate", restoreScrollPosition);
    };
  }, [enabled]);
}