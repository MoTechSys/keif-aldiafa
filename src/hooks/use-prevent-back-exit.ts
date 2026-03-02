"use client";

import { useEffect } from "react";

/**
 * Prevents the browser back button from exiting the site on the home page.
 * Pushes a dummy history state and listens for popstate to re-push it,
 * keeping users engaged within the site flow.
 */
export function usePreventBackExit(isHomePage: boolean) {
  useEffect(() => {
    if (!isHomePage) return;

    // Push an initial dummy state so back doesn't exit
    const pushState = () => {
      window.history.pushState({ keif: true }, "", window.location.href);
    };

    // Only push if we don't already have our marker
    if (!window.history.state?.keif) {
      pushState();
    }

    const handlePopState = (e: PopStateEvent) => {
      // If user pressed back, push state again to prevent exit
      if (!e.state?.keif) {
        pushState();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isHomePage]);
}
