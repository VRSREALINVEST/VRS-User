"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote, Play } from "lucide-react";
import VideoModal from "@/components/common/VideoModal";
import { youtubeId, youtubeThumbnail } from "@/lib/youtube";

export interface TextReview {
  _id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface VideoReview {
  _id: string;
  name: string;
  role: string;
  youtubeLink: string;
}

// The page fetches both lists on the server (lib/publicContent) and passes them
// in, so every testimonial is in the initial HTML; null (the API failed) leaves
// the headings without cards. Videos are click to play: each card shows the
// video's thumbnail and a Play button, and the YouTube player loads only in the
// modal after a click. The first heading is an h2 under the homepage's own h1;
// /review has no other heading, so it passes headingLevel="h1" there.
export default function TestimonialsSection({
  reviews: reviewList,
  videos: videoList,
  headingLevel: Heading = "h2",
}: {
  reviews: TextReview[] | null;
  videos: VideoReview[] | null;
  headingLevel?: "h1" | "h2";
}) {
  const reviews = reviewList ?? [];
  const videos = videoList ?? [];
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  // ── Modal state ──
  const [modalVideo, setModalVideo] = useState<VideoReview | null>(null);
  // The Play button that opened the modal gets focus back when it closes.
  const playButtonRef = useRef<HTMLButtonElement | null>(null);

  // Auto-slide
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const nextSlide = () => setIndex((prev) => (prev + 1) % reviews.length);

  // Stable identity, since the modal's Escape listener depends on it
  const closeModal = useCallback(() => {
    setModalVideo(null);
    playButtonRef.current?.focus();
  }, []);

  const modalVideoId = modalVideo && youtubeId(modalVideo.youtubeLink);
  const modalIsShort =
    !!modalVideo && /youtube\.com\/shorts\//i.test(modalVideo.youtubeLink);

  return (
    <>
      <section
        className={`relative py-20 text-center transition-all duration-300 ${
          modalVideo ? "blur-sm brightness-50" : ""
        }`}
      >
        <div className="px-6 md:px-10 lg:px-20">
          {/* ================= TEXT TESTIMONIALS ================= */}
          <div className="text-center mb-12">
            <div className="w-10 h-[2px] bg-[var(--primary-gold)] mx-auto mb-3"></div>
            <Heading className="text-2xl md:text-3xl font-medium text-white tracking-[-0.01em]">
              Client Testimonials
            </Heading>
            <p className="text-gray-400 mt-3 text-[11px] tracking-[0.18em] uppercase">
              What our satisfied clients say about us
            </p>
          </div>

          {reviews.length > 0 && (
            <div className="relative overflow-hidden max-w-2xl mx-auto mb-12">
              <div
                className="flex transition-transform duration-700"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {reviews.map((review) => (
                  <div key={review._id} className="min-w-full px-3">
                    <div className="relative bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 text-center backdrop-blur-md min-h-[260px] flex flex-col justify-between">
                      <Quote
                        className="absolute top-4 right-4 text-[var(--primary-gold)] opacity-10"
                        size={40}
                      />
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="text-[var(--primary-gold)] fill-[var(--primary-gold)]"
                          />
                        ))}
                      </div>
                      <div className="mb-6">
                        <p
                          className={`text-gray-300 text-sm md:text-base leading-relaxed tracking-wide transition-all duration-300 ${
                            expanded[review._id] ? "" : "line-clamp-4"
                          }`}
                        >
                          "{review.text}"
                        </p>
                        {review.text.length > 120 && (
                          <button
                            onClick={() =>
                              setExpanded((prev) => ({
                                ...prev,
                                [review._id]: !prev[review._id],
                              }))
                            }
                            className="mt-2 text-[var(--primary-gold)] text-[10px] tracking-[0.2em] uppercase hover:opacity-80 transition"
                          >
                            {expanded[review._id] ? "Show Less" : "Read More"}
                          </button>
                        )}
                      </div>
                      {/* Author names are attribution, not headings; the class
                          keeps the heading font the h4 used to give them. */}
                      <p className="font-[family-name:var(--font-heading)] text-white font-medium text-sm md:text-base tracking-tight">
                        {review.name}
                      </p>
                      <p className="text-gray-500 text-[10px] mt-2 tracking-[0.15em] uppercase">
                        {review.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 border border-[var(--card-border)] p-2 rounded-full transition"
              >
                <ChevronLeft className="text-[var(--primary-gold)]" size={18} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 border border-[var(--card-border)] p-2 rounded-full transition"
              >
                <ChevronRight
                  className="text-[var(--primary-gold)]"
                  size={18}
                />
              </button>
            </div>
          )}

          {/* ================= VIDEO TESTIMONIALS ================= */}
          <div className="text-center mb-8">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mx-auto mb-5 opacity-80"></div>
            <h2 className="text-2xl md:text-3xl font-medium text-white tracking-[-0.01em]">
              Video Testimonials
            </h2>
          </div>

          {videos.length > 0 && (
            <>
              {/* Slim styled scrollbar via inline style */}
              <style>{`
                .video-scroll::-webkit-scrollbar {
                  height: 3px;
                }
                .video-scroll::-webkit-scrollbar-track {
                  background: transparent;
                }
                .video-scroll::-webkit-scrollbar-thumb {
                  background: var(--primary-gold);
                  border-radius: 999px;
                  opacity: 0.6;
                }
              `}</style>

              <div className="video-scroll flex gap-6 overflow-x-auto pb-4">
                {videos.map((video) => {
                  const videoId = youtubeId(video.youtubeLink);
                  if (!videoId) return null;

                  return (
                    <div
                      key={video._id}
                      className="relative min-w-[320px] md:min-w-[340px] h-[360px] md:h-[380px] rounded-2xl overflow-hidden border border-[var(--card-border)] group flex-shrink-0"
                    >
                      {/* Thumbnail: YouTube's still, served resized from this
                          site by next/image and lazy-loaded */}
                      <Image
                        src={youtubeThumbnail(videoId)}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 340px, 320px"
                        className="object-cover"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>

                      {/* Name & Role */}
                      <div className="absolute bottom-5 left-5 text-white z-10">
                        <p className="font-[family-name:var(--font-heading)] text-base font-medium tracking-tight">
                          {video.name}
                        </p>
                        <p className="text-gray-300 text-[10px] tracking-[0.15em] uppercase">
                          {video.role}
                        </p>
                      </div>

                      {/* Play: covers the card, so a click anywhere (or Enter
                          or Space on focus) opens the player */}
                      <button
                        type="button"
                        aria-label={`Play video testimonial from ${video.name}`}
                        onClick={(e) => {
                          playButtonRef.current = e.currentTarget;
                          setModalVideo(video);
                        }}
                        className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--primary-gold)]"
                      >
                        <span
                          aria-hidden="true"
                          className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition duration-300 group-hover:bg-[var(--primary-gold)] group-hover:text-[#221F1F]"
                        >
                          <Play size={22} className="ml-0.5 fill-current" />
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── VIDEO MODAL ── Shorts are portrait: a 9:16 player, width capped so
          it fits the viewport height */}
      {modalVideo && modalVideoId && (
        <VideoModal
          videoId={modalVideoId}
          label={`${modalVideo.name} — video testimonial`}
          portrait={modalIsShort}
          boxClassName={modalIsShort ? "max-w-[min(24rem,40vh)]" : "max-w-3xl"}
          onClose={closeModal}
          caption={
            /* Name & Role below video */
            <div className="bg-[var(--card-bg)] px-5 py-3 flex items-center gap-3 border-t border-[var(--card-border)]">
              <div>
                <p className="font-[family-name:var(--font-heading)] text-white text-sm font-medium tracking-tight">
                  {modalVideo.name}
                </p>
                <p className="text-gray-400 text-[10px] tracking-[0.15em] uppercase">
                  {modalVideo.role}
                </p>
              </div>
            </div>
          }
        />
      )}
    </>
  );
}
