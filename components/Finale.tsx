'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion as m, useScroll, useTransform } from 'framer-motion';

const motion = m as any;

export const Finale: React.FC = () => {
  return (
    <div className="relative w-full bg-deep-jungle text-rice-paper z-20">
      <GrandCTA />
      <OversizedFooter />
    </div>
  );
};

const GrandCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center border-b border-rice-paper/5">
        {/* Background Image with Parallax */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
             <img
                src="https://images.unsplash.com/photo-1536152470836-b943b246224c?q=80&w=2676&auto=format&fit=crop"
                alt="Ubud Jungle Dusk"
                className="w-full h-[120%] object-cover opacity-30 grayscale-[40%]"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-deep-jungle/0 via-deep-jungle/20 to-deep-jungle/80" />
        </motion.div>

        {/* Content */}
        <motion.div style={{ y }} className="relative z-10 text-center flex flex-col items-center gap-10 px-6">
            <h2 className="font-serif italic text-6xl md:text-8xl lg:text-9xl text-rice-paper/90 tracking-tight drop-shadow-2xl">
                Ready to Awaken?
            </h2>
            
            <a href="#" className="group relative px-10 py-5 overflow-hidden border border-rice-paper/30 rounded-full transition-all duration-500 hover:border-rice-paper hover:px-12">
                <span className="relative z-10 font-sans text-xs tracking-[0.25em] uppercase text-rice-paper group-hover:text-deep-jungle transition-colors duration-500 font-medium">
                    Inquire Availability
                </span>
                <div className="absolute inset-0 bg-rice-paper transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[0.22, 1, 0.36, 1]" />
            </a>
        </motion.div>
    </section>
  );
};

// Updated Link Structure for Next.js Routing
const links = {
    nav: [
        { label: "Home", href: "/" },
        { label: "Villas", href: "/villas" },
        { label: "Experiences", href: "#" },
        { label: "Journal", href: "#" }
    ],
    social: [
        { label: "Instagram", href: "#" },
        { label: "Pinterest", href: "#" },
        { label: "YouTube", href: "#" }
    ],
    contact: [
        { label: "WhatsApp", href: "#" },
        { label: "Email", href: "#" },
        { label: "Location", href: "#" }
    ],
    legal: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "© 2024", href: "#" }
    ]
};

const OversizedFooter: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const yText = useTransform(scrollYProgress, [0.5, 1], [100, 0]);

    return (
        <footer ref={containerRef} className="relative w-full pt-24 md:pt-32 pb-12 px-6 md:px-12 overflow-hidden">
            {/* 4-Column Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-32">
                
                {/* Navigation */}
                <div className="flex flex-col gap-6">
                    <h4 className="font-serif italic text-xl text-rice-paper/40 mb-2">Explore</h4>
                    {links.nav.map((link) => (
                        <FooterLink key={link.label} label={link.label} href={link.href} />
                    ))}
                </div>

                {/* Socials */}
                <div className="flex flex-col gap-6">
                    <h4 className="font-serif italic text-xl text-rice-paper/40 mb-2">Follow</h4>
                    {links.social.map((link) => (
                        <FooterLink key={link.label} label={link.label} href={link.href} />
                    ))}
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-6">
                    <h4 className="font-serif italic text-xl text-rice-paper/40 mb-2">Connect</h4>
                    {links.contact.map((link) => (
                        <FooterLink key={link.label} label={link.label} href={link.href} />
                    ))}
                </div>

                 {/* Legal */}
                 <div className="flex flex-col gap-6 lg:items-end lg:text-right">
                    <h4 className="font-serif italic text-xl text-rice-paper/40 mb-2">Legal</h4>
                    {links.legal.map((link) => (
                        <div key={link.label} className="font-sans text-xs tracking-[0.2em] uppercase text-rice-paper/60">
                            {link.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Massive Brand Statement */}
            <div className="w-full border-t border-rice-paper/10 pt-8 md:pt-16 overflow-hidden">
                <motion.h1 
                    style={{ y: yText }}
                    className="font-serif text-[15vw] leading-[0.75] tracking-tighter text-center text-rice-paper/90 mix-blend-overlay"
                >
                    STAYIN UBUD
                </motion.h1>
            </div>
        </footer>
    );
};

const FooterLink: React.FC<{ label: string, href: string }> = ({ label, href }) => {
    return (
        <Link href={href} className="group w-fit flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-burnished-gold scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-rice-paper/80 group-hover:text-rice-paper group-hover:translate-x-1 transition-all duration-300">
                {label}
            </span>
        </Link>
    );
};