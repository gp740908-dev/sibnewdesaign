'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion as m, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const motion = m as any;

const navLinks = [
  { title: "Home", href: "/", src: "https://images.unsplash.com/photo-1536152470836-b943b246224c?q=80&w=2676&auto=format&fit=crop" },
  { title: "Villas", href: "/villas", src: "https://images.unsplash.com/photo-1600596542815-e32c2159f828?q=80&w=2564&auto=format&fit=crop" },
  { title: "Experiences", href: "#", src: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2688&auto=format&fit=crop" },
  { title: "Journal", href: "#", src: "https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=2669&auto=format&fit=crop" },
  { title: "Contact", href: "#", src: "https://images.unsplash.com/photo-1596401057633-565652ca65a0?q=80&w=2664&auto=format&fit=crop" }
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        // Increased delay to 4.2s to wait for the TransitionLayout animation to finish
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 4.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 ${
          isScrolled && !isMenuOpen 
            ? 'bg-rice-paper/80 backdrop-blur-md text-deep-jungle border-b border-deep-jungle/5' 
            : 'bg-transparent text-rice-paper mix-blend-difference'
        }`}
      >
        {/* Logo */}
        <div className="z-50 relative">
          <Link href="/" className={`font-serif text-lg tracking-widest font-semibold uppercase transition-colors duration-300 ${isMenuOpen ? 'text-rice-paper' : ''}`}>
            StayinUBUD
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6 z-50">
          <button 
            className={`
                hidden md:block px-6 py-2 rounded-full border text-xs uppercase tracking-[0.2em] transition-all duration-300
                ${isMenuOpen 
                    ? 'border-rice-paper/30 text-rice-paper hover:bg-rice-paper hover:text-deep-jungle' 
                    : isScrolled 
                        ? 'border-deep-jungle/30 text-deep-jungle hover:bg-deep-jungle hover:text-rice-paper'
                        : 'border-rice-paper/50 text-rice-paper hover:bg-rice-paper hover:text-deep-jungle'
                }
            `}
          >
            Book Your Stay
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <span className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${isMenuOpen ? 'text-rice-paper' : ''}`}>
              {isMenuOpen ? 'Close' : 'Menu'}
            </span>
            <div className="flex flex-col gap-[5px] w-6 justify-center">
                <motion.span 
                    animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
                    className={`h-[1px] w-full block transition-colors duration-300 ${isMenuOpen ? 'bg-rice-paper' : (isScrolled ? 'bg-deep-jungle' : 'bg-rice-paper')}`} 
                />
                <motion.span 
                    animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                    className={`h-[1px] w-full block transition-colors duration-300 ${isMenuOpen ? 'bg-rice-paper' : (isScrolled ? 'bg-deep-jungle' : 'bg-rice-paper')}`} 
                />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
            <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="fixed inset-0 bg-deep-jungle z-40 flex flex-col justify-center items-center"
            >
                {/* Background Image Hover Reveal */}
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                    <AnimatePresence mode="wait">
                        {hoveredLink !== null && (
                             <motion.img
                                key={navLinks[hoveredLink].src}
                                src={navLinks[hoveredLink].src}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full object-cover grayscale-[30%]"
                             />
                        )}
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-deep-jungle/60" />
                </div>

                {/* Links */}
                <div className="flex flex-col items-center gap-2 md:gap-6 z-10">
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            onMouseEnter={() => setHoveredLink(index)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className="relative overflow-hidden group p-2"
                        >
                            <Link href={link.href} onClick={() => setIsMenuOpen(false)}>
                                <h2 
                                    className={`
                                        font-serif italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-rice-paper transition-all duration-500
                                        ${hoveredLink !== null && hoveredLink !== index ? 'opacity-30 blur-[2px]' : 'opacity-100'}
                                    `}
                                >
                                    {link.title}
                                </h2>
                            </Link>
                            {/* Strikethrough/Underline Effect */}
                            <span className="absolute left-0 bottom-2 md:bottom-6 w-full h-[1px] bg-rice-paper transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </motion.div>
                    ))}
                </div>

                {/* Footer Info inside Menu */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-8 md:bottom-12 w-full px-6 md:px-12 flex justify-between text-rice-paper/50 font-sans text-[10px] md:text-xs uppercase tracking-widest z-10"
                >
                    <span>Bali, Indonesia</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-rice-paper transition-colors">Instagram</a>
                        <a href="#" className="hover:text-rice-paper transition-colors">Email</a>
                    </div>
                </motion.div>

            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};