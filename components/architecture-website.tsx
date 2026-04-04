'use client';

import { CustomCursor } from '@/components/custom-cursor';
import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { SelectedWorks } from '@/components/selected-works';
import { ArtValues } from '@/components/art-values';
import { Studio } from '@/components/studio';
import { Footer } from '@/components/footer';

export const ArchitectureWebsite = () => {
  return (
    <div className="font-sans bg-canvas text-stone-900 min-h-screen w-full selection:bg-stone-200 selection:text-stone-900 overflow-x-hidden">
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <SelectedWorks />
        <ArtValues />
        <Studio />
      </main>
      <Footer />
    </div>
  );
};
