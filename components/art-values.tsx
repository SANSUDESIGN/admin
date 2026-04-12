'use client';

import { motion } from 'framer-motion';
import { Fingerprint, Heart, User } from 'lucide-react';
import type { ValuesContent } from '@/lib/types';

const iconMap: Record<string, React.ReactNode> = {
  fingerprint: <Fingerprint size={28} strokeWidth={1.5} />,
  heart: <Heart size={28} strokeWidth={1.5} />,
  user: <User size={28} strokeWidth={1.5} />,
};

export const ArtValues = ({ content }: { content: ValuesContent }) => {
  return (
    <section className="py-24 bg-stone-100 text-stone-900 border-t border-stone-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {content.items.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <div className="text-stone-700">{iconMap[v.icon]}</div>
              <h3 className="text-lg font-medium tracking-tight">{v.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
