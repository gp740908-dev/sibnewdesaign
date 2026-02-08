'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Finale } from '@/components/Finale';

// --- Mock Data ---
const categories = ["All", "Culture", "Culinary", "Design", "Wellness", "People"];

const journalEntries = [
  { 
    id: 1, 
    title: "The Silent Day: Understanding Nyepi", 
    category: "Culture", 
    date: "Oct 24", 
    span: "featured", 
    excerpt: "Once a year, the entire island of Bali shuts down. No flights, no electricity, no noise. We explore the profound spiritual architecture of silence.",
    image: "https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=2669&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    title: "Culinary Secrets of the Gianyar Night Market", 
    category: "Culinary", 
    date: "Oct 20", 
    span: "large", 
    excerpt: "Beyond the tourist strips lies a sensory explosion of spit-roasted pig, spicy sambal, and sweet rice cakes.",
    image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=2680&auto=format&fit=crop" 
  },
  { 
    id: 3, 
    title: "A Morning with the Rice Farmers", 
    category: "People", 
    date: "Oct 18", 
    span: "small", 
    excerpt: "Meet Pak Wayan, who has tended the Tegalalang terraces for sixty years.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2670&auto=format&fit=crop" 
  },
  { 
    id: 4, 
    title: "Architecture of Bamboo: A Sustainable Future", 
    category: "Design", 
    date: "Oct 15", 
    span: "full", 
    excerpt: "How modern architects are reclaiming ancient materials to build cathedrals of green steel in the jungle.",
    image: "https://images.unsplash.com/photo-1596401057633-565652ca65a0?q=80&w=2664&auto=format&fit=crop" 
  },
  { 
    id: 5, 
    title: "Sacred Water Temples", 
    category: "Wellness", 
    date: "Oct 10", 
    span: "half", 
    excerpt: "The ritual of Melukat: purification of the body and soul in the holy springs of Tirta Empul.",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2670&auto=format&fit=crop" 
  },
  { 
    id: 6, 
    title: "The Art of Batik", 
    category: "Culture", 
    date: "Oct 05", 
    span: "half", 
    excerpt: "Tracing the wax and dye traditions that have clothed royalty for centuries.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2670&auto=format&fit=crop" 
  }
];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // FIXED: Added for SSR safety

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

  const filteredEntries = useMemo(() => {
    if (activeCategory === "All") return journalEntries;
    return journalEntries.filter(e => e.category === activeCategory);
  }, [activeCategory]);

  return (
    <main 
        onMouseMove={handleMouseMove}
        className="relative min-h-screen bg-rice-paper pt-32 pb-20 overflow-x-hidden"
    >
      
      {/* 1. Minimalist Header */}
      <JournalHeader />

      {/* 2. Sticky Category Bar */}
      <StickyCategoryBar 
        categories={categories} 
        active={activeCategory} 
        setActive={setActiveCategory} 
      />

      {/* 3. Asymmetrical Grid */}
      <div className="px-6 md:px-12 max-w-[95vw] mx-auto min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-y-32 md:gap-x-12">
            {filteredEntries.map((entry, index) => (
                <JournalCard 
                    key={entry.id} 
                    entry={entry} 
                    index={index}
                    onHoverStart={() => setCursorVisible(true)}
                    onHoverEnd={() => setCursorVisible(false)}
                />
            ))}
        </div>
      </div>

      {/* Spacer & Footer */}
      <div className="h-32 w-full" />
      <Finale />

      {/* Custom 'READ' Cursor - FIXED: Only render on client */}
      {isMounted && createPortal(
          <motion.div
            className="fixed top-0 left-0 z-[100] pointer-events-none"
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
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-deep-jungle/90 backdrop-blur-md text-rice-paper shadow-2xl">
              <span className="font-sans text-[10px] font-bold tracking-[0.2em]">READ</span>
            </div>
          </motion.div>,
          document.body
      )}
    </main>
  );
}

// --- Components ---

const JournalHeader = () => {
    return (
        <div className="px-6 md:px-12 mb-16 md:mb-24 flex flex-col items-start gap-6">
             <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-7xl md:text-9xl text-deep-jungle tracking-tighter"
            >
                The Journal
            </motion.h1>
            <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                 className="flex flex-col md:flex-row gap-6 md:items-end"
            >
                <div className="w-12 h-[2px] bg-deep-jungle/20 mb-2 md:mb-1" />
                <p className="font-sans text-sm md:text-base text-deep-jungle/60 max-w-md leading-relaxed">
                    Chronicles of culture, slow living, and the art of being. <br />
                    Stories curated from the heart of the island.
                </p>
            </motion.div>
        </div>
    );
};

