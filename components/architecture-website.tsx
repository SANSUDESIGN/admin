'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, ArrowDown, ArrowUpRight, Instagram, Mail, ShoppingBag, Leaf, Heart, User } from 'lucide-react';

// --- Types & Data ---

type Product = {
  id: number;
  title: string;
  medium: string;
  year: string;
  category: string;
  image: string;
  dimensions: string;
  price: string;
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Forma I",
    medium: "Terracotta",
    year: "2024",
    category: "Sculpture",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2400&auto=format&fit=crop",
    dimensions: "32 × 18 × 18 cm",
    price: "ARS 85.000",
  },
  {
    id: 2,
    title: "Tierra Viva",
    medium: "Stoneware & natural pigments",
    year: "2024",
    category: "Sculpture",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2400&auto=format&fit=crop",
    dimensions: "45 × 22 × 22 cm",
    price: "ARS 110.000",
  },
  {
    id: 3,
    title: "Quietud",
    medium: "Hand-coiled clay",
    year: "2024",
    category: "Interior Detail",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2400&auto=format&fit=crop",
    dimensions: "28 × 28 × 12 cm",
    price: "ARS 72.000",
  },
  {
    id: 4,
    title: "Raíz",
    medium: "Raku-fired ceramic",
    year: "2023",
    category: "Sculpture",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2400&auto=format&fit=crop",
    dimensions: "60 × 20 × 20 cm",
    price: "ARS 145.000",
  },
  {
    id: 5,
    title: "Origen",
    medium: "Stoneware",
    year: "2023",
    category: "Interior Detail",
    image: "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?q=80&w=2400&auto=format&fit=crop",
    dimensions: "20 × 20 × 30 cm",
    price: "ARS 68.000",
  },
  {
    id: 6,
    title: "Flujo",
    medium: "Earthenware & oxide",
    year: "2023",
    category: "Sculpture",
    image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2400&auto=format&fit=crop",
    dimensions: "50 × 25 × 25 cm",
    price: "ARS 125.000",
  },
];

