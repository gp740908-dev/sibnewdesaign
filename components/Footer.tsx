import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-jungle text-rice-paper pt-32 pb-8 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
        <div className="flex flex-col gap-6 font-sans text-sm tracking-widest uppercase opacity-70">
          <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
          <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
        </div>

        <div className="flex flex-col gap-2 text-right">
           <h4 className="font-serif italic text-2xl mb-4">Newsletter</h4>
           <div className="flex border-b border-rice-paper/20 pb-2">
             <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none outline-none placeholder:text-rice-paper/30 w-64 font-sans"
             />
             <button className="uppercase text-xs tracking-widest hover:text-burnished-gold transition-colors">Submit</button>
           </div>
        </div>
      </div>

      <div className="relative border-t border-rice-paper/10 pt-4 flex justify-between text-[10px] uppercase tracking-widest opacity-40 font-sans">
        <span>© 2024 StayinUBUD</span>
        <span>Privacy Policy</span>
      </div>

      <div className="w-full mt-12">
        <h1 className="text-[14vw] leading-[0.8] font-serif text-center text-rice-paper opacity-90 tracking-tighter mix-blend-overlay">
          STAYIN <span className="italic">UBUD</span>
        </h1>
      </div>
    </footer>
  );
};