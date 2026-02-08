'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Finale } from '../../../components/Finale'; // Adjusted path for nested route

// --- Mock Data for "The River House" ---
const villaData = {
  name: "The River House",
  price: 450,
  location: "Ayung Gorge, Ubud",
  description: "Perched on the edge of the Ayung River gorge, this residence is a dialogue between raw concrete and ancient jungle. The sound of flowing water becomes your soundtrack, washing away the noise of the modern world. Designed by renowned architect Vidya Mantra, the structure seems to float above the canopy, offering a vantage point that is both commanding and deeply humble in the face of nature's grandeur.",
  description2: "Every detail has been curated to induce a state of meditative calm. From the reclaimed ironwood floors that cool your feet to the open-air living spaces that invite the morning mist inside, The River House is not just a place to stay—it is a vessel for transformation.",
  specs: [
    { label: "Guests", value: "2 Adults" },
    { label: "Size", value: "150 sqm" },
    { label: "View", value: "River & Jungle" },
    { label: "Pool", value: "Private Infinity" }
  ],
  amenities: {
    sleep: ["King Koil Mattress", "Egyptian Cotton Linens", "Blackout Curtains", "Pillow Menu"],
    bathe: ["Outdoor Stone Tub", "Organic Toiletries", "Rain Shower", "River Stone Basins"],
    indulge: ["Private Chef on Call", "Floating Breakfast", "In-Villa Massage", "Marshall Sound System"]
  },
  heroImage: "https://images.unsplash.com/photo-1600596542815-e32c2159f828?q=80&w=2564&auto=format&fit=crop",
  gallery: [
    { src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop", type: "wide" }, // Living Room
    { src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2670&auto=format&fit=crop", type: "detail" }, // Pool Detail
    { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2670&auto=format&fit=crop", type: "wide" }, // Bedroom
    { src: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2670&auto=format&fit=crop", type: "detail" }, // Ceramics/Art
  ]
};

export default function VillaDetailsPage({ params }: { params: { slug: string } }) {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Monitor scroll to toggle the sticky bar
  useMotionValueEvent(scrollY, "change", (latest) => {
    const viewportHeight = window.innerHeight;
    if (latest > viewportHeight - 100) {
      setIsScrolledPastHero(true);
    } else {
      setIsScrolledPastHero(false);
    }
  });

  return (
    <main ref={containerRef} className="relative min-h-screen bg-rice-paper">
      
      {/* 1. Cinematic Hero */}
      <HeroSection villa={villaData} />

      {/* 2. Narrative Split Layout */}
      <NarrativeSection villa={villaData} />

      {/* 3. Immersive Gallery (Parallax) */}
      <GallerySection images={villaData.gallery} />

      {/* 4. Amenities Grid */}
      <AmenitiesSection amenities={villaData.amenities} />

      {/* 5. Sticky Booking Bar */}
      <StickyBookingBar villa={villaData} isVisible={isScrolledPastHero} />

      {/* Spacer & Footer */}
      <div className="h-24 w-full" />
      <Finale />

    </main>
  );
}

// --- Components ---

const HeroSection = ({ villa }: { villa: typeof villaData }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden bg-deep-jungle">
            {/* Parallax Image */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <img 
                    src={villa.heroImage} 
                    alt={villa.name} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-jungle/60 via-transparent to-transparent opacity-80" />
            </motion.div>

            {/* Typography */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
                <div className="overflow-hidden">
                    <motion.h1 
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="font-serif text-[12vw] md:text-[9vw] leading-[0.85] text-rice-paper tracking-tighter"
                    >
                        {villa.name}
                    </motion.h1>
                </div>
                <div className="mt-6 md:mt-10 flex justify-between items-end border-t border-rice-paper/30 pt-6">
                    <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 1 }}
                         className="font-sans text-xs uppercase tracking-[0.2em] text-rice-paper/80"
                    >
                        {villa.location}
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="animate-bounce"
                    >
                        <span className="font-sans text-[10px] text-rice-paper uppercase tracking-widest">
                            Scroll to Explore
                        </span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const NarrativeSection = ({ villa }: { villa: typeof villaData }) => {
    return (
        <section className="relative w-full py-32 md:py-48 px-6 md:px-12 bg-rice-paper">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                
                {/* Left: Specs (30%) */}
                <div className="lg:col-span-4 flex flex-col gap-8 order-2 lg:order-1">
                    <div className="w-12 h-[2px] bg-deep-jungle/20 mb-4" />
                    <h3 className="font-sans text-xs uppercase tracking-[0.2em] opacity-50 mb-4">
                        The Highlights
                    </h3>
                    <div className="flex flex-col">
                        {villa.specs.map((spec, i) => (
                            <div key={i} className="flex justify-between py-4 border-b border-deep-jungle/10 last:border-none">
                                <span className="font-serif italic text-deep-jungle text-lg">{spec.label}</span>
                                <span className="font-sans text-sm uppercase tracking-widest text-deep-jungle/70">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Story (70%) */}
                <div className="lg:col-span-8 order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1 }}
                    >
                        {/* Drop Cap Styling */}
                        <p className="font-serif text-2xl md:text-4xl leading-[1.6] md:leading-[1.5] text-deep-jungle first-letter:float-left first-letter:text-7xl md:first-letter:text-8xl first-letter:mr-6 first-letter:mt-[-10px] first-letter:font-serif first-letter:text-deep-jungle">
                            {villa.description}
                        </p>
                        <p className="font-serif text-xl md:text-2xl leading-[1.6] text-deep-jungle/80 mt-12">
                            {villa.description2}
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

const GallerySection = ({ images }: { images: typeof villaData.gallery }) => {
    return (
        <section className="relative w-full py-12 flex flex-col gap-32 md:gap-48 bg-rice-paper overflow-hidden">
            {images.map((img, index) => (
                <ParallaxImage key={index} src={img.src} type={img.type} index={index} />
            ))}
        </section>
    );
};

const ParallaxImage = ({ src, type, index }: { src: string, type: string, index: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
    const y = useTransform(scrollYProgress, [0, 1], type === 'wide' ? [0, -50] : [50, -50]);

    return (
        <div 
            ref={ref} 
            className={`
                relative overflow-hidden
                ${type === 'wide' ? 'w-full h-[60vh] md:h-[90vh]' : 'w-[85vw] md:w-[40vw] h-[60vh] mx-auto'}
            `}
        >
            <motion.div style={{ scale, y }} className="w-full h-[120%] relative -top-[10%]">
                <img 
                    src={src} 
                    alt="Villa Detail" 
                    className="w-full h-full object-cover"
                />
            </motion.div>
        </div>
    );
};

const AmenitiesSection = ({ amenities }: { amenities: typeof villaData.amenities }) => {
    return (
        <section className="relative w-full py-32 md:py-48 px-6 md:px-12 bg-rice-paper">
            <div className="max-w-7xl mx-auto">
                 <div className="mb-24 text-center">
                    <h2 className="font-serif italic text-5xl md:text-6xl text-deep-jungle mb-6">Curated Comforts</h2>
                    <div className="w-px h-16 bg-deep-jungle/20 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
                    <AmenityColumn title="Sleep" items={amenities.sleep} delay={0} />
                    <AmenityColumn title="Bathe" items={amenities.bathe} delay={0.2} />
                    <AmenityColumn title="Indulge" items={amenities.indulge} delay={0.4} />
                </div>
            </div>
        </section>
    );
};

const AmenityColumn = ({ title, items, delay }: { title: string, items: string[], delay: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
        >
            <h3 className="font-serif text-3xl italic mb-8 text-burnished-gold">{title}</h3>
            <ul className="flex flex-col gap-4">
                {items.map((item, i) => (
                    <li key={i} className="font-sans text-xs uppercase tracking-[0.2em] text-deep-jungle/70">
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

const StickyBookingBar = ({ villa, isVisible }: { villa: typeof villaData, isVisible: boolean }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-0 left-0 w-full z-50 px-4 md:px-8 pb-4 md:pb-6 pointer-events-none"
                >
                    <div className="pointer-events-auto max-w-4xl mx-auto bg-rice-paper/80 backdrop-blur-xl border border-deep-jungle/5 shadow-2xl rounded-full px-6 py-4 flex items-center justify-between">
                        
                        {/* Left: Info */}
                        <div className="flex flex-col">
                            <span className="font-serif italic text-lg text-deep-jungle leading-none">
                                {villa.name}
                            </span>
                            <span className="font-sans text-[10px] uppercase tracking-widest text-deep-jungle/60 mt-1">
                                From ${villa.price} / Night
                            </span>
                        </div>

                        {/* Right: Action */}
                        <button className="bg-deep-jungle text-rice-paper px-8 py-3 rounded-full overflow-hidden relative group">
                            <span className="relative z-10 font-sans text-xs uppercase tracking-[0.2em] group-hover:text-deep-jungle transition-colors duration-300">
                                Reserve Dates
                            </span>
                            <div className="absolute inset-0 bg-burnished-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
