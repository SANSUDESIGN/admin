'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product, ProductsData } from '@/lib/types';
import { Field, Textarea, SaveButton } from './FormControls';

interface Props {
  product: Product;
  allProducts: Product[];
  isNew?: boolean;
}

export function ProductForm({ product: initial, allProducts, isNew = false }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [newImageUrl, setNewImageUrl] = useState('');

  function set(key: keyof Product, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function removeImage(i: number) {
    setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));
  }

  function addImage() {
    if (!newImageUrl.trim()) return;
    setForm((f) => ({ ...f, images: [...f.images, newImageUrl.trim()] }));
    setNewImageUrl('');
  }

  async function handleSave() {
    setStatus('saving');
    const updated: ProductsData = isNew
      ? { products: [...allProducts, form] }
      : { products: allProducts.map((p) => (p.id === form.id ? form : p)) };

    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      setStatus('saved');
      setTimeout(() => {
        router.push('/admin/products');
        router.refresh();
      }, 800);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Título" value={form.title} onChange={(v) => set('title', v)} />
        <Field label="Material (medium)" value={form.medium} onChange={(v) => set('medium', v)} />
        <Field label="Año" value={form.year} onChange={(v) => set('year', v)} />
        <Field label="Categoría" value={form.category} onChange={(v) => set('category', v)} />
        <Field label="Precio (ej. ARS 85.000)" value={form.price} onChange={(v) => set('price', v)} />
        <Field label="Dimensiones (ej. 32 × 18 × 18 cm)" value={form.dimensions} onChange={(v) => set('dimensions', v)} />
      </div>

      <Textarea label="Descripción" value={form.description} onChange={(v) => set('description', v)} rows={4} />

      {/* Sections */}
      <div className="flex flex-col gap-4 border-t border-stone-100 pt-6">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">Secciones del producto</p>
        <Textarea label="Cuidado de la pieza" value={form.cuidado ?? ''} onChange={(v) => set('cuidado', v)} rows={3} />
        <Textarea label="Encargos" value={form.encargos ?? ''} onChange={(v) => set('encargos', v)} rows={3} />
        <Textarea label="Envío" value={form.envio ?? ''} onChange={(v) => set('envio', v)} rows={3} />
      </div>

      {/* Images */}
      <div className="flex flex-col gap-3">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">Imágenes</p>
        {form.images.map((url, i) => (
          <div key={i} className="flex items-center gap-3">
            <img src={url} alt="" className="w-16 h-16 object-cover bg-stone-100 shrink-0" />
            <p className="text-xs font-mono text-stone-500 flex-1 break-all">{url}</p>
            <button
              onClick={() => removeImage(i)}
              className="text-xs uppercase tracking-widest text-stone-300 hover:text-red-600 transition-colors shrink-0"
            >
              Quitar
            </button>
          </div>
        ))}
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Pegar URL de imagen..."
            className="flex-1 border border-stone-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-stone-900 transition-colors"
            onKeyDown={(e) => e.key === 'Enter' && addImage()}
          />
          <button
            onClick={addImage}
            className="px-4 py-2 border border-stone-300 text-xs uppercase tracking-widest hover:border-stone-900 transition-colors"
          >
            Añadir
          </button>
        </div>
        <a
          href="/admin/upload"
          target="_blank"
          className="text-xs text-stone-400 hover:text-stone-700 underline underline-offset-4"
        >
          Subir imagen al CDN →
        </a>
      </div>

      {/* Visibility */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.hidden}
          onChange={(e) => set('hidden', e.target.checked)}
          className="w-4 h-4 accent-stone-900"
        />
        <span className="text-sm text-stone-600">Ocultar esta pieza en el sitio</span>
      </label>

      <SaveButton status={status} onSave={handleSave} />
    </div>
  );
}
