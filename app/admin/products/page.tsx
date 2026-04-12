import { getProducts } from '@/lib/content';
import { ProductListClient } from './ProductListClient';

export default function ProductsAdminPage() {
  const products = getProducts();
  return (
    <div className="p-10">
      <div className="flex justify-between items-start mb-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Catálogo</p>
          <h1 className="text-3xl font-light tracking-tighter">Productos</h1>
        </div>
        <a
          href="/admin/products/new"
          className="px-5 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest hover:bg-stone-700 transition-colors"
        >
          + Nueva pieza
        </a>
      </div>
      <ProductListClient initialProducts={products} />
    </div>
  );
}
