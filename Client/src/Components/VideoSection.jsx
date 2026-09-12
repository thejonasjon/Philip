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

  // Was sound explicitly unlocked by a real user gesture (click/tap/key)?
  // MUST start false — the browser has not granted unmuted autoplay yet.
  const hasUserUnmutedRef = useRef(false);

  // Did the user deliberately hit the mute button? If so, don't auto-unmute
  // them later just because they clicked something else on the page.
  const userMutedRef = useRef(false);

  // Start muted. This removes the non-determinism you were seeing on desktop
  // (where unmuted-first sometimes succeeded due to Chrome's per-site Media
  // Engagement Index and sometimes didn't). Muted autoplay is unconditionally
  // allowed by every browser, so this path is now 100% consistent.
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  // Shown while the video is autoplaying muted and no real gesture has
  // unlocked sound yet. Gives the user an obvious, intentional way to turn
  // sound on, instead of relying on them to notice the small speaker icon.
  const [showSoundPrompt, setShowSoundPrompt] = useState(false);

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
      // If the user hasn't unlocked sound with a real gesture yet, don't
      // even attempt unmuted playback — it will just be rejected by the
      // browser and wastes a play() call. Go straight to muted, which is
      // guaranteed to succeed.
      if (!hasUserUnmutedRef.current) {
        video.muted = true;
        try {
          await video.play();
          setShowSoundPrompt(true);
        } catch {
          // Autoplay fully blocked (rare — e.g. low-power mode)
        }
        return;
      }

      // User has interacted with the page already — try with sound.
      try {
        video.muted = userMutedRef.current; // respect an explicit mute choice
        await video.play();
      } catch {
        video.muted = true;
        try {
          await video.play();
        } catch {
          // Autoplay fully blocked
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
          setShowSoundPrompt(false);
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

  // Shared unlock: called by (a) the visible "Tap for sound" prompt, and
  // (b) a first click/tap/key anywhere else on the page. Either one counts
  // as the real gesture browsers require before allowing sound.
  const unlockSound = () => {
    const video = videoRef.current;
    if (!video || hasUserUnmutedRef.current) return;

    hasUserUnmutedRef.current = true;
    setShowSoundPrompt(false);

    // Respect it if the user had already tapped the mute button manually
    // before this fired.
    if (!userMutedRef.current) {
      video.muted = false;
      if (isInViewRef.current) {
        video.play().catch(() => {});
      }
    }
  };

  // First genuine user interaction (click / tap / key) anywhere on the page
  // unlocks sound. Scroll is intentionally NOT included here — browsers
  // don't treat scroll as an activation gesture, so listening for it
  // wouldn't change anything; it would just silently fail the same way an
  // unattended autoplay does. The visible prompt below is the reliable
  // substitute: it turns "some click, somewhere, eventually" into an
  // obvious, immediate action.
  useEffect(() => {
    const handlePageInteraction = () => {
      unlockSound();
      window.removeEventListener("click", handlePageInteraction);
      window.removeEventListener("touchstart", handlePageInteraction);
      window.removeEventListener("keydown", handlePageInteraction);
    };

    window.addEventListener("click", handlePageInteraction, { passive: true });
    window.addEventListener("touchstart", handlePageInteraction, { passive: true });
    window.addEventListener("keydown", handlePageInteraction);

    return () => {
      window.removeEventListener("click", handlePageInteraction);
      window.removeEventListener("touchstart", handlePageInteraction);
      window.removeEventListener("keydown", handlePageInteraction);
    };
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      hasUserUnmutedRef.current = true;
      if (!userMutedRef.current) video.muted = false;

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
    userMutedRef.current = video.muted;

    if (!video.muted) {
      hasUserUnmutedRef.current = true;
      setShowSoundPrompt(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full mx-auto mt-6 md:mt-10"
    >
      <div className="relative w-full h-[85vh] md:h-full aspect-video overflow-hidden rounded-2xl md:rounded-3xl bg-black">

        <video
          ref={videoRef}
          poster={posterimage}
          loop
          playsInline
          preload="metadata"
          muted={isMuted}
          className="absolute inset-0 h-full w-full object-cover object-[0%_0%] md:object-[0%_90%]"
        />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-black/20" />

        {showSoundPrompt && (
          <button
            type="button"
            onClick={unlockSound}
            className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md border border-white/30 px-3.5 py-2 text-white text-xs md:text-sm font-medium transition-all duration-300 hover:bg-black/75 hover:scale-105 animate-pulse cursor-pointer"
          >
            <VolumeX size={14} />
            Tap for sound
          </button>
        )}

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