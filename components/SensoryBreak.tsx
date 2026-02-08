'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion as m, useScroll, useTransform } from 'framer-motion';

const motion = m as any;

export const SensoryBreak: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 1. Background Video Scale (Zoom out effect: 1.2 -> 1.0)
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1.0]);
  
  // 2. Text Parallax & Reveal
  // Text moves slightly slower than scroll for depth
  const yText = useTransform(scrollYProgress, [0.2, 0.8], [100, -100]);
  // Opacity peaks at the center of the viewport
  const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  // Blur effect clears at the center
  const blur = useTransform(scrollYProgress, [0.3, 0.5, 0.7], ["blur(10px)", "blur(0px)", "blur(10px)"]);

  // Audio Toggle Logic
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.5; // Gentle volume
        audioRef.current.play().catch(e => console.log("Audio play failed interaction required", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-deep-jungle flex items-center justify-center"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div 
            style={{ scale }}
            className="w-full h-full"
        >
            <video 
                ref={videoRef}
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover opacity-80"
            >
                {/* Cinematic Foggy River - Evokes "Morning in Ubud" */}
                <source 
                    src="https://assets.mixkit.co/videos/preview/mixkit-fog-over-the-river-morning-1256-large.mp4" 
                    type="video/mp4" 
                />
            </video>
        </motion.div>
        
        {/* Atmosphere Overlay - Slight Green/Dark Tint */}
        <div className="absolute inset-0 bg-deep-jungle/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-deep-jungle/20 via-transparent to-deep-jungle/20"></div>
      </div>

      {/* Center Typography - "Breathe" */}
      <div className="relative z-10 text-center mix-blend-overlay">
        <motion.h2 
            style={{ y: yText, opacity, filter: blur }}
            className="font-serif text-[15vw] md:text-[20vw] leading-none text-rice-paper tracking-[0.05em] font-light italic"
        >
            Breathe
        </motion.h2>
      </div>

      {/* Audio Control - Minimalist Bottom Right */}
      <div className="absolute bottom-12 right-12 z-20">
        <button 
            onClick={toggleAudio}
            className="group flex items-center gap-4 focus:outline-none"
        >
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-rice-paper/80 group-hover:text-rice-paper transition-colors">
                {isPlaying ? "Sound On" : "Sound Off"}
            </span>
            
            {/* Custom Icon Animation */}
            <div className="relative w-12 h-12 rounded-full border border-rice-paper/20 flex items-center justify-center group-hover:bg-rice-paper/10 transition-all duration-500">
                {isPlaying ? (
                     <div className="flex gap-1 items-end h-4">
                        {[1, 2, 3, 4].map((bar) => (
                            <motion.div 
                                key={bar}
                                animate={{ height: [4, 16, 8, 14, 4] }}
                                transition={{ 
                                    repeat: Infinity, 
                                    duration: 0.8, 
                                    delay: bar * 0.1,
                                    ease: "easeInOut" 
                                }}
                                className="w-[1px] bg-rice-paper"
                            />
                        ))}
                     </div>
                ) : (
                    <div className="w-[1px] h-4 bg-rice-paper/50 rotate-45"></div>
                )}
            </div>
        </button>

        {/* Hidden Audio Element - Forest Rain/Ambience */}
        <audio 
            ref={audioRef}
            loop
            src="https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-1253.mp3"
        />
      </div>
    </section>
  );
};