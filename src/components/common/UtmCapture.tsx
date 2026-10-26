"use client";

import { useEffect } from "react";
import { captureUtm } from "@/lib/utm";

// Mounted once in the (public) layout. Campaign links always arrive as a full
// page load, which mounts this, so one capture per load is enough; moving
// between pages inside the site leaves the saved campaign untouched. It runs
// in an effect, so the server render never touches browser storage.
export default function UtmCapture() {
  useEffect(() => {
    captureUtm();
  }, []);

  return null;
}
