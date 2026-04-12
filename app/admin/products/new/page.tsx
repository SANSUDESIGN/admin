import { getProducts } from '@/lib/content';
import { ProductForm } from '@/components/admin/ProductForm';
import type { Product } from '@/lib/types';

export default function NewProductPage() {
  const allProducts = getProducts();
  const nextId = allProducts.length > 0 ? Math.max(...allProducts.map((p) => p.id)) + 1 : 1;

  const emptyProduct: Product = {
    id: nextId,
    title: '',
    medium: '',
    year: new Date().getFullYear().toString(),
    category: 'Escultura',
    hidden: false,
    images: [],
    description: '',
    dimensions: '',
    price: '',
    mercadolibreUrl: '#',
  };

  return (
    <div className="p-10">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Nueva pieza</p>
      <h1 className="text-3xl font-light tracking-tighter mb-10">Crear producto</h1>
      <ProductForm product={emptyProduct} allProducts={allProducts} isNew />
    </div>
  );
}
