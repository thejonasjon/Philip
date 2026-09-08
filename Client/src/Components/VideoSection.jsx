import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import samuraiVideo from "../assets/samurai-video.mp4";
import posterimage from "../assets/headshot.jpg";

export default function VideoSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const wasPlayingBeforeHiddenRef = useRef(true);
  const isInViewRef = useRef(false);
  const hasUserUnmutedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // video.muted = true;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsMuted(video.muted);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("volumechange", handleVolumeChange);

    setIsPlaying(!video.paused);
    setIsMuted(video.muted);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("volumechange", handleVolumeChange);
    };
  }, []);

  // Scroll-triggered play/pause
  useEffect(() => {
  const video = videoRef.current;
  const container = containerRef.current;
  if (!video || !container) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const attemptPlay = () => {
    video.play().catch(() => {
      if (hasUserUnmutedRef.current) return;

      video.muted = true;
      video.play().catch(() => {
        // Even muted autoplay was blocked (rare) — leave it paused,
        // the poster is shown and the user can hit play manually.
      });
    });
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      isInViewRef.current = entry.isIntersecting;

      if (prefersReducedMotion) return;

      if (entry.isIntersecting) {
        attemptPlay();
      } else {
        video.pause();
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(container);
  return () => observer.disconnect();
}, []);

  // Tab visibility: pause when tab is hidden, resume only if in view when tab returns
  useEffect(() => {
    function handleVisibilityChange() {
      const video = videoRef.current;
      if (!video) return;

      if (document.hidden) {
        wasPlayingBeforeHiddenRef.current = !video.paused;
        video.pause();
      } else if (wasPlayingBeforeHiddenRef.current && isInViewRef.current) {
        video.play().catch(() => {});
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

 useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  let hasUnmuted = false;
  const events = ["click", "touchstart", "keydown"];

  const unmuteOnFirstInteraction = () => {
    if (hasUnmuted) return;
    hasUnmuted = true;
    hasUserUnmutedRef.current = true;

    video.muted = false;

    if (video.paused && isInViewRef.current) {
      video.play().catch(() => {});
    }

    events.forEach((evt) =>
      document.removeEventListener(evt, unmuteOnFirstInteraction)
    );
  };

  events.forEach((evt) =>
    document.addEventListener(evt, unmuteOnFirstInteraction, {
      passive: true,
    })
  );

  return () => {
    events.forEach((evt) =>
      document.removeEventListener(evt, unmuteOnFirstInteraction)
    );
  };
}, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
  };

  return (
    <section ref={containerRef} className="w-full mx-auto mt-6 md:mt-10">
      <div className="relative w-full h-[85vh] aspect-video overflow-hidden rounded-2xl md:rounded-3xl bg-black">
        <div className="relative h-full w-full overflow-hidden">
          {/* Poster */}
          <img
            src={posterimage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[20%_10%]"
          />

          {/* Video */}
          <video
            ref={videoRef}
            src={samuraiVideo}
            poster={posterimage}
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover object-[20%_10%]"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-black/20" />

        <div className="absolute z-50 bottom-5 left-5 md:bottom-8 md:left-8 flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="flex h-10 w-10 md:h-11 md:w-11 cursor-pointer items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-white transition-all duration-300 hover:scale-105 hover:bg-white/35"
          >
            {isPlaying ? (
              <Pause size={18} fill="white" className="md:hidden" />
            ) : (
              <Play size={18} fill="white" className="ml-0.5 md:hidden" />
            )}
            {isPlaying ? (
              <Pause size={22} fill="white" className="hidden md:block" />
            ) : (
              <Play size={22} fill="white" className="ml-0.5 hidden md:block" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="flex h-10 w-10 md:h-11 md:w-11 cursor-pointer items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-white transition-all duration-300 hover:scale-105 hover:bg-white/35"
          >
            {isMuted ? (
              <VolumeX size={18} className="md:hidden" />
            ) : (
              <Volume2 size={18} className="md:hidden" />
            )}
            {isMuted ? (
              <VolumeX size={22} className="hidden md:block" />
            ) : (
              <Volume2 size={22} className="hidden md:block" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
