"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // A link to an anchor (/strategy-session#book, /about#sudhesh) must land
    // on it; the browser or Next scrolls there, so don't undo it.
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}