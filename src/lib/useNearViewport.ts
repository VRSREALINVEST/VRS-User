"use client";

import { useEffect, useRef, useState } from "react";

// True once the element comes within `margin` below the viewport, then stays
// true. Below-the-fold sections use it to defer their fetch (and so their
// media) until the visitor scrolls toward them. Headings stay server-rendered,
// and Googlebot renders with a tall viewport, so deferred content still loads.
export default function useNearViewport<T extends Element>(margin = "300px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (near || !el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // ratio > 0: a section merely touching the fold isn't "near" yet
        if (entry.intersectionRatio > 0) setNear(true);
      },
      // 0.01, not 0: an edge-adjacent target already counts as past
      // threshold 0, so scrolling it into view would never call back.
      { rootMargin: `0px 0px ${margin} 0px`, threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [near, margin]);

  return [ref, near] as const;
}
