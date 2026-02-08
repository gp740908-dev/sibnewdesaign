'use client';

import React, { useState, useRef, useEffect } from 'react'; // FIXED: Added useEffect
import { createPortal } from 'react-dom';
import { motion as m, useMotionValue, useSpring } from 'framer-motion';

const motion = m as any;

const articles = {
  feature: {
    id: 1,
    category: "Philosophy",
    date: "OCT 24",
    title: "The Sacred Art of Silence",
    excerpt: "In a world of constant noise, we explore why true luxury is the ability to disconnect. A deep dive into the spiritual architecture of Ubud's silent retreats.",
    src: "https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=2669&auto=format&fit=crop"
  },
  list: [
    {
      id: 2,
      category: "Culinary",
      date: "SEP 12",
      title: "Foraging with Chef Ray",
      src: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=2680&auto=format&fit=crop"
    },
    {
      id: 3,
      category: "Architecture",
      date: "AUG 30",
      title: "Bamboo: The Green Steel",
      src: "https://images.unsplash.com/photo-1596401057633-565652ca65a0?q=80&w=2664&auto=format&fit=crop"
    },
    {
      id: 4,
      category: "Culture",
      date: "AUG 15",
      title: "Rituals of the Full Moon",
      src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2670&auto=format&fit=crop"
    }
  ]
};

export const JournalSection: React.FC = () => {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // FIXED: Added for SSR safety
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Physics for Custom Cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const cursorX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const cursorY = useSpring(mouseY, { stiffness: 400, damping: 30 });

  // FIXED: Mount check for client-side only code
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-rice-paper py-32 md:py-48 px-6 md:px-12 overflow-hidden border-t border-deep-jungle/5"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-24">
            <h2 className="font-serif text-5xl md:text-7xl italic text-deep-jungle">Journal</h2>
            <a href="#" className="font-sans text-xs uppercase tracking-[0.2em] hover:text-burnished-gold transition-colors pb-2">
                View All Stories
            </a>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Feature Article (Left - Span 7) */}
            <div className="lg:col-span-7 group cursor-pointer">
                <div 
                    className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden mb-8"
                    onMouseEnter={() => setCursorVisible(true)}
                    onMouseLeave={() => setCursorVisible(false)}
                >
                    <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                        src={articles.feature.src} 
                        alt={articles.feature.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 font-sans text-xs tracking-[0.2em] uppercase opacity-60">
                        <span>{articles.feature.category}</span>
                        <span className="w-4 h-[1px] bg-deep-jungle"></span>
                        <span>{articles.feature.date}</span>
                    </div>
                    <h3 className="font-serif text-4xl md:text-6xl leading-[1.1] group-hover:italic transition-all duration-300">
                        {articles.feature.title}
                    </h3>
                    <p className="font-sans text-sm md:text-base opacity-70 leading-relaxed max-w-md mt-2">
                        {articles.feature.excerpt}
                    </p>
                    <div className="mt-4 overflow-hidden inline-block w-max">
                        <span className="font-sans text-xs uppercase tracking-widest border-b border-transparent group-hover:border-deep-jungle transition-all duration-300">
                            Read Story
                        </span>
                    </div>
                </div>
            </div>

            {/* Recent List (Right - Span 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="flex flex-col gap-12">
                    {articles.list.map((item) => (
                        <div key={item.id} className="group cursor-pointer flex gap-6 items-start">
                             <div 
                                className="w-24 h-32 md:w-32 md:h-40 shrink-0 overflow-hidden"
                                onMouseEnter={() => setCursorVisible(true)}
                                onMouseLeave={() => setCursorVisible(false)}
                             >
                                <motion.img 
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    src={item.src} 
                                    alt={item.title}
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                />
                             </div>
                             
                             <div className="flex flex-col gap-2 pt-2 w-full">
                                <div className="flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase opacity-50 mb-1">
                                    <span>{item.category}</span>
                                    <span>•</span>
                                    <span>{item.date}</span>
                                </div>
                                <h4 className="font-serif text-xl md:text-2xl leading-tight">
                                    {item.title}
                                </h4>
                                <div className="w-full h-[1px] bg-deep-jungle/10 mt-6 group-hover:bg-deep-jungle/30 transition-colors duration-500 origin-left scale-x-100"></div>
                             </div>
                        </div>
                    ))}
                </div>
                
                {/* Decor */}
                <div className="hidden lg:block mt-12 p-8 bg-deep-jungle text-rice-paper text-center">
                    <p className="font-serif italic text-xl mb-4">"The only true currency is time."</p>
                    <p className="font-sans text-[10px] uppercase tracking-widest opacity-60">StayinUbud Philosophy</p>
                </div>
            </div>

        </div>
      </div>

      {/* Custom 'READ' Cursor - FIXED: Only render on client */}
      {isMounted && createPortal(
          <motion.div
            className="fixed top-0 left-0 z-50 pointer-events-none"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%"
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
                scale: cursorVisible ? 1 : 0, 
                opacity: cursorVisible ? 1 : 0 
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center px-6 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
              <span className="text-white font-sans text-[10px] font-bold tracking-[0.2em]">READ</span>
            </div>
          </motion.div>,
          document.body
      )}

    </section>
  );
};
