'use client';

import React, { useState, useRef } from 'react';
import { motion as m, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

const motion = m as any;

const services = [
  {
    id: 1,
    title: "Private Chef",
    category: "Culinary",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Yoga & Meditation",
    category: "Wellness",
    src: "https://images.unsplash.com/photo-1599447292180-45fd84092ef0?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Jungle Trekking",
    category: "Adventure",
    src: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2688&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Spa Treatments",
    category: "Relaxation",
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Cultural Tours",
    category: "Heritage",
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2670&auto=format&fit=crop"
  }
];

export const Services: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Position Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Spring Logic for Image
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-rice-paper py-32 md:py-48 overflow-hidden z-20"
    >
      <div className="max-w-[90vw] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 flex items-end justify-between border-b border-deep-jungle/10 pb-6">
            <h2 className="font-serif text-5xl md:text-7xl italic text-deep-jungle">Concierge</h2>
            <span className="font-sans text-xs uppercase tracking-[0.2em] opacity-50 hidden md:block pb-2">
                Exclusive Services
            </span>
        </div>

        {/* Service List */}
        <div className="flex flex-col">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{ x: isHovered ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`
                    group relative border-b border-deep-jungle/20 py-12 md:py-16 
                    flex justify-between items-center cursor-pointer
                    transition-opacity duration-300
                    ${isDimmed ? 'opacity-30 blur-[1px]' : 'opacity-100'}
                `}
              >
                <h3 className={`
                    font-sans text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-deep-jungle
                    transition-transform duration-300
                `}>
                  {service.title}
                </h3>
                
                <span className="font-serif italic text-xl md:text-2xl text-deep-jungle/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                  {service.category}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Image Reveal */}
      <motion.div 
        style={{ x, y }}
        className="pointer-events-none absolute top-0 left-0 z-30 hidden md:block"
      >
        <AnimatePresence>
            {hoveredIndex !== null && (
                <motion.div
                    key={services[hoveredIndex].id} // Unique key ensures animation on change
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, ease: "backOut" }}
                    className="absolute -top-[200px] -left-[150px] w-[300px] h-[400px] overflow-hidden bg-deep-jungle shadow-2xl"
                >
                    <img 
                        src={services[hoveredIndex].src}
                        alt={services[hoveredIndex].title}
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay for sophistication */}
                    <div className="absolute inset-0 bg-deep-jungle/10 mix-blend-multiply"></div>
                </motion.div>
            )}
        </AnimatePresence>
      </motion.div>

    </section>
  );
};