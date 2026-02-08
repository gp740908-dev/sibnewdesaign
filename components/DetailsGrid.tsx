'use client';

import React, { useRef } from 'react';
import { motion as m, useScroll, useTransform } from 'framer-motion';

const motion = m as any;

const materials = [
  {
    id: 1,
    title: "01 — Reclaimed Teak",
    src: "https://images.unsplash.com/photo-1543456860-2646c2436d49?q=80&w=2670&auto=format&fit=crop", // Wood texture
    aspectRatio: "aspect-[3/4]",
    column: 1
  },
  {
    id: 2,
    title: "02 — Volcanic Stone",
    src: "https://images.unsplash.com/photo-1616627561840-a192f15eb70d?q=80&w=2574&auto=format&fit=crop", // Stone texture
    aspectRatio: "aspect-square",
    column: 2
  },
  {
    id: 3,
    title: "03 — Organic Linen",
    src: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=2574&auto=format&fit=crop", // Fabric texture
    aspectRatio: "aspect-[3/4]",
    column: 3
  },
  {
    id: 4,
    title: "04 — Aged Brass",
    src: "https://images.unsplash.com/photo-1582236317208-8cc4d2946c82?q=80&w=2670&auto=format&fit=crop", // Metal detail
    aspectRatio: "aspect-square",
    column: 1
  },
  {
    id: 5,
    title: "05 — Hand-Thrown Clay",
    src: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2670&auto=format&fit=crop", // Pottery
    aspectRatio: "aspect-[4/5]",
    column: 2
  },
  {
    id: 6,
    title: "06 — Living Flora",
    src: "https://images.unsplash.com/photo-1505567838386-4dc01007887e?q=80&w=2670&auto=format&fit=crop", // Leaf macro
    aspectRatio: "aspect-[3/4]",
    column: 3
  }
];

export const DetailsGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Assign different velocities to columns for the "uneven" feel
  const yCol1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [100, -150]); // Moves faster upwards
  const yCol3 = useTransform(scrollYProgress, [0, 1], [50, -50]);   // Gentle float

  // Helper to split items into columns
  const col1Items = materials.filter(m => m.column === 1);
  const col2Items = materials.filter(m => m.column === 2);
  const col3Items = materials.filter(m => m.column === 3);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-rice-paper py-32 md:py-48 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Minimalist Section Header */}
        <div className="mb-24 flex justify-between items-end border-t border-deep-jungle/10 pt-6">
            <h2 className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase opacity-60">
                The Artistry of Detail
            </h2>
            <p className="hidden md:block font-serif italic opacity-40 text-sm">
                Tactile Luxury
            </p>
        </div>

        {/* Asymmetrical Grid - 1 Col Mobile, 3 Col Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            
            {/* Column 1 */}
            <motion.div style={{ y: yCol1 }} className="flex flex-col gap-16 md:gap-32">
                {col1Items.map((item) => <DetailItem key={item.id} item={item} />)}
            </motion.div>

            {/* Column 2 - Offset visually */}
            <motion.div style={{ y: yCol2 }} className="flex flex-col gap-16 md:gap-32 md:pt-24">
                {col2Items.map((item) => <DetailItem key={item.id} item={item} />)}
            </motion.div>

             {/* Column 3 */}
             <motion.div style={{ y: yCol3 }} className="flex flex-col gap-16 md:gap-32 md:pt-12">
                {col3Items.map((item) => <DetailItem key={item.id} item={item} />)}
            </motion.div>

        </div>
      </div>
    </section>
  );
};

const DetailItem: React.FC<{ item: typeof materials[0] }> = ({ item }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="group cursor-none md:cursor-auto"
        >
            <div className={`relative w-full overflow-hidden ${item.aspectRatio} mb-4`}>
                <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    src={item.src} 
                    alt={item.title}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-deep-jungle/0 group-hover:bg-deep-jungle/5 transition-colors duration-500"></div>
            </div>
            
            <div className="flex justify-between items-center opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-deep-jungle">
                    {item.title}
                </span>
                <span className="w-8 h-[1px] bg-deep-jungle/30 group-hover:w-12 transition-all duration-500"></span>
            </div>
        </motion.div>
    );
}