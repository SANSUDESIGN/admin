'use client';

import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import type { FaqContent } from '@/lib/types';

export const FAQ = ({ content }: { content: FaqContent }) => {
  return (
    <section id="preguntas" className="py-32 bg-stone-100 border-t border-stone-200">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-6">{content.label}</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-16">{content.title}</h2>

          <div className="max-w-2xl">
            <Accordion type="single" collapsible>
              {content.items.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm md:text-base font-medium text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-stone-500 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
