import Link from 'next/link';
import type { Product } from '@/lib/types';
import { toSlug } from '@/lib/data';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <Link
      href={`/productos/${toSlug(product.title)}`}
      className={`group flex flex-col ${index % 2 === 1 ? 'md:mt-32' : ''}`}
    >
      <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-stone-100">
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500 z-10" />
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
        />
      </div>

      <div className="flex justify-between items-start border-t border-stone-200 pt-4 mb-3">
        <div>
          <h3 className="text-2xl font-medium tracking-tight mb-1">{product.title}</h3>
          <p className="text-sm text-stone-400">{product.medium}</p>
          <p className="text-sm text-stone-400 mt-0.5">{product.dimensions}</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm">{product.year}</p>
          <p className="text-sm text-stone-400">{product.category}</p>
        </div>
      </div>

      <p className="text-base font-medium tracking-tight">{product.price}</p>
    </Link>
  );
};
