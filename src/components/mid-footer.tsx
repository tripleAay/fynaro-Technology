"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Auto-play when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Autoplay blocked - user will need to click
      setIsPlaying(false);
    });

    const handleLoaded = () => setIsLoaded(true);
    video.addEventListener("loadeddata", handleLoaded);

    return () => video.removeEventListener("loadeddata", handleLoaded);
  }, []);

  return (
    <section className="relative w-full py-20 md:py-32 bg-black overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Video Container with Dark Inner Glow */}
        <div className="relative mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Dark Inner Glow + Vignette Layer */}
          <div className="absolute inset-0 z-10 pointer-events-none rounded-3xl 
                        shadow-[inset_0_0_80px_40px_rgba(0,0,0,0.85)] 
                        ring-1 ring-inset ring-black/50" />

          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-auto aspect-video object-cover"
            loop
            muted={isMuted}
            playsInline
            onClick={togglePlay}
          >
            <source 
              src="/videos/brand.mp4" 
              type="video/mp4"  
            />
            Your browser does not support the video tag.
          </video>

          {/* Loading Overlay */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Bottom Controls Bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="text-white hover:text-emerald-400 transition-colors"
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMute}
              className="text-white hover:text-emerald-400 transition-colors"
            >
              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </motion.button>

            <div className="text-xs text-gray-400 font-mono tracking-widest pl-2">
              SHORT FILM
            </div>
          </div>

          {/* Optional subtle title overlay */}
          <div className="absolute top-8 left-8 z-30">
            <h3 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-lg">
              Behind the Vision
            </h3>
            <p className="text-sm text-gray-400 mt-1">Watch • 0:42</p>
          </div>
        </div>

        {/* Description below video */}
        <div className="text-center mt-10 max-w-2xl mx-auto">
          <p className="text-gray-400 text-lg">
            A short cinematic reel showcasing our creative process and final results.
          </p>
        </div>
      </div>
    </section>
  );
}