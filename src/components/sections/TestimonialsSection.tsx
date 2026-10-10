"use client";

import { useEffect, useState } from "react";
import useNearViewport from "@/lib/useNearViewport";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

interface TextReview {
  _id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

interface VideoReview {
  _id: string;
  name: string;
  role: string;
  youtubeLink: string;
}

export default function TestimonialsSection() {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [reviews, setReviews] = useState<TextReview[]>([]);
  const [videos, setVideos] = useState<VideoReview[]>([]);
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [mutedVideos, setMutedVideos] = useState<{ [key: string]: boolean }>(
    {},
  );

  // ── Modal state ──
  const [modalVideo, setModalVideo] = useState<VideoReview | null>(null);

  const getYoutubeId = (url: string): string | null => {
    const regExp =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const [sectionRef, near] = useNearViewport<HTMLElement>();

  useEffect(() => {
    if (!API || !near) return;

    const fetchText = async () => {
      const res = await fetch(`${API}/api/text-testimonials`);
      if (!res.ok) return;
      const data = await res.json();
      setReviews(data);
    };

    const fetchVideos = async () => {
      const res = await fetch(`${API}/api/video-testimonials`);
      if (!res.ok) return;
      const data = await res.json();
      setVideos(data);
      const muteState: any = {};
      data.forEach((v: VideoReview) => {
        muteState[v._id] = true;
      });
      setMutedVideos(muteState);
    };

    fetchText().catch(console.error);
    fetchVideos().catch(console.error);
  }, [API, near]);

  // Auto-slide
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews]);

  // Body scroll lock when modal open
  useEffect(() => {
    document.body.style.overflow = modalVideo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalVideo]);

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const nextSlide = () => setIndex((prev) => (prev + 1) % reviews.length);

  const sendCommand = (id: string, command: string) => {
    const iframe = document.getElementById(id) as HTMLIFrameElement;
    iframe?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "*",
    );
  };

  const toggleMute = (videoId: string, iframeId: string) => {
    const isMuted = mutedVideos[videoId];
    sendCommand(iframeId, isMuted ? "unMute" : "mute");
    setMutedVideos((prev) => ({ ...prev, [videoId]: !isMuted }));
  };

  const openModal = (video: VideoReview) => {
    // pause the thumbnail preview
    const iframeId = `preview-${video._id}`;
    sendCommand(iframeId, "pauseVideo");
    setModalVideo(video);
  };

  const closeModal = () => setModalVideo(null);

  return (
    <>
      <section
        ref={sectionRef}
        className={`relative py-20 text-center transition-all duration-300 ${
          modalVideo ? "blur-sm brightness-50" : ""
        }`}
      >
        <div className="px-6 md:px-10 lg:px-20">
          {/* ================= TEXT TESTIMONIALS ================= */}
          <div className="text-center mb-12">
            <div className="w-10 h-[2px] bg-[var(--primary-gold)] mx-auto mb-3"></div>
            <h2 className="text-2xl md:text-3xl font-medium text-white tracking-[-0.01em]">
              Client Testimonials
            </h2>
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
                      <h4 className="text-white font-medium text-sm md:text-base tracking-tight">
                        {review.name}
                      </h4>
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
                  const videoId = getYoutubeId(video.youtubeLink);
                  if (!videoId) return null;

                  const iframeId = `preview-${video._id}`;

                  return (
                    <div
                      key={video._id}
                      onClick={() => openModal(video)} // ← Modal instead of YouTube
                      className="relative min-w-[320px] md:min-w-[340px] h-[360px] md:h-[380px] rounded-2xl overflow-hidden border border-[var(--card-border)] group flex-shrink-0 cursor-pointer"
                    >
                      <iframe
                        id={iframeId}
                        title={`${video.name} — video testimonial`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&rel=0&modestbranding=1&mute=1`}
                        allow="autoplay; encrypted-media"
                      />

                      {/* Hover play/pause layer */}
                      <div
                        className="absolute inset-0 z-20"
                        onMouseEnter={() => sendCommand(iframeId, "playVideo")}
                        onMouseLeave={() => {
                          sendCommand(iframeId, "pauseVideo");
                          sendCommand(iframeId, "mute");
                          setMutedVideos((prev) => ({
                            ...prev,
                            [video._id]: true,
                          }));
                        }}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>

                      {/* Name & Role */}
                      <div className="absolute bottom-5 left-5 text-white z-10">
                        <h4 className="text-base font-medium tracking-tight">
                          {video.name}
                        </h4>
                        <p className="text-gray-300 text-[10px] tracking-[0.15em] uppercase">
                          {video.role}
                        </p>
                      </div>

                      {/* Mute Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute(video._id, iframeId);
                        }}
                        className="absolute top-4 right-4 z-30 bg-black/60 p-2 rounded-full hover:bg-black/80 transition"
                      >
                        {mutedVideos[video._id] ? (
                          <VolumeX size={18} className="text-white" />
                        ) : (
                          <Volume2 size={18} className="text-white" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── VIDEO MODAL ── */}
      {modalVideo &&
        (() => {
          const modalVideoId = getYoutubeId(modalVideo.youtubeLink);
          if (!modalVideoId) return null;

          const modalEmbedUrl = `https://www.youtube.com/embed/${modalVideoId}?autoplay=1&rel=0&modestbranding=1&controls=1`;

          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              onClick={closeModal}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

              {/* Modal Box */}
              <div
                className="relative w-full max-w-3xl rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-[0_30px_100px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 z-10 bg-black/70 backdrop-blur-sm p-2 rounded-full text-white hover:bg-[var(--primary-gold)] hover:text-black transition-all duration-300"
                >
                  <X size={20} />
                </button>

                {/* Video */}
                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    src={modalEmbedUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                  />
                </div>

                {/* Name & Role below video */}
                <div className="bg-[var(--card-bg)] px-5 py-3 flex items-center gap-3 border-t border-[var(--card-border)]">
                  <div>
                    <h4 className="text-white text-sm font-medium tracking-tight">
                      {modalVideo.name}
                    </h4>
                    <p className="text-gray-400 text-[10px] tracking-[0.15em] uppercase">
                      {modalVideo.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
    </>
  );
}
