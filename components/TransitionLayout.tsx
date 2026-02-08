'use client';

import React, { useState, useEffect } from 'react';
import { motion as m } from 'framer-motion';

const motion = m as any;

interface TransitionLayoutProps {
  children: React.ReactNode;
}

export const TransitionLayout: React.FC<TransitionLayoutProps> = ({ children }) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Basic mobile detection for clip-path sizing
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Lock body scroll during intro
    document.body.style.overflow = 'hidden';
    
    const unlockTimer = setTimeout(() => {
        document.body.style.overflow = 'unset';
        setIsAnimationComplete(true);
    }, 4500); // 2s wait + 2.2s animation + buffer

    return () => {
        window.removeEventListener('resize', checkMobile);
        clearTimeout(unlockTimer);
        document.body.style.overflow = 'unset';
    };
  }, []);

  // Responsive Inset Values
  const initialClipPath = isMobile 
    ? "inset(42% 15% 42% 15% round 10px)" 
    : "inset(42% 42% 42% 42% round 12px)";

  return (
    <div className="relative w-full min-h-screen bg-deep-jungle selection:bg-rice-paper selection:text-deep-jungle">
      
      {/* 
         The Main Content Wrapper 
         - Acts as the "Window" 
      */}
      <motion.div
        initial={{
          clipPath: initialClipPath,
          filter: "brightness(0.6) grayscale(0.2)",
        }}
        animate={{
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          // CRITICAL FIX: explicitly set filter to "none" when complete to unbreak fixed positioning contexts
          filter: isAnimationComplete ? "none" : "brightness(1) grayscale(0)", 
        }}
        transition={{
          duration: 2.2,
          ease: [0.87, 0, 0.13, 1], // The "Heavy" Luxury Ease
          delay: 2.0, 
        }}
        className="relative z-10 w-full min-h-screen bg-rice-paper"
      >
        {children}
      </motion.div>

      {/* Intro Text Overlay */}
      {!isAnimationComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="relative"
           >
              <motion.h1 
                animate={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.8, delay: 1.5, ease: "easeIn" }}
                className="font-serif text-3xl md:text-5xl text-rice-paper tracking-[0.2em] uppercase mix-blend-difference"
              >
                StayinUBUD
              </motion.h1>
           </motion.div>
        </div>
      )}
    </div>
  );
};