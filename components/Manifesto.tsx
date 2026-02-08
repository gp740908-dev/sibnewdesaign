import React, { useRef } from 'react';
import { motion as m, useScroll, useTransform } from 'framer-motion';

const motion = m as any;

const phrase = "More than a stay. A sanctuary for the soul.";

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.2"]
  });

  const words = phrase.split(" ");

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-rice-paper flex flex-col items-center justify-center py-24 md:py-48"
    >
      <div className="max-w-6xl px-6 md:px-12 relative z-10">
        {/* Main Animated Text */}
        <div className="flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] justify-center text-center leading-[1.1]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </div>
        
        {/* Secondary Text */}
        <motion.div 
            style={{ opacity: scrollYProgress }}
            className="mt-24 flex flex-col items-center text-center space-y-6"
        >
            <div className="w-px h-16 bg-deep-jungle/20"></div>
            <p className="text-deep-jungle/60 font-sans text-sm md:text-base max-w-lg mx-auto leading-loose tracking-wide">
                We curate spaces that reconnect you with nature's rhythm. <br className="hidden md:block"/>
                Silent mornings, sacred architecture, and the luxury of time.
            </p>
        </motion.div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-radial from-burnished-gold/5 to-transparent rounded-full blur-3xl -z-0 pointer-events-none"></div>
    </section>
  );
};

const Word: React.FC<{ children: string; progress: any; range: [number, number] }> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.05, 1]);
  const y = useTransform(progress, range, [30, 0]);
  const filter = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);
  
  return (
    <span className="relative inline-block">
      <motion.span 
        style={{ opacity, y, filter }} 
        className="text-[10vw] md:text-[7vw] font-serif text-deep-jungle block will-change-transform"
      >
        {children}
      </motion.span>
    </span>
  );
};