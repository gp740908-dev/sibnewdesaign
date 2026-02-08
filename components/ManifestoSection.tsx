'use client';

import React, { useRef } from 'react';
import { motion as m, useScroll, useTransform } from 'framer-motion';

const motion = m as any;

const phrase = [
  { text: "Ubud", italic: false },
  { text: "is", italic: false },
  { text: "not", italic: false },
  { text: "a", italic: false },
  { text: "destination.", italic: false },
  { text: "It", italic: false },
  { text: "is", italic: false },
  { text: "a", italic: false },
  { text: "return", italic: false },
  { text: "to", italic: false },
  { text: "oneself.", italic: false },
  { text: "At", italic: false },
  { text: "StayinUBUD,", italic: false },
  { text: "we", italic: false },
  { text: "curate", italic: false },
  { text: "sanctuaries", italic: true },
  { text: "where", italic: false },
  { text: "the", italic: false },
  { text: "rustle", italic: false },
  { text: "of", italic: false },
  { text: "palm", italic: false },
  { text: "leaves", italic: false },
  { text: "and", italic: false },
  { text: "the", italic: false },
  { text: "sacred", italic: true },
  { text: "flow", italic: false },
  { text: "of", italic: false },
  { text: "the", italic: false },
  { text: "Ayung", italic: false },
  { text: "River", italic: false },
  { text: "become", italic: false },
  { text: "your", italic: false },
  { text: "morning", italic: false },
  { text: "prayer.", italic: false },
  { text: "More", italic: false },
  { text: "than", italic: false },
  { text: "a", italic: false },
  { text: "stay.", italic: false },
  { text: "A", italic: false },
  { text: "rebirth.", italic: false },
];

export const ManifestoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scrub animation based on scroll position of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.8"]
  });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] md:min-h-[150vh] w-full bg-rice-paper flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
        {/* Subtle Background Elements for depth */}
        <div className="absolute top-1/4 left-0 w-48 h-48 md:w-64 md:h-64 bg-deep-jungle/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 md:w-96 md:h-96 bg-burnished-gold/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] w-full relative z-10">
        {/* 
            CRITICAL FIX: 
            Text sizing classes moved HERE so 'em' units in 'gap-x' refer to the large font size, not the root 16px.
            This ensures spaces between words are proportional to the letters.
        */}
        <div className={`
            flex flex-wrap items-baseline justify-center 
            gap-x-[0.3em] gap-y-[0.1em] 
            leading-[1.15] md:leading-[1.25]
            text-[2.5rem]           /* Mobile Small */
            sm:text-[3.5rem]        /* Mobile Large */
            md:text-[5rem]          /* Tablet */
            lg:text-[6.5rem]        /* Laptop */
            xl:text-[7.5rem]        /* Desktop */
            2xl:text-[8.5rem]       /* Wide Screen */
        `}>
          {phrase.map((wordObj, i) => {
            // Calculate a staggered range for each word
            const start = i / phrase.length;
            const end = start + (1 / phrase.length);
            
            return (
              <Word 
                key={i} 
                progress={scrollYProgress} 
                range={[start, end]}
                italic={wordObj.italic}
              >
                {wordObj.text}
              </Word>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
  italic: boolean;
}

const Word: React.FC<WordProps> = ({ children, progress, range, italic }) => {
  // Map scroll progress to opacity, Y position, and blur
  const opacity = useTransform(progress, range, [0.0, 1]);
  const y = useTransform(progress, range, [50, 0]);
  const filter = useTransform(progress, range, ["blur(6px)", "blur(0px)"]);
  
  return (
    <span className="relative inline-flex">
      <motion.span 
        style={{ opacity, y, filter }} 
        className={`
          block
          text-deep-jungle tracking-tight
          ${italic ? 'font-serif italic font-light text-burnished-gold/90' : 'font-serif font-normal'}
          will-change-[opacity,transform,filter]
        `}
      >
        {children}
      </motion.span>
    </span>
  );
};