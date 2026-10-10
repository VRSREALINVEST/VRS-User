"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { PlayCircle, Volume2, VolumeX, X } from "lucide-react";

// YouTube embed command over postMessage (needs enablejsapi=1)
const ytCommand = (
  iframe: HTMLIFrameElement | null,
  func: string,
  args: string[] = [],
) =>
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args }),
    "*",
  );

export default function DiscoverVideo() {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [data, setData] = useState<{ videoUrl?: string } | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const modalIframeRef = useRef<HTMLIFrameElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const playerState = useRef<number | null>(null);

  // Mirror the player's own reports (see the message listener below)
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/api/discover-video`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Discover video fetch error", err);
      }
    };

    if (API) fetchData();
  }, [API]);

  // The preview autoplays with sound where the browser allows it. Once told
  // we're "listening" (iframe onLoad) the player reports its state. Blocked
  // audible autoplay leaves it unstarted (-1): retry once muted, and the sound
  // button lets the visitor turn audio on. No further retries.
  useEffect(() => {
    let fallback: ReturnType<typeof setTimeout> | undefined;
    const onMessage = (e: MessageEvent) => {
      const iframe = iframeRef.current;
      if (!iframe || e.source !== iframe.contentWindow) return;
      let msg;
      try {
        msg = JSON.parse(e.data);
      } catch {
        return;
      }
      const info = msg?.info;
      if (info && typeof info === "object") {
        if (typeof info.playerState === "number") {
          playerState.current = info.playerState;
          // Buffering (3) and loop end (0) keep the last state, so the sound
          // button doesn't flicker
          if (info.playerState === 1) {
            setIsPlaying(true);
            // YouTube turns its own captions on for muted autoplay; they
            // overlap the captions burned into the video
            ytCommand(iframe, "unloadModule", ["captions"]);
          } else if (info.playerState !== 3 && info.playerState !== 0)
            setIsPlaying(false);
        }
        if (typeof info.muted === "boolean") setIsMuted(info.muted);
      }
      if (msg?.event === "onReady") {
        fallback = setTimeout(() => {
          if (playerState.current !== -1) return;
          ytCommand(iframe, "mute");
          ytCommand(iframe, "playVideo");
        }, 1500);
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(fallback);
    };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Stable identity so the Escape listener below can depend on it
  const closeModal = useCallback(() => {
    // Stop the modal video, resume the preview
    ytCommand(modalIframeRef.current, "stopVideo");
    ytCommand(iframeRef.current, "playVideo");
    setIsModalOpen(false);
    // Return focus to the control that opened the modal
    playButtonRef.current?.focus();
  }, []);

  // Escape closes the modal (listener only while it is open)
  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, closeModal]);

  if (!data) return null;

  const getVideoId = (url?: string) => {
    const regExp =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/;
    const match = url?.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(data.videoUrl);
  if (!videoId) return null;

  // Preview embed: autoplay (with sound if allowed), looping, no controls.
  // origin lets the player post its state back to this page.
  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&rel=0&modestbranding=1&autoplay=1&playsinline=1&loop=1&playlist=${videoId}&origin=${encodeURIComponent(window.location.origin)}`;

  // Modal embed (autoplay, with controls, unmuted)
  const modalEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`;

  const soundOn = isPlaying && !isMuted;

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (soundOn) {
      ytCommand(iframeRef.current, "mute");
    } else {
      // The click is a user gesture, so audible playback is allowed now
      ytCommand(iframeRef.current, "unMute");
      ytCommand(iframeRef.current, "playVideo");
    }
    setIsMuted(soundOn);
  };

  const openModal = () => {
    ytCommand(iframeRef.current, "pauseVideo"); // pause the preview
    setIsModalOpen(true);
  };

  return (
    <>
      {/* VIDEO CARD */}
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-[var(--card-border)]
        group cursor-pointer
        shadow-[0_25px_80px_rgba(0,0,0,0.8)]
        hover:shadow-[0_30px_90px_rgba(0,0,0,0.9)]
        hover:scale-[1.01]
        transition-all duration-500"
      >
        <div className="relative w-full aspect-video">
          {/* Preview video — decorative, behind the play button */}
          <iframe
            ref={iframeRef}
            title="Discover VRS Realinvest — video"
            loading="lazy"
            src={embedUrl}
            tabIndex={-1}
            aria-hidden="true"
            onLoad={(e) =>
              e.currentTarget.contentWindow?.postMessage(
                JSON.stringify({ event: "listening", id: 1, channel: "widget" }),
                "*",
              )
            }
            className="absolute inset-0 w-full h-full transition-transform duration-[1200ms] group-hover:scale-105"
            allow="autoplay; encrypted-media"
          />

          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition duration-500"></div>

          {/* Glow Layer */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none
            bg-[radial-gradient(circle_at_center,rgba(231,200,156,0.15),transparent_70%)]"
          />

          {/* Play Button — covers the card, so any click but mute opens the
              modal. cursor-pointer: buttons default to the arrow; rounded-2xl
              keeps the inset focus ring inside the rounded clip. */}
          <button
            ref={playButtonRef}
            type="button"
            aria-label="Play video: Discover VRS Realinvest"
            onClick={openModal}
            className="absolute inset-0 flex items-center justify-center rounded-2xl cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--primary-gold)]"
          >
            <PlayCircle
              size={60}
              className="text-white opacity-80 group-hover:text-[var(--primary-gold)] transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
            />
          </button>

          {/* Sound Button — a sibling stacked above the play button, since
              interactive elements can't nest. Visibly labelled while off. */}
          <button
            type="button"
            aria-label={soundOn ? "Mute video preview" : undefined}
            onClick={toggleSound}
            className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-sm p-2.5 rounded-full text-white text-[11px] tracking-[0.15em] uppercase hover:bg-black/80 transition"
          >
            {soundOn ? (
              <Volume2 size={18} />
            ) : (
              <>
                <VolumeX size={18} aria-hidden="true" />
                <span className="pr-1">Enable sound</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── MODAL ── portalled to <body>: the hero content wrapper animates
          with translate, and a transformed ancestor becomes the containing
          block for position:fixed, so in place the modal would be clipped to
          the hero. Only rendered after a click, so document exists. */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={closeModal} // click outside → close
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

            {/* Modal Box */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Discover VRS Realinvest video"
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden
              border border-[var(--card-border)]
              shadow-[0_30px_100px_rgba(0,0,0,0.9)]
              animate-in fade-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()} // prevent close on inner click
            >
              {/* Close Button — focused on open */}
              <button
                type="button"
                aria-label="Close video"
                autoFocus
                onClick={closeModal}
                className="absolute top-3 right-3 z-10 bg-black/70 backdrop-blur-sm p-2 rounded-full text-white hover:bg-[var(--primary-gold)] hover:text-black transition-all duration-300"
              >
                <X size={20} />
              </button>

              {/* Modal Video — autoplay + sound */}
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  ref={modalIframeRef}
                  title="Discover VRS Realinvest — video player"
                  src={modalEmbedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
