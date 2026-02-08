'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { Finale } from '../../components/Finale'; // Adjust path for nested route

// --- Mock Editorial Content ---
const articleData = {
  title: "The Silent Day: Understanding Nyepi",
  subtitle: "In a world addicted to noise, Bali offers a radical alternative: twenty-four hours of absolute silence.",
  meta: { 
    date: "October 24, 2024", 
    category: "Culture", 
    readTime: "5 MIN READ" 
  },
  heroImage: "https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=2669&auto=format&fit=crop",
  content: [
    { 
      type: 'paragraph', 
      text: "It begins not with silence, but with a cacophony. The night before Nyepi, the streets of Ubud are possessed by the Ogoh-Ogoh parades—grotesque, towering bamboo demons paraded through the villages to confuse the evil spirits. Drums beat, gongs crash, and fire swirls. It is a necessary exorcism, a purging of the noise that clutters the human spirit." 
    },
    { 
      type: 'paragraph', 
      text: "And then, as the sun rises the next morning, the island stops. Completely. No planes land at the airport. No cars roam the streets. No lights are turned on. For twenty-four hours, Bali returns to the rhythm of nature." 
    },
    { 
      type: 'image-full', 
      src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2670&auto=format&fit=crop", 
      caption: "The sacred pools of Tirta Empul, usually bustling, fall silent." 
    },
    { 
      type: 'paragraph', 
      text: "The philosophy is rooted in the Caka calendar. Nyepi is a day of self-reflection, forcing us to look inward. When the external world is muted, the internal world becomes deafeningly loud. This is the challenge, and the luxury, of true silence. It is not merely the absence of sound, but the presence of oneself." 
    },
    { 
      type: 'quote', 
      text: "Silence is not empty. It is full of answers. In the pause between breaths, we find who we truly are." 
    },
    { 
      type: 'paragraph', 
      text: "At StayinUBUD, we observe this day with reverence. Our villas, designed to blur the boundaries between indoor and outdoor, become private sanctuaries for this introspection. Guests often describe it as the most profound experience of their stay—watching the Milky Way appear in a sky free from light pollution, listening to the jungle reclaiming its voice." 
    },
    { 
      type: 'image-diagonal', 
      images: [
        { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2670&auto=format&fit=crop", alt: "Offering" },
        { src: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2670&auto=format&fit=crop", alt: "Jungle Mist" }
      ]
    },
    { 
      type: 'paragraph', 
      text: "When the sun rises the following day, the silence breaks gently. The world feels new, washed clean of its static. We return to our lives not just rested, but reset. In a modern era defined by constant connectivity, the act of disconnecting is perhaps the ultimate rebellion." 
    }
  ]
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="bg-rice-paper min-h-screen relative">
      
      {/* 1. Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-deep-jungle z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* 2. Article Hero */}
      <ArticleHero data={articleData} />

      {/* 3. Editorial Content */}
      <article className="px-6 md:px-12 py-24 md:py-32">
         {articleData.content.map((block, index) => (
            <ContentBlock key={index} block={block} index={index} />
         ))}
      </article>

      {/* 4. Next Post Navigation */}
      <NextPost />

      {/* Footer */}
      <Finale />

    </main>
  );
}

// --- Components ---

const ArticleHero = ({ data }: { data: typeof articleData }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    
    // Parallax effect for the image
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <header ref={ref} className="relative w-full h-[85vh] flex flex-col justify-end">
            
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-deep-jungle">
                <motion.div style={{ y, opacity }} className="w-full h-full">
                    <img 
                        src={data.heroImage} 
                        alt={data.title} 
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-jungle/60 via-transparent to-transparent opacity-60" />
                </motion.div>
            </div>

            {/* Overlapping Title Area */}
            {/* We position relative z-10 so it sits on top. 
                Negative margin-bottom pulls the next section underneath if needed, 
                but here we want the title to visually breach the fold. 
            */}
            <div className="relative z-10 w-full max-w-[90vw] mx-auto translate-y-16 md:translate-y-24 mix-blend-normal">
                 <div className="flex flex-col gap-6">
                    {/* Meta */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex items-center gap-4 font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-rice-paper/90"
                    >
                        <span>{data.meta.category}</span>
                        <span className="w-8 h-[1px] bg-rice-paper/50" />
                        <span>{data.meta.date}</span>
                        <span className="w-8 h-[1px] bg-rice-paper/50" />
                        <span>{data.meta.readTime}</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1 
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif text-[10vw] md:text-[7vw] leading-[0.9] text-rice-paper tracking-tighter"
                    >
                        {data.title}
                    </motion.h1>
                 </div>
            </div>
        </header>
    );
};

const ContentBlock = ({ block, index }: { block: any, index: number }) => {
    
    // Common Animation Props
    const variants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    switch (block.type) {
        case 'paragraph':
            return (
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={variants}
                    className="max-w-3xl mx-auto mb-12"
                >
                    <p className={`
                        font-sans text-lg md:text-xl leading-[1.8] text-deep-jungle/80
                        ${index === 0 ? 'first-letter:float-left first-letter:text-7xl md:first-letter:text-8xl first-letter:font-serif first-letter:text-deep-jungle first-letter:mr-4 first-letter:mt-[-8px] first-letter:leading-none' : ''}
                    `}>
                        {block.text}
                    </p>
                </motion.div>
            );
        
        case 'quote':
            return (
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={variants}
                    className="max-w-4xl mx-auto my-24 text-center relative"
                >
                    <div className="w-[1px] h-16 bg-burnished-gold mx-auto mb-8" />
                    <blockquote className="font-serif italic text-3xl md:text-5xl text-deep-jungle leading-tight">
                        "{block.text}"
                    </blockquote>
                    <div className="w-[1px] h-16 bg-burnished-gold mx-auto mt-8" />
                </motion.div>
            );

        case 'image-full':
            return (
                <div className="w-full my-24 relative group">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden"
                    >
                        <ParallaxImage src={block.src} alt={block.caption} speed={-10} />
                    </motion.div>
                    {block.caption && (
                        <p className="font-sans text-xs tracking-[0.2em] uppercase text-deep-jungle/50 mt-4 text-center">
                            {block.caption}
                        </p>
                    )}
                </div>
            );

        case 'image-diagonal':
            return (
                 <div className="max-w-6xl mx-auto my-24 grid grid-cols-2 gap-8 md:gap-24 px-4 md:px-0">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="mt-0"
                    >
                         <img src={block.images[0].src} alt={block.images[0].alt} className="w-full aspect-[3/4] object-cover" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 50 }} // Stays offset
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="md:mt-24"
                    >
                         <img src={block.images[1].src} alt={block.images[1].alt} className="w-full aspect-[3/4] object-cover" />
                    </motion.div>
                 </div>
            );

        default:
            return null;
    }
};

