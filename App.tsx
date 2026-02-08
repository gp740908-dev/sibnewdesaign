import React from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { ManifestoSection } from './components/ManifestoSection';
import { VillaShowcase } from './components/VillaShowcase';
import { DetailsGrid } from './components/DetailsGrid';
import { SensoryBreak } from './components/SensoryBreak';
import { Services } from './components/Services';
import { JournalSection } from './components/JournalSection';
import { SocialProof } from './components/SocialProof';
import { Finale } from './components/Finale';

const App: React.FC = () => {
  return (
    <Layout>
      <main className="w-full relative z-10">
        <Hero />
        <ManifestoSection />
        <VillaShowcase />
        <DetailsGrid />
        <SensoryBreak />
        <Services />
        <JournalSection />
        <SocialProof />
        <Finale />
      </main>
    </Layout>
  );
};

export default App;