import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import samuraiVideo from "../assets/samurai-video.mp4";
import samuraiPoster from "../assets/samurai-poster.png";

export default function VideoSection() {
  const videoRef = useRef(null);
  const wasPlayingBeforeHiddenRef = useRef(true);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

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

  // Respect users who prefer reduced motion - don't force autoplay on them
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  useEffect(() => {
    function handleVisibilityChange() {
      const video = videoRef.current;
      if (!video) return;

      if (document.hidden) {
        wasPlayingBeforeHiddenRef.current = !video.paused;
        video.pause();
      } else if (wasPlayingBeforeHiddenRef.current) {
        video.play().catch(() => {
          // Autoplay might be blocked on return - state stays accurate
          // either way since it's driven by the play/pause listeners above.
        });
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
    <section className="w-full mx-auto mt-6 md:mt-10">
      <div className="relative w-full h-[80vh] aspect-video overflow-hidden rounded-xl md:rounded-none bg-black">
        <video
          ref={videoRef}
          src={samuraiVideo}
          poster={samuraiPoster}
          autoPlay
        //   muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay - deepens shadows, keeps the controls legible */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/5 to-black/25" />

        {/* Controls */}
        <div className="absolute z-50 bottom-5 left-5 md:bottom-8 md:left-8 flex items-center gap-3">
          {/* Play / Pause */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="flex h-11 w-11 md:h-14 md:w-14 cursor-pointer items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-white transition-all duration-300 hover:scale-105 hover:bg-white/35"
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

          {/* Mute / Unmute */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="flex h-11 w-11 md:h-14 md:w-14 cursor-pointer items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-white transition-all duration-300 hover:scale-105 hover:bg-white/35"
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