// --- Helper Components ---

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["Home", "Sculptures", "Interior Details", "About Me", "Studio", "Projects", "Contact"];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white px-6 py-5 flex justify-between items-center pointer-events-none">
        <button onClick={() => setIsOpen(true)} className="pointer-events-auto group flex items-center gap-2">
          <Menu size={24} strokeWidth={1.5} />
        </button>

        <span className="font-bold text-lg tracking-tighter uppercase pointer-events-auto">
          SANSU/ ART
        </span>

        <a href="#cart" className="pointer-events-auto group flex items-center gap-2">
          <ShoppingBag size={22} strokeWidth={1.5} />
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
              <span className="font-bold text-lg tracking-tighter uppercase">SANSU/ ART</span>
              <button onClick={() => setIsOpen(false)} className="group flex items-center gap-2 hover:text-stone-400 transition-colors">
                <span className="text-xs uppercase tracking-widest hidden md:block">Close</span>
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 md:px-24 lg:px-40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto">
                <ul className="flex flex-col gap-4">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                    >
                      <a
                        href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl md:text-6xl font-light tracking-tighter hover:ml-4 transition-all duration-300 block group"
                      >
                        {item}
                        <span className="text-base ml-2 opacity-0 group-hover:opacity-100 align-top text-stone-500 transition-opacity">
                          0{i + 1}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <div className="hidden md:flex flex-col justify-end pb-4 text-stone-400">
                  <p className="text-sm max-w-xs leading-relaxed">
                    Organic sculptures and interior details, made by hand — one piece at a time.
                  </p>
                  <div className="mt-8 text-xs uppercase tracking-widest">
                    <p className="text-white mb-2">Contact</p>
                    <a href="mailto:hello@sansuart.com" className="hover:text-white transition-colors">
                      hello@sansuart.com
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

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-100 flex items-center justify-center border-b border-stone-200">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-20"></div>
      </motion.div>

      <div className="z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-end pb-24">
        <motion.div style={{ opacity }} className="lg:col-span-8">
          <h1 className="text-[12vw] leading-[0.85] font-medium tracking-tighter text-stone-900 uppercase mix-blend-overlay">
            Art <br /> Made <br /> <span className="italic font-serif font-light">by hand</span>
          </h1>
        </motion.div>

        <motion.div style={{ opacity }} className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
          <p className="text-sm md:text-base max-w-xs leading-relaxed text-stone-500 text-left lg:text-right mb-12">
            Organic sculptures and interior details. Each piece is made with care, by a single creator.
          </p>
          <a
            href="#selected-works"
            className="group flex items-center gap-4 text-xs uppercase tracking-widest border border-stone-900 px-6 py-3 hover:bg-stone-900 hover:text-white transition-colors duration-300"
          >
            Explore Works
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const SelectedWorks = () => {
  return (
    <section id="selected-works" className="py-32 bg-canvas text-stone-900">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-20 border-b border-stone-200 pb-6">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase">Selected Works</h2>
          <span className="text-xs tracking-widest hidden md:block">Recent uploads</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-24">
          {PRODUCTS.map((product, index) => (
            <div key={product.id} className={`group flex flex-col cursor-pointer ${index % 2 === 1 ? 'md:mt-32' : ''}`}>
              <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-stone-100">
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500 z-10"></div>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white text-stone-900 text-xs uppercase tracking-widest px-4 py-2">
                    {product.price}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-start border-t border-stone-200 pt-4">
                <div>
                  <h3 className="text-2xl font-medium tracking-tight mb-1">{product.title}</h3>
                  <p className="text-sm text-stone-400">{product.medium}</p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-sm">{product.year}</p>
                  <p className="text-sm text-stone-400">{product.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 flex justify-center">
          <button className="group flex items-center gap-3 text-sm uppercase tracking-widest hover:text-stone-400 transition-colors">
            All Works
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

const ArtValues = () => {
  const values = [
    {
      icon: <Leaf size={28} strokeWidth={1.5} />,
      title: "Organic",
      description: "Shapes drawn from nature — imperfect, alive, and grounded in the earth.",
    },
    {
      icon: <Heart size={28} strokeWidth={1.5} />,
      title: "Made with care",
      description: "Every piece is handbuilt from start to finish, with full attention at each step.",
    },
    {
      icon: <User size={28} strokeWidth={1.5} />,
      title: "One creator",
      description: "No factory, no team. A single pair of hands behind each work.",
    },
  ];

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

const Studio = () => {
  return (
    <section id="studio" className="py-32 bg-canvas text-stone-900 border-t border-stone-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-8 sticky top-32">About</h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-12">
              Art that begins in the hands and ends in your space.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed text-stone-500">
              <p>
                Sansu is the work of a single artist. Each sculpture and interior detail is handbuilt using organic forms inspired by the natural world — clay, texture, weight, and silence.
              </p>
              <p>
                The studio moves with its creator. Work happens across countries, in different light, with different soil underfoot. That restlessness shapes every piece — art made on the move, rooted in craft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-night text-white pt-32 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-medium tracking-tight">Let's talk about art.</h3>
            <a
              href="mailto:hello@sansuart.com"
              className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors text-lg"
            >
              <Mail size={20} />
              hello@sansuart.com
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-2">Studio</h4>
            <p className="text-sm leading-relaxed text-stone-300">
              The world is my studio.<br />
              I travel constantly and work from wherever I am — Buenos Aires, a mountain town, a borrowed kitchen table. The art ships from wherever the clay is.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-2">Social</h4>
            <a href="https://www.instagram.com/sansuart" className="flex items-center gap-2 text-sm text-stone-300 hover:text-white transition-colors">
              <Instagram size={16} /> @sansuart
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end border-t border-stone-700 pt-8">
          <div className="mb-8 md:mb-0">
            <h1 className="text-[15vw] md:text-[12vw] leading-[0.8] font-bold tracking-tighter text-stone-800 uppercase select-none pointer-events-none">
              Sansu
            </h1>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-8 text-xs text-stone-500 uppercase tracking-widest">
              <a href="#privacy" className="hover:text-white transition-colors">Política de privacidad</a>
              <span>© 2024 Sansu Art</span>
            </div>
            <p className="text-xs text-stone-600 max-w-xs text-right leading-relaxed">
              Conforme a la Ley 25.326 de Protección de Datos Personales (Argentina). Tus datos nunca son compartidos con terceros.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    const handleLinkHover = () => setIsHoveringLink(true);
    const handleLinkLeave = () => setIsHoveringLink(false);
    window.addEventListener('mousemove', moveCursor);
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);
  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-4 h-4 bg-stone-900 rounded-none pointer-events-none z-[100] mix-blend-difference transition-[width,height,opacity] duration-300 -translate-x-1/2 -translate-y-1/2 hidden md:block
        ${isHoveringLink ? 'w-8 h-8 opacity-50' : 'opacity-100'}
      `}
    />
  );
};

// @component: ArchitectureWebsite
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
