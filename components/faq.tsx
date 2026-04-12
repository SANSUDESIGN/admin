'use client';

import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const faqs = [
  {
    question: '¿Las piezas son originales?',
    answer: 'Cada pieza se crea una sola vez. No hago series ni reproducciones. Lo que ves en el sitio es lo que existe — cuando se va, no regresa.',
  },
  {
    question: '¿Haces envíos?',
    answer: 'Sí, envío a todo el país. Si estás en CABA también puedo coordinar la entrega personalmente. Cada pieza se empaca con cuidado para que llegue en perfectas condiciones. El costo de envío se calcula al momento de la compra en MercadoLibre.',
  },
  {
    question: '¿Puedo hacer un encargo personalizado?',
    answer: 'Cada pieza existe una sola vez — si se va, se va. Lo que sí puedo hacer es un encargo personalizado: una pieza nueva, creada especialmente para ti, con los mismos materiales y técnicas. Escríbeme para platicar.',
  },
  {
    question: '¿Qué métodos de pago acepto?',
    answer: 'Acepto todos los métodos de pago disponibles en MercadoLibre: tarjeta de crédito, débito y transferencia bancaria. También puedes escribirme por Instagram o WhatsApp para coordinar directamente.',
  },
  {
    question: '¿Cuánto tarda en llegar?',
    answer: 'Los envíos normalmente se despachan dentro de los 3 días hábiles siguientes al pago. Los tiempos de entrega dependen de tu ubicación y el servicio de mensajería.',
  },
  {
    question: '¿Puedo cancelar o devolver una pieza?',
    answer: 'No acepto cancelaciones, cambios ni devoluciones una vez confirmado el pedido. Si tu pieza llega dañada, escríbeme de inmediato con fotos para resolverlo.',
  },
];

export const FAQ = () => {
  return (
    <section id="preguntas" className="py-32 bg-stone-100 border-t border-stone-200">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-6">Preguntas frecuentes</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-16">
            Todo lo que necesitas saber.
          </h2>

          <div className="max-w-2xl">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
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
