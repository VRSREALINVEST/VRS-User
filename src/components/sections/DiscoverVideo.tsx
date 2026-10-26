"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import VideoModal from "@/components/common/VideoModal";
import { youtubeId, youtubeThumbnail } from "@/lib/youtube";

export interface DiscoverVideoData {
  thumbnail?: string;
  videoUrl?: string;
}

// Click to play: a poster and a Play button; the YouTube player loads only in
// the modal after a click, so the hero contacts nothing at YouTube and plays
// no sound unasked. The poster is the thumbnail set in the admin, resized by
// next/image, or YouTube's own still if there is none. The homepage fetches
// the data on the server (lib/publicContent), so the poster is in the HTML.
export default function DiscoverVideo({
  video,
}: {
  video: DiscoverVideoData | null;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  // Stable identity, since the modal's Escape listener depends on it
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Return focus to the control that opened the modal
    playButtonRef.current?.focus();
  }, []);

  const videoId = youtubeId(video?.videoUrl);
  if (!videoId) return null;
  const poster = video?.thumbnail || youtubeThumbnail(videoId);

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
          {/* Poster: in the hero, above the fold, so it is preloaded and
              fetched first */}
          <Image
            src={poster}
            alt=""
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 1280px) 608px, (min-width: 1024px) 45vw, (min-width: 720px) 672px, calc(100vw - 48px)"
            className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />

          {/* Glow Layer */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none
            bg-[radial-gradient(circle_at_center,rgba(231,200,156,0.15),transparent_70%)]"
          />

          {/* Play Button — covers the card, so a click anywhere opens the
              player. cursor-pointer: buttons default to the arrow; rounded-2xl
              keeps the inset focus ring inside the rounded clip. */}
          <button
            ref={playButtonRef}
            type="button"
            aria-label="Play video: Discover VRS Realinvest"
            onClick={() => setIsModalOpen(true)}
            className="absolute inset-0 flex items-center justify-center rounded-2xl cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--primary-gold)]"
          >
            <span
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition duration-300 group-hover:bg-[var(--primary-gold)] group-hover:text-[#221F1F]"
            >
              <Play size={26} className="ml-1 fill-current" />
            </span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <VideoModal
          videoId={videoId}
          label="Discover VRS Realinvest video"
          boxClassName="max-w-4xl"
          backdropClassName="bg-black/70"
          onClose={closeModal}
        />
      )}
    </>
  );
}