const ParallaxImage = ({ src, alt, speed = 10 }: { src: string, alt: string, speed?: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    // Slight movement inside the container
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div ref={ref} className="w-full h-full relative overflow-hidden">
            <motion.div style={{ y }} className="w-full h-[120%] relative -top-[10%]">
                <img src={src} alt={alt} className="w-full h-full object-cover" />
            </motion.div>
        </div>
    );
};

const NextPost = () => {
    return (
        <section className="w-full bg-deep-jungle py-32 px-6 flex items-center justify-center text-center relative overflow-hidden group cursor-pointer">
             <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                <img 
                    src="https://images.unsplash.com/photo-1596401057633-565652ca65a0?q=80&w=2664&auto=format&fit=crop" 
                    className="w-full h-full object-cover"
                />
             </div>
             <div className="relative z-10 text-rice-paper">
                <p className="font-sans text-xs tracking-[0.3em] uppercase mb-6 opacity-70">Read Next</p>
                <h2 className="font-serif text-4xl md:text-6xl italic group-hover:scale-105 transition-transform duration-700 ease-out">
                    Architecture of Bamboo
                </h2>
                <div className="w-12 h-[1px] bg-rice-paper mx-auto mt-8 group-hover:w-24 transition-all duration-500" />
             </div>
        </section>
    );
};