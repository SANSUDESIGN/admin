'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';

export function ProductListClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [saving, setSaving] = useState<number | null>(null);

  async function saveProducts(updated: Product[]) {
    await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products: updated }),
    });
  }

  async function toggleHidden(id: number) {
    setSaving(id);
    const updated = products.map((p) =>
      p.id === id ? { ...p, hidden: !p.hidden } : p
    );
    setProducts(updated);
    await saveProducts(updated);
    setSaving(null);
  }

  async function deleteProduct(id: number) {
    if (!confirm('¿Eliminar esta pieza permanentemente?')) return;
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    await saveProducts(updated);
  }

  return (
    <div className="flex flex-col gap-2">
      {products.map((p) => (
        <div
          key={p.id}
          className={`flex items-center gap-4 p-4 bg-white border transition-colors ${p.hidden ? 'border-stone-100 opacity-50' : 'border-stone-200'}`}
        >
          <img
            src={p.images[0]}
            alt={p.title}
            className="w-14 h-14 object-cover bg-stone-100 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{p.title}</p>
            <p className="text-xs text-stone-400">{p.medium} — {p.year} — {p.price}</p>
          </div>
          {p.hidden && (
            <span className="text-[10px] uppercase tracking-widest text-stone-400 border border-stone-200 px-2 py-0.5">
              Oculto
            </span>
          )}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`/admin/products/${p.id}`}
              className="text-xs uppercase tracking-widest text-stone-600 hover:text-stone-900 transition-colors"
            >
              Editar
            </a>
            <button
              onClick={() => toggleHidden(p.id)}
              disabled={saving === p.id}
              className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors disabled:opacity-40"
            >
              {p.hidden ? 'Mostrar' : 'Ocultar'}
            </button>
            <button
              onClick={() => deleteProduct(p.id)}
              className="text-xs uppercase tracking-widest text-stone-300 hover:text-red-600 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      {products.length === 0 && (
        <p className="text-sm text-stone-400 py-8 text-center">No hay productos. Crea la primera pieza.</p>
      )}
    </div>
  );
}
