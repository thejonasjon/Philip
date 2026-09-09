import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import samuraiVideo from "../assets/samurai-video.mp4";
import samuraiVideoMobile from "../assets/samurai-video-mobile.mp4";
import posterimage from "../assets/headshot.jpg";

export default function VideoSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const wasPlayingBeforeHiddenRef = useRef(false);
  const isInViewRef = useRef(false);
  const hasUserUnmutedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Select the correct video based on screen size
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateSource = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const newSrc = isMobile ? samuraiVideoMobile : samuraiVideo;

      if (video.src !== new URL(newSrc, window.location.href).href) {
        const wasPlaying = !video.paused;

        video.src = newSrc;
        video.load();

        if (wasPlaying && isInViewRef.current) {
          video.play().catch(() => {});
        }
      }
    };

    updateSource();

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    mediaQuery.addEventListener("change", updateSource);

    return () => {
      mediaQuery.removeEventListener("change", updateSource);
    };
  }, []);

  // Video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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

    const attemptPlay = async () => {
      try {
        await video.play();
      } catch {
        // Browser blocked audible autoplay
        if (!hasUserUnmutedRef.current) {
          video.muted = true;

          try {
            await video.play();
          } catch {
            // Autoplay completely blocked
          }
        }
      }
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

  // Tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;

      if (document.hidden) {
        wasPlayingBeforeHiddenRef.current = !video.paused;
        video.pause();
      } else if (
        wasPlayingBeforeHiddenRef.current &&
        isInViewRef.current
      ) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () =>
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
  }, []);

  // First user interaction enables sound
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const enableSound = () => {
      if (hasUserUnmutedRef.current) return;

      hasUserUnmutedRef.current = true;
      video.muted = false;

      if (video.paused && isInViewRef.current) {
        video.play().catch(() => {});
      }

      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
      window.removeEventListener("keydown", enableSound);
    };

    window.addEventListener("click", enableSound, { passive: true });
    window.addEventListener("touchstart", enableSound, { passive: true });
    window.addEventListener("keydown", enableSound);

    return () => {
      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
      window.removeEventListener("keydown", enableSound);
    };
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      hasUserUnmutedRef.current = true;
      video.muted = false;

      try {
        await video.play();
      } catch (error) {
        console.error("Video playback failed:", error);
      }
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;

    if (!video.muted) {
      hasUserUnmutedRef.current = true;
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full mx-auto mt-6 md:mt-10"
    >
      <div className="relative w-full h-[85vh] aspect-video overflow-hidden rounded-2xl md:rounded-3xl bg-black">

        <video
          ref={videoRef}
          poster={posterimage}
          loop
          playsInline
          preload="metadata"
          muted={isMuted}
          className="absolute inset-0 h-full w-full object-cover object-[0%_0%] md:object-[20%_10%]"
        />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-black/20" />

        <div className="absolute z-50 bottom-5 left-5 md:bottom-8 md:left-8 flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="flex h-7 w-7 md:h-8 md:w-8 cursor-pointer items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-white transition-all duration-300 hover:scale-105 hover:bg-white/35"
          >
            {isPlaying ? (
              <Pause size={14} fill="white" />
            ) : (
              <Play size={14} fill="white" className="ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="flex h-7 w-7 md:h-8 md:w-8 cursor-pointer items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-white transition-all duration-300 hover:scale-105 hover:bg-white/35"
          >
            {isMuted ? (
              <VolumeX size={14} />
            ) : (
              <Volume2 size={14} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}