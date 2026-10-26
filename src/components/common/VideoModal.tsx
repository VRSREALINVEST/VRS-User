"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

// The YouTube player, mounted only after a click on Play, so nothing loads
// from YouTube before that; it starts with sound because the click allows it.
// Portalled to <body>: a transformed ancestor (the hero animates) would
// otherwise clip the fixed overlay. Escape, the close button or a click
// outside the player closes it. The close button takes focus on open; the
// caller puts focus back on its Play button in onClose.
export default function VideoModal({
  videoId,
  label,
  portrait = false,
  boxClassName,
  backdropClassName = "bg-black/80",
  caption,
  onClose,
}: {
  videoId: string;
  label: string;
  portrait?: boolean;
  boxClassName: string;
  backdropClassName?: string;
  caption?: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className={`absolute inset-0 ${backdropClassName} backdrop-blur-md`} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`relative w-full ${boxClassName} rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-[0_30px_100px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* z-10 keeps it above the player */}
        <button
          type="button"
          aria-label="Close video"
          autoFocus
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/70 backdrop-blur-sm p-2 rounded-full text-white hover:bg-[var(--primary-gold)] hover:text-black transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-gold)]"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div
          className={`relative w-full ${portrait ? "aspect-[9/16]" : "aspect-video"} bg-black`}
        >
          <iframe
            title={`${label} — player`}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        </div>

        {caption}
      </div>
    </div>,
    document.body,
  );
}
