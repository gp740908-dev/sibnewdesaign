'use client';

import React, { useRef } from 'react';
import { motion as m, useScroll, useTransform, useInView } from 'framer-motion';

const motion = m as any;

const logos = [
  { id: 1, name: "VOGUE", font: "font-serif font-bold tracking-widest" },
  { id: 2, name: "CONDÉ NAST", font: "font-sans font-bold tracking-[0.2em]" },
  { id: 3, name: "ARCHITECTURAL DIGEST", font: "font-serif tracking-wider" },
  { id: 4, name: "TATLER", font: "font-serif tracking-[0.3em] font-semibold" }
];

const quote = "A sanctuary where time dissolves and the spirit finds its true North.";

export const SocialProof: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const words = quote.split(" ");

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-rice-paper py-32 md:py-48 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl w-full px-6 flex flex-col items-center">
        
        {/* 1. The Press Row */}
        <div className="w-full flex flex-wrap justify-center gap-12 md:gap-24 mb-32 border-b border-deep-jungle/5 pb-12">
            {logos.map((logo, index) => (
                <motion.div
                    key={logo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 0.3, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`cursor-pointer text-deep-jungle text-lg md:text-xl ${logo.font}`}
                >
                    {logo.name}
                </motion.div>
            ))}
        </div>

        {/* 2. The Grand Quote */}
        <motion.div style={{ y }} className="text-center max-w-4xl relative z-10">
            {/* Ink Reveal Animation */}
            <h2 className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-deep-jungle leading-[1.2] mb-12 flex flex-wrap justify-center gap-x-[0.25em]">
                {words.map((word, i) => (
                    <span key={i} className="relative overflow-hidden inline-block">
                        <motion.span
                            initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                            animate={isInView ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
                            transition={{ 
                                duration: 1.2, 
                                ease: [0.16, 1, 0.3, 1],
                                delay: i * 0.05 
                            }}
                            className="block"
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </h2>

            {/* Attribution */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 1 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="w-px h-12 bg-burnished-gold/50"></div>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-deep-jungle/60">
                    Elena Vogue, Senior Travel Editor
                </p>
            </motion.div>
        </motion.div>
      </div>

      {/* Decorative Background Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-burnished-gold/5 blur-[120px] rounded-full -z-0 pointer-events-none"></div>
    </section>
  );
};