const StickyCategoryBar = ({ categories, active, setActive }: { categories: string[], active: string, setActive: (c: string) => void }) => {
    return (
        <div className="sticky top-0 z-40 bg-rice-paper/80 backdrop-blur-xl border-b border-deep-jungle/5 mb-24 transition-all duration-300">
             <div className="px-6 md:px-12 py-6 overflow-x-auto no-scrollbar">
                <div className="flex gap-8 md:gap-12 min-w-max">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className="relative group py-2"
                        >
                            <span className={`
                                font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300
                                ${active === cat ? 'text-deep-jungle opacity-100' : 'text-deep-jungle opacity-40 group-hover:opacity-70'}
                            `}>
                                {cat}
                            </span>
                            {active === cat && (
                                <motion.div 
                                    layoutId="dot"
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-burnished-gold rounded-full"
                                />
                            )}
                        </button>
                    ))}
                </div>
             </div>
        </div>
    );
};

const JournalCard = ({ entry, index, onHoverStart, onHoverEnd }: { entry: any, index: number, onHoverStart: () => void, onHoverEnd: () => void }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const gridClasses = useMemo(() => {
        switch (entry.span) {
            case "featured": return "col-span-1 md:col-span-12";
            case "large": return "col-span-1 md:col-span-7";
            case "small": return "col-span-1 md:col-span-5";
            case "full": return "col-span-1 md:col-span-12";
            case "half": return "col-span-1 md:col-span-6";
            default: return "col-span-1 md:col-span-4";
        }
    }, [entry.span]);

    if (entry.span === "featured") {
        return (
            <motion.div 
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`${gridClasses} flex flex-col md:flex-row gap-8 md:gap-16 group cursor-pointer mb-12 md:mb-24`}
            >
                <div 
                    className="w-full md:w-[60%] aspect-[4/3] md:aspect-[16/9] overflow-hidden relative"
                    onMouseEnter={onHoverStart}
                    onMouseLeave={onHoverEnd}
                >
                     <motion.div style={{ y }} className="w-full h-[120%] relative -top-[10%]">
                        <motion.img 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 1.2 }}
                            src={entry.image} 
                            alt={entry.title} 
                            className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>
                </div>

                <div className="w-full md:w-[40%] flex flex-col justify-center gap-6">
                    <div className="flex items-center gap-4 font-sans text-xs tracking-[0.2em] uppercase opacity-60">
                        <span>{entry.category}</span>
                        <span className="w-4 h-[1px] bg-deep-jungle"></span>
                        <span>{entry.date}</span>
                    </div>
                    <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-deep-jungle">
                        {entry.title}
                    </h2>
                    <p className="font-sans text-sm md:text-base leading-relaxed opacity-70 max-w-sm">
                        {entry.excerpt}
                    </p>
                    <div className="inline-block overflow-hidden w-max mt-4">
                        <span className="font-sans text-xs uppercase tracking-widest relative">
                            Read Full Story
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-deep-jungle transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </span>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`${gridClasses} flex flex-col gap-6 group cursor-pointer`}
        >
             <div 
                className={`w-full overflow-hidden relative ${entry.span === 'full' ? 'aspect-[21/9]' : 'aspect-[4/5] md:aspect-[3/4]'}`}
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
            >
                <motion.div style={{ y }} className="w-full h-[120%] relative -top-[10%]">
                     <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 1.2 }}
                        src={entry.image} 
                        alt={entry.title} 
                        className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                    />
                </motion.div>
                
                {entry.span === 'full' && (
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                )}
            </div>

            <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3 font-sans text-[10px] tracking-[0.2em] uppercase opacity-50">
                    <span>{entry.category}</span>
                    <span>•</span>
                    <span>{entry.date}</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight text-deep-jungle">
                    {entry.title}
                </h3>
                 <div className="w-full h-[1px] bg-deep-jungle/10 mt-2 group-hover:bg-deep-jungle/40 transition-colors duration-500 origin-left scale-x-100" />
            </div>
        </motion.div>
    );
};
