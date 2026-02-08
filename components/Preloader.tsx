'use client';

import React from 'react';
import { motion as m } from 'framer-motion';

const motion = m as any;

export const Preloader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-rice-paper cursor-none"
    >
      {/* Container for Logo & Box that will scale up */}
      <motion.div
        initial={{ scale: 1 }}
        exit={{ scale: 30, opacity: 0 }}
        transition={{ 
            duration: 1.5, 
            ease: [0.83, 0, 0.17, 1] // Custom "Luxury" Ease
        }}
        className="relative flex items-center justify-center p-12 md:p-20"
      >
        {/* The "Box" Border Drawing Animation */}
        <div className="absolute inset-0 z-0">
             <svg className="w-full h-full overflow-visible">
                <motion.rect
                    width="100%"
                    height="100%"
                    fill="none"
                    stroke="#1C2321" // Deep Jungle
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ 
                        duration: 2, 
                        ease: "easeInOut",
                        delay: 0.2
                    }}
                />
             </svg>
        </div>

        {/* Logo Text */}
        <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="relative z-10"
        >
             <h1 className="font-serif text-4xl md:text-6xl text-deep-jungle tracking-widest uppercase">
                StayinUBUD
             </h1>
        </motion.div>
      </motion.div>

      {/* Optional: Subtle Noise Overlay on Preloader too for texture continuity */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise bg-repeat z-20" />
    </motion.div>
  );
};