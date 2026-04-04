import { Instagram } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { ProductCard } from '@/components/product-card';

export const SelectedWorks = () => {
  return (
    <section id="seleccion-de-obras" className="py-32 bg-canvas text-stone-900">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-20 border-b border-stone-200 pb-6">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase">Selección de obras</h2>
          <span className="text-xs tracking-widest hidden md:block">Últimas piezas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-24">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-32 flex justify-center">
          <a
            href="https://www.instagram.com/sansuart"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-sm uppercase tracking-widest hover:text-stone-400 transition-colors"
          >
            Ver todo
            <Instagram size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
