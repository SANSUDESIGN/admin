import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/content';
import { ProductForm } from '@/components/admin/ProductForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const allProducts = await getProducts();
  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) notFound();

  return (
    <div className="p-10">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Editando pieza</p>
      <h1 className="text-3xl font-light tracking-tighter mb-10">{product.title}</h1>
      <ProductForm product={product} allProducts={allProducts} />
    </div>
  );
}
