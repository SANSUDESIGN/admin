'use client';

import { CustomCursor } from '@/components/custom-cursor';
import { Hero } from '@/components/hero';
import { SelectedWorks } from '@/components/selected-works';
import { ArtValues } from '@/components/art-values';
import { Studio } from '@/components/studio';
import { FAQ } from '@/components/faq';

export const ArchitectureWebsite = () => {
  return (
    <div className="font-sans bg-canvas text-stone-900 min-h-screen w-full selection:bg-stone-200 selection:text-stone-900 overflow-x-hidden">
      <CustomCursor />
      <main>
        <Hero />
        <SelectedWorks />
        <ArtValues />
        <Studio />
        <FAQ />
      </main>
    </div>
  );
};
