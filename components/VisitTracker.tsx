"use client";

import { useEffect } from "react";

export default function VisitTracker() {
  useEffect(() => {
    const record = async () => {
      try {
        await fetch("/api/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: window.location.pathname }),
        });
      } catch {
        // analytics should never block the page
      }
    };

    record();
  }, []);

  return null;
}
