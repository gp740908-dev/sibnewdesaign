'use client';

import React, { useState, useEffect, useCallback } from 'react'; // FIXED: Added useEffect
import { createPortal } from 'react-dom';
import { motion as m, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

const motion = m as any;

const villas = [
  {
    id: 1,
    title: "Garden Villa",
    location: "Pejeng, Ubud",
    description: "An open-air masterpiece surrounded by ancient trees, blurring the lines between indoor luxury and the wild jungle.",
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "River House",
    location: "Ayung Gorge",
    description: "Perched above the Ayung River, a symphony of rushing water and sustainable bamboo architecture.",
    src: "https://images.unsplash.com/photo-1600596542815-e32c2159f828?q=80&w=2564&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Stone Estate",
    location: "Kenderan Ridge",
    description: "Carved into the cliffside, offering panoramic views of the ridge and a private infinity pool suspended in air.",
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Canopy Loft",
    location: "Tegalalang",
    description: "High above the ferns, a treehouse reimagined for the modern soul seeking solitude and elevation.",
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2670&auto=format&fit=crop",
  }
];

const TRANSITION = { duration: 1.2, ease: [0.76, 0, 0.24, 1] };

export const VillaShowcase: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // FIXED: Added for SSR safety

  // Mouse Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const cursorX = useSpring(mouseX, { stiffness: 300, damping: 20, mass: 0.5 });
  const cursorY = useSpring(mouseY, { stiffness: 300, damping: 20, mass: 0.5 });

  // FIXED: Mount check for client-side only code
  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const getIndex = (i: number) => {
    const len = villas.length;
    return ((i % len) + len) % len;
  };
  
  const currentVilla = villas[getIndex(index)];
  const prevVilla = villas[getIndex(index - 1)];
  const nextVilla = villas[getIndex(index + 1)];

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => prev + newDirection);
  }, []);

  const handleZoneEnter = (text: string) => {
    setCursorText(text);
    setIsHovering(true);
  };

  const handleZoneLeave = () => {
    setIsHovering(false);
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden bg-deep-jungle cursor-none"
      onMouseEnter={() => setIsCursorVisible(true)}
      onMouseLeave={() => setIsCursorVisible(false)}
    >
      
      {/* 1. Background Layer */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={{
            enter: (d: any) => ({ clipPath: d > 0 ? "inset(0 0 0 0)" : "inset(0 0 0 0)" }), 
            initial: (d: any) => ({ opacity: 0, scale: 1.1 }),
            animate: { opacity: 1, scale: 1 },
            exit: (d: any) => ({ opacity: 0, zIndex: -1 })
          }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} 
          className="absolute inset-0 z-0"
        >
          <img 
            src={currentVilla.src} 
            alt={currentVilla.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* 2. Main Content Layer */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none">
        
        <div className="relative overflow-hidden px-4 text-center z-20 mix-blend-overlay">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.h1
              key={index}
              custom={direction}
              variants={{
                enter: (d: any) => ({ x: d > 0 ? 100 : -100, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: any) => ({ x: d > 0 ? -100 : 100, opacity: 0 })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={TRANSITION}
              className="font-serif text-[12vw] leading-none tracking-tight text-rice-paper whitespace-nowrap"
            >
              {currentVilla.title}
            </motion.h1>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
            <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-rice-paper/80 z-20"
            >
                {currentVilla.location}
            </motion.p>
        </AnimatePresence>
      </div>

      {/* Description Text */}
      <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none w-full max-w-lg px-6">
        <AnimatePresence mode="wait">
            <motion.p
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-sans text-sm md:text-base leading-relaxed text-rice-paper/90 drop-shadow-md"
            >
                {currentVilla.description}
            </motion.p>
        </AnimatePresence>
      </div>

      {/* Peeking Titles */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[15%] h-[40vh] flex items-center justify-end overflow-hidden opacity-30 pointer-events-none hidden md:flex">
         <motion.h2 
            key={`prev-${index}`}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={TRANSITION}
            className="font-serif text-[6vw] text-transparent stroke-text whitespace-nowrap origin-right -translate-x-[40%]"
         >
            {prevVilla.title}
         </motion.h2>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[15%] h-[40vh] flex items-center justify-start overflow-hidden opacity-30 pointer-events-none hidden md:flex">
         <motion.h2 
            key={`next-${index}`}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={TRANSITION}
            className="font-serif text-[6vw] text-transparent stroke-text whitespace-nowrap origin-left translate-x-[40%]"
         >
            {nextVilla.title}
         </motion.h2>
      </div>

      {/* Interaction Zones */}
      <div className="absolute inset-0 z-50 flex w-full h-full">
        <div 
            className="w-[20%] h-full"
            onMouseEnter={() => handleZoneEnter("PREV")}
            onMouseLeave={handleZoneLeave}
            onClick={() => paginate(-1)}
        />
        <div 
            className="w-[60%] h-full"
            onMouseEnter={() => handleZoneEnter("VIEW")}
            onMouseLeave={handleZoneLeave}
            onClick={() => console.log("View Details Clicked")}
        />
        <div 
            className="w-[20%] h-full"
            onMouseEnter={() => handleZoneEnter("NEXT")}
            onMouseLeave={handleZoneLeave}
            onClick={() => paginate(1)}
        />
      </div>

      {/* Custom Cursor - FIXED: Only render on client */}
      <AnimatePresence>
        {isMounted && isCursorVisible && createPortal(
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="fixed top-0 left-0 z-[100] pointer-events-none hidden md:flex items-center justify-center"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            >
                <motion.div 
                    layout
                    className="backdrop-blur-md bg-rice-paper/20 border border-rice-paper/30 shadow-xl flex items-center justify-center"
                    animate={{
                        width: isHovering ? "auto" : 12,
                        height: isHovering ? 32 : 12,
                        borderRadius: 9999,
                        paddingLeft: isHovering ? 16 : 0,
                        paddingRight: isHovering ? 16 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <AnimatePresence>
                        {isHovering && (
                            <motion.span
                                key={cursorText}
                                initial={{ opacity: 0, filter: "blur(5px)", width: 0 }}
                                animate={{ opacity: 1, filter: "blur(0px)", width: "auto" }}
                                exit={{ opacity: 0, filter: "blur(5px)", width: 0 }}
                                className="font-sans text-[10px] font-bold tracking-widest uppercase text-rice-paper whitespace-nowrap"
                            >
                                {cursorText}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>,
            document.body
        )}
      </AnimatePresence>

      <style>{`
        .stroke-text {
            -webkit-text-stroke: 1px rgba(242, 240, 235, 0.6);
        }
      `}</style>
    </section>
  );
};
