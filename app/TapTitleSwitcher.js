"use client";

import { useEffect } from "react";

const AWAY_TITLE = "i miss you";

export default function TabTitleSwitcher() {
  useEffect(() => {
    const originalTitle = document.title;

    function handleVisibilityChange() {
      document.title = document.hidden ? AWAY_TITLE : originalTitle;
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle;
    };
  }, []);

  return null;
}