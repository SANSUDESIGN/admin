import { Instagram } from 'lucide-react';
import type { WorksContent, Product } from '@/lib/types';
import { ProductCard } from '@/components/product-card';

interface Props {
  content: WorksContent;
  products: Product[];
}

export const SelectedWorks = ({ content, products }: Props) => {
  return (
    <section id="seleccion-de-obras" className="py-32 bg-canvas text-stone-900">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-20 border-b border-stone-200 pb-6">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase">{content.title}</h2>
          <span className="text-xs tracking-widest hidden md:block">{content.subtitle}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-24">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-32 flex justify-center">
          <a
            href={content.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-sm uppercase tracking-widest hover:text-stone-400 transition-colors"
          >
            {content.instagramCta}
            <Instagram size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
