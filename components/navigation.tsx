'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Esculturas", href: "#seleccion-de-obras" },
  { label: "Detalles de interior", href: "#seleccion-de-obras" },
  { label: "Sobre mí", href: "#estudio" },
  { label: "Proyectos", href: "#seleccion-de-obras" },
  { label: "Preguntas", href: "#preguntas" },
  { label: "Contacto", href: "#contacto" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white px-6 py-5 flex justify-between items-center pointer-events-none">
        <button onClick={() => setIsOpen(true)} className="pointer-events-auto group flex items-center gap-2">
          <Menu size={24} strokeWidth={1.5} />
        </button>

        <a href="/" className="font-bold text-lg tracking-tighter uppercase pointer-events-auto">
          SANSU/ DESIGN
        </a>

        <a
          href="https://wa.me/5491126201691"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto"
          aria-label="Contactar por WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </a>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-night z-[60] text-white flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-5">
              <span className="font-bold text-lg tracking-tighter uppercase">SANSU/ DESIGN</span>
              <button onClick={() => setIsOpen(false)} className="group flex items-center gap-2 hover:text-stone-400 transition-colors">
                <span className="text-xs uppercase tracking-widest hidden md:block">Cerrar</span>
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 md:px-24 lg:px-40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto">
                <ul className="flex flex-col gap-4">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl md:text-6xl font-light tracking-tighter hover:ml-4 transition-all duration-300 block group"
                      >
                        {item.label}
                        <span className="text-base ml-2 opacity-0 group-hover:opacity-100 align-top text-stone-500 transition-opacity">
                          0{i + 1}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <div className="hidden md:flex flex-col justify-end pb-4 text-stone-400">
                  <p className="text-sm max-w-xs leading-relaxed">
                    Esculturas orgánicas y detalles de interior, hechos a mano — una pieza a la vez.
                  </p>
                  <div className="mt-8 text-xs uppercase tracking-widest">
                    <p className="text-white mb-2">Contacto</p>
                    <a href="mailto:hello@sansu.design" className="hover:text-white transition-colors">
                      hello@sansu.design
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
