"use client";

import { useEffect, useState, useRef } from "react";
import { PlayCircle, Volume2, VolumeX, X } from "lucide-react";

export default function DiscoverVideoSection() {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [data, setData] = useState<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const modalIframeRef = useRef<HTMLIFrameElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API}/api/discover-video`);
      const json = await res.json();
      setData(json);
    };

    if (API) fetchData();
  }, [API]);

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

  if (!data) return null;

  const getVideoId = (url: string) => {
    const regExp =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(data.videoUrl);
  if (!videoId) return null;

  // Thumbnail embed (muted, no controls)
  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&rel=0&modestbranding=1&mute=1`;

  // Modal embed (autoplay, with controls, unmuted)
  const modalEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`;

  const playVideo = () => {
    iframeRef.current?.contentWindow?.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*",
    );
  };

  const pauseVideo = () => {
    iframeRef.current?.contentWindow?.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*",
    );
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!iframeRef.current) return;
    const command = isMuted ? "unMute" : "mute";
    iframeRef.current.contentWindow?.postMessage(
      `{"event":"command","func":"${command}","args":""}`,
      "*",
    );
    setIsMuted(!isMuted);
  };

  const openModal = () => {
    pauseVideo(); // pause the thumbnail video
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // Stop the modal video
    modalIframeRef.current?.contentWindow?.postMessage(
      '{"event":"command","func":"stopVideo","args":""}',
      "*",
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <section
        className={`relative py-16 overflow-hidden transition-all duration-300 ${isModalOpen ? "blur-sm brightness-50" : ""}`}
      >
        {" "}
        {/* Glow Background */}
        <div className="absolute inset-0 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* HEADER */}
          <div className="mb-12">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mx-auto mb-5 opacity-80"></div>

            <h2 className="text-xl md:text-3xl font-medium text-white tracking-[-0.01em]">
              Discover VRS Realinvest
            </h2>

            <p className="text-gray-400 mt-3 text-[11px] tracking-[0.18em] uppercase">
              Watch our story and mission
            </p>

            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mx-auto mt-6 opacity-70"></div>
          </div>

          {/* VIDEO CARD */}
          <div
            className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[var(--card-border)] 
            group cursor-pointer 
            shadow-[0_25px_80px_rgba(0,0,0,0.8)] 
            hover:shadow-[0_30px_90px_rgba(0,0,0,0.9)] 
            hover:scale-[1.01]
            transition-all duration-500"
            onMouseEnter={playVideo}
            onMouseLeave={pauseVideo}
            onClick={openModal} // ← Changed: opens modal instead of YouTube
          >
            <div className="relative w-full aspect-video">
              {/* Thumbnail Video */}
              <iframe
                ref={iframeRef}
                title="Discover VRS Realinvest — video"
                loading="lazy"
                src={embedUrl}
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

              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <PlayCircle
                  size={60}
                  className="text-white opacity-80 group-hover:text-[var(--primary-gold)] transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
                />
              </div>

              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm p-2.5 rounded-full text-white hover:bg-black/80 transition"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-400 mt-8 max-w-xl mx-auto text-[11px] md:text-sm text-center px-4 tracking-wide text-white/80">
            Learn about our commitment to excellence and our proven track
            record.
          </p>
        </div>
      </section>

      {/* ── MODAL ── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeModal} // click outside → close
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

          {/* Modal Box */}
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden 
            border border-[var(--card-border)] 
            shadow-[0_30px_100px_rgba(0,0,0,0.9)]
            animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()} // prevent close on inner click
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 bg-black/70 backdrop-blur-sm p-2 rounded-full text-white hover:bg-[var(--primary-gold)] hover:text-black transition-all duration-300"
            >
              <X size={20} />
            </button>

            {/* Modal Video — autoplay + sound */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                ref={modalIframeRef}
                src={modalEmbedUrl}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
