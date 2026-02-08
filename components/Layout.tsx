'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Navbar } from './Navbar';
import { TransitionLayout } from './TransitionLayout';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with "Luxury/Heavy" physics
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
        <Navbar />
        <TransitionLayout>
            <div className="font-sans antialiased text-deep-jungle bg-rice-paper">
                {children}
            </div>
        </TransitionLayout>
    </>
  );
};