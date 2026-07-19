"use client";

import { useEffect } from "react";

export function PWARegister() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("[PWA] Service Worker registered with scope:", registration.scope);
          })
          .catch((error) => {
            console.error("[PWA] Service Worker registration failed:", error);
          });
      });
    } else if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Allow registration on localhost for debugging if wanted, but standard hostname checks apply
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("[PWA Debug] Service Worker registered with scope:", registration.scope);
          })
          .catch((error) => {
            console.error("[PWA Debug] Service Worker registration failed:", error);
          });
      });
    }
  }, []);

  return null;
}
