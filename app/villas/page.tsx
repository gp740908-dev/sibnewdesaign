'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Finale } from '@/components/Finale'; // FIXED: Using path alias

// --- Mock Data ---
const categories = ["All", "Jungle View", "Riverfront", "Private Pool", "Estate"];

const villas = [
  { 
    id: 1, 
    name: "The River House", 
    category: "Riverfront", 
    guests: "4 Guests",
    price: "$450", 
    image: "https://images.unsplash.com/photo-1600596542815-e32c2159f828?q=80&w=2564&auto=format&fit=crop",
    aspect: "aspect-[3/4]"
  },
  { 
    id: 2, 
    name: "Bamboo Sanctuary", 
    category: "Jungle View", 
    guests: "2 Guests",
    price: "$320", 
    image: "https://images.unsplash.com/photo-1533503254332-6ba78495048d?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-[3/4]" 
  },
  { 
    id: 3, 
    name: "Estate of Silence", 
    category: "Estate", 
    guests: "8 Guests",
    price: "$1,200", 
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-square" 
  },
  { 
    id: 4, 
    name: "Cliffside Pool Villa", 
    category: "Private Pool", 
    guests: "2 Guests",
    price: "$550", 
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-[3/4]" 
  },
  { 
    id: 5, 
    name: "Forest Cabin", 
    category: "Jungle View", 
    guests: "2 Guests",
    price: "$280", 
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-square" 
  },
  { 
    id: 6, 
    name: "Royal Residence", 
    category: "Estate", 
    guests: "10 Guests",
    price: "$1,500", 
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-[3/4]" 
  },
  { 
    id: 7, 
    name: "Hidden Stream", 
    category: "Riverfront", 
    guests: "2 Guests",
    price: "$380", 
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2688&auto=format&fit=crop",
    aspect: "aspect-[3/4]" 
  },
  { 
    id: 8, 
    name: "Glass Treehouse", 
    category: "Jungle View", 
    guests: "2 Guests",
    price: "$600", 
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-square" 
  }
];

export default function VillasPage() {
  const [filter, setFilter] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter Data
  const filteredVillas = useMemo(() => {
    return villas.filter(v => filter === "All" || v.category === filter);
  }, [filter]);

  // Split into columns for the masonry/parallax layout
  const leftColumn = filteredVillas.filter((_, i) => i % 2 === 0);
  const rightColumn = filteredVillas.filter((_, i) => i % 2 !== 0);

  // Parallax Logic for Right Column
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // The right column moves slightly faster/upwards creates a "floating" disconnect
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-rice-paper pt-32 pb-20">
      
      {/* --- Header Section --- */}
      <div className="px-6 md:px-12 mb-20 md:mb-32">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
          >
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-deep-jungle tracking-tight">
                  The Collection
              </h1>
              <div className="w-full h-px bg-deep-jungle/10" />
              <div className="flex justify-between items-start">
                  <p className="font-sans text-xs md:text-sm uppercase tracking-[0.2em] opacity-60 max-w-xs leading-loose">
                      Curated sanctuaries <br /> for the modern soul.
                  </p>
                  <div className="hidden md:block font-serif italic opacity-40">
                      {filteredVillas.length} Properties Available
                  </div>
              </div>
          </motion.div>
      </div>

      {/* --- Sticky Filter Bar --- */}
      <div className="sticky top-0 z-40 bg-rice-paper/80 backdrop-blur-md border-b border-deep-jungle/5 mb-12 md:mb-24 transition-all duration-300">
          <div className="px-6 md:px-12 py-6 overflow-x-auto no-scrollbar">
              <div className="flex gap-8 md:gap-12 min-w-max">
                  {categories.map((cat) => (
                      <button
                          key={cat}
                          onClick={() => setFilter(cat)}
                          className="relative group py-2"
                      >
                          <span className={`
                              font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300
                              ${filter === cat ? 'text-deep-jungle opacity-100' : 'text-deep-jungle opacity-40 group-hover:opacity-70'}
                          `}>
                              {cat}
                          </span>
                          {/* Active Underline */}
                          {filter === cat && (
                              <motion.div 
                                  layoutId="underline"
                                  className="absolute bottom-0 left-0 w-full h-px bg-burnished-gold"
                              />
                          )}
                      </button>
                  ))}
              </div>
          </div>
      </div>

      {/* --- Living Gallery Grid --- */}
      <div className="px-6 md:px-12 min-h-[100vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-start">
              
              {/* Left Column - Standard Flow */}
              <div className="flex flex-col gap-16 md:gap-32">
                  <AnimatePresence mode="popLayout">
                      {leftColumn.map((villa) => (
                          <VillaCard key={villa.id} villa={villa} />
                      ))}
                  </AnimatePresence>
              </div>

              {/* Right Column - Parallaxed & Offset */}
              <motion.div 
                  style={{ y: yRight }} 
                  className="flex flex-col gap-16 md:gap-32 mt-0 md:mt-32"
              >
                  <AnimatePresence mode="popLayout">
                      {rightColumn.map((villa) => (
                          <VillaCard key={villa.id} villa={villa} />
                      ))}
                  </AnimatePresence>
              </motion.div>

          </div>
      </div>

      {/* --- Spacer before Footer --- */}
      <div className="h-32 w-full" />
      
      {/* Reuse the Grand Finale/Footer */}
      <Finale />
      
    </main>
  );
}

// --- Villa Card Component ---
const VillaCard = ({ villa }: { villa: typeof villas[0] }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group cursor-pointer relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className={`relative w-full ${villa.aspect} overflow-hidden mb-8`}>
                <motion.img 
                    src={villa.image}
                    alt={villa.name}
                    className="w-full h-full object-cover transition-all duration-700 ease-out"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                />
                
                {/* Overlay for depth */}
                <div className="absolute inset-0 bg-deep-jungle/0 group-hover:bg-deep-jungle/10 transition-colors duration-700" />

                {/* Quick View Button (Centered) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                        transition={{ duration: 0.4 }}
                        className="w-24 h-24 rounded-full bg-rice-paper/20 backdrop-blur-md border border-rice-paper/40 flex items-center justify-center"
                    >
                        <span className="font-sans text-[10px] uppercase tracking-widest text-rice-paper">
                            View
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Typography Details */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline border-b border-deep-jungle/10 pb-4">
                    <h2 className="font-serif text-3xl md:text-4xl italic text-deep-jungle group-hover:text-burnished-gold transition-colors duration-500">
                        {villa.name}
                    </h2>
                    <span className="font-sans text-xs tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">
                        From {villa.price}
                    </span>
                </div>
                
                <div className="flex justify-between items-center mt-1">
                    <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-deep-jungle/50">
                        {villa.category}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-deep-jungle/50">
                        {villa.guests}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};
