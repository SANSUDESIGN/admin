'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import type { HeroContent } from '@/lib/types';

export const Hero = ({ content }: { content: HeroContent }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden bg-stone-100 flex items-center justify-center border-b border-stone-200">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 scale-125">
        <div
          className="w-full h-full bg-cover bg-center grayscale opacity-40"
          style={{ backgroundImage: `url(${content.imageUrl})` }}
        />
      </motion.div>

      <div className="z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-end pb-24">
        <motion.div style={{ opacity }} className="lg:col-span-8">
          <h1 className="text-[12vw] leading-[0.85] font-medium tracking-tighter text-stone-900 uppercase mix-blend-overlay">
            {content.headingLine1} <br /> {content.headingLine2} <br />{' '}
            <span className="italic font-serif font-light">{content.headingLine3}</span>
          </h1>
        </motion.div>

        <motion.div style={{ opacity }} className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
          <p className="text-sm md:text-base max-w-xs leading-relaxed text-stone-500 text-left lg:text-right mb-12">
            {content.subtitle}
          </p>
          <a
            href="#seleccion-de-obras"
            className="group flex items-center gap-4 text-xs uppercase tracking-widest border border-stone-900 px-6 py-3 hover:bg-stone-900 hover:text-white transition-colors duration-300"
          >
            {content.ctaText}
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
