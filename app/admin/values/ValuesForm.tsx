'use client';

import { useState } from 'react';
import type { ValuesContent, ValuesItem } from '@/lib/types';
import { Field, Textarea, SaveButton } from '@/components/admin/FormControls';

const iconOptions = ['fingerprint', 'heart', 'user'];

export function ValuesForm({ defaultValues }: { defaultValues: ValuesContent }) {
  const [items, setItems] = useState(defaultValues.items);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  function updateItem(i: number, key: keyof ValuesItem, value: string) {
    setItems((prev) => prev.map((item, idx) => idx === i ? { ...item, [key]: value } : item));
  }

  async function handleSave() {
    setStatus('saving');
    const res = await fetch('/api/admin/values', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    setStatus(res.ok ? 'saved' : 'error');
    setTimeout(() => setStatus('idle'), 3000);
  }

  return (
    <div className="flex flex-col gap-10">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-4 border border-stone-200 p-5 bg-white">
          <p className="text-[10px] uppercase tracking-widest text-stone-400">Tarjeta {i + 1}</p>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-stone-400">Ícono</label>
            <select
              value={item.icon}
              onChange={(e) => updateItem(i, 'icon', e.target.value)}
              className="border border-stone-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-stone-900 transition-colors"
            >
              {iconOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <Field label="Título" value={item.title} onChange={(v) => updateItem(i, 'title', v)} />
          <Textarea label="Descripción" value={item.description} onChange={(v) => updateItem(i, 'description', v)} rows={3} />
        </div>
      ))}
      <SaveButton status={status} onSave={handleSave} />
    </div>
  );
}
