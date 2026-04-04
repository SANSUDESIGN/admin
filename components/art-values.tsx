'use client';

import { motion } from 'framer-motion';
import { Leaf, Heart, User } from 'lucide-react';

const values = [
  {
    icon: <Leaf size={28} strokeWidth={1.5} />,
    title: "Orgánico",
    description: "Formas tomadas de la naturaleza — imperfectas, vivas, enraizadas en la tierra.",
  },
  {
    icon: <Heart size={28} strokeWidth={1.5} />,
    title: "Hecho con cuidado",
    description: "Cada pieza se construye a mano de principio a fin, con atención plena en cada etapa.",
  },
  {
    icon: <User size={28} strokeWidth={1.5} />,
    title: "Un solo creador",
    description: "Sin fábrica, sin equipo. Un par de manos detrás de cada obra.",
  },
];

export const ArtValues = () => {
  return (
    <section className="py-24 bg-stone-100 text-stone-900 border-t border-stone-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <div className="text-stone-700">{v.icon}</div>
              <h3 className="text-lg font-medium tracking-tight">{v.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
