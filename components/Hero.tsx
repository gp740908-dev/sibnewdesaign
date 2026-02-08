'use client';

import React from 'react';
import { motion as m } from 'framer-motion';

const motion = m as any;

const titleAnimation = {
  hidden: { y: 100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1.6,
    },
  },
};

const containerAnimation = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-deep-jungle">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="w-full h-full"
        >
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                preload="auto"
                className="w-full h-full object-cover opacity-60"
            >
                {/* 
                    Optimized Cloudinary URL:
                    - q_auto: Automatic quality adjustment (reduces size while maintaining visual quality)
                    - f_auto: Automatic format selection (serves WebM/MP4 based on browser support)
                */}
                <source 
                    src="https://res.cloudinary.com/dbppb9grh/video/upload/q_auto,f_auto/v1770344510/lv_0_20260206091005_uf63ps.mp4" 
                    type="video/mp4" 
                />
                Your browser does not support the video tag.
            </video>
        </motion.div>
        
        {/* Dark Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
      </div>

      {/* Hero Typography */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center w-full px-4">
        <motion.div 
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center w-full"
        >
             {/* SACRED */}
            <div className="overflow-hidden">
                <motion.h1 
                    variants={titleAnimation}
                    className="font-serif text-[13vw] leading-[0.8] text-rice-paper tracking-tighter mix-blend-overlay"
                >
                    SACRED
                </motion.h1>
            </div>
            
            {/* SILENCE */}
            <div className="overflow-hidden">
                <motion.h1 
                    variants={titleAnimation}
                    className="font-serif text-[13vw] leading-[0.8] text-rice-paper tracking-tighter italic font-light mix-blend-overlay"
                >
                    SILENCE
                </motion.h1>
            </div>
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-8 w-full px-8 md:px-12 flex justify-between items-end text-rice-paper mix-blend-difference z-20">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="font-sans text-xs tracking-[0.2em] uppercase space-y-1"
        >
            <p>8.5069° S, 115.2625° E</p>
            <p className="opacity-60">Bali • Indonesia</p>
        </motion.div>

        <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.7, duration: 1 }}
             className="flex flex-col items-center gap-4"
        >
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase opacity-80 rotate-90 origin-right translate-x-4 mb-8">
                Scroll
            </span>
            <div className="h-12 w-[1px] bg-rice-paper/40 overflow-hidden relative">
                <motion.div 
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-full bg-rice-paper"
                />
            </div>
        </motion.div>
      </div>
    </section>
  );
};