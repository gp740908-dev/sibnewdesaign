import React, { useRef } from 'react';
import { motion as m, useScroll, useTransform } from 'framer-motion';

const motion = m as any;

const villas = [
  {
    id: 1,
    name: "The Forest House",
    location: "Sayan Ridge",
    img: "https://images.unsplash.com/photo-1600596542815-e32c2159f828?q=80&w=2564&auto=format&fit=crop",
    price: "$850 / Night"
  },
  {
    id: 2,
    name: "Bamboo Cathedral",
    location: "Green Village",
    img: "https://images.unsplash.com/photo-1533503254332-6ba78495048d?q=80&w=2670&auto=format&fit=crop",
    price: "$1,200 / Night"
  },
  {
    id: 3,
    name: "Rice Terrace Estate",
    location: "Tegalalang",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2670&auto=format&fit=crop",
    price: "$950 / Night"
  },
  {
    id: 4,
    name: "Jungle Sanctuary",
    location: "Payangan",
    img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2670&auto=format&fit=crop",
    price: "$1,500 / Night"
  }
];

export const VillasScroll: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-deep-jungle text-rice-paper">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Section Label */}
        <div className="absolute top-10 left-10 z-20">
            <h3 className="text-sm tracking-widest uppercase opacity-70">Curated Collection</h3>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-10 md:px-24">
          {villas.map((villa) => (
            <div 
              key={villa.id} 
              className="relative h-[70vh] w-[80vw] md:w-[60vh] shrink-0 group overflow-hidden"
            >
              <div className="w-full h-full overflow-hidden">
                <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={villa.img} 
                    alt={villa.name} 
                    className="h-full w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs uppercase tracking-widest mb-2 opacity-80">{villa.location}</p>
                        <h3 className="text-3xl md:text-4xl font-serif italic">{villa.name}</h3>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-sans opacity-90">{villa.price}</p>
                    </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* End Card */}
          <div className="h-[70vh] w-[40vw] flex items-center justify-center shrink-0">
            <a href="#" className="group flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full border border-rice-paper/30 flex items-center justify-center group-hover:bg-rice-paper group-hover:text-deep-jungle transition-all duration-500">
                    <span className="text-2xl">→</span>
                </div>
                <span className="text-sm uppercase tracking-widest">View All Villas</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};