"use client";

import { useState, useEffect, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface UsePWAInstallReturn {
  /** Whether the app can be installed (browser supports it and not yet installed) */
  canInstall: boolean;
  /** Whether the app is running in standalone PWA mode */
  isStandalone: boolean;
  /** Whether the device is iOS */
  isIOS: boolean;
  /** Trigger the native browser install prompt */
  triggerInstall: () => Promise<boolean>;
}

/**
 * Custom hook for PWA installation.
 * Captures the browser's `beforeinstallprompt` event and exposes a clean API.
 * Removes the need for manual install buttons — calls the native prompt only.
 */
export function usePWAInstall(): UsePWAInstallReturn {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check standalone mode
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone ===
        true;
    setIsStandalone(standalone);

    // Check iOS
    const iosDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: boolean }).MSStream;
    setIsIOS(iosDevice);

    // Capture the install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Listen for successful install
    window.addEventListener("appinstalled", () => {
      setDeferredPrompt(null);
      localStorage.setItem("pwa-installed", "true");
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const triggerInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) return false;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      localStorage.setItem("pwa-installed", "true");
      return true;
    }

    return false;
  }, [deferredPrompt]);

  return {
    canInstall: !!deferredPrompt,
    isStandalone,
    isIOS,
    triggerInstall,
  };
}
