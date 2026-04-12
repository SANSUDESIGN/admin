'use client';

import { useState } from 'react';
import type { FaqContent, FaqItem } from '@/lib/types';
import { Field, Textarea, SaveButton } from '@/components/admin/FormControls';

export function FaqForm({ defaultValues }: { defaultValues: FaqContent }) {
  const [label, setLabel] = useState(defaultValues.label);
  const [title, setTitle] = useState(defaultValues.title);
  const [items, setItems] = useState<FaqItem[]>(defaultValues.items);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  function updateItem(i: number, key: keyof FaqItem, value: string) {
    setItems((prev) => prev.map((item, idx) => idx === i ? { ...item, [key]: value } : item));
  }

  function addItem() {
    setItems((prev) => [...prev, { question: '', answer: '' }]);
  }

  function removeItem(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setStatus('saving');
    const res = await fetch('/api/admin/faq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label, title, items }),
    });
    setStatus(res.ok ? 'saved' : 'error');
    setTimeout(() => setStatus('idle'), 3000);
  }

  return (
    <div className="flex flex-col gap-6">
      <Field label="Etiqueta de sección" value={label} onChange={setLabel} />
      <Field label="Título" value={title} onChange={setTitle} />

      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i} className="border border-stone-200 p-5 bg-white flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="text-[10px] uppercase tracking-widest text-stone-400">Pregunta {i + 1}</p>
              <button
                onClick={() => removeItem(i)}
                className="text-xs text-stone-400 hover:text-red-600 transition-colors uppercase tracking-widest"
              >
                Eliminar
              </button>
            </div>
            <Field label="Pregunta" value={item.question} onChange={(v) => updateItem(i, 'question', v)} />
            <Textarea label="Respuesta" value={item.answer} onChange={(v) => updateItem(i, 'answer', v)} rows={4} />
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="w-fit px-4 py-2 border border-stone-300 text-xs uppercase tracking-widest text-stone-600 hover:border-stone-900 hover:text-stone-900 transition-colors"
      >
        + Añadir pregunta
      </button>

      <SaveButton status={status} onSave={handleSave} />
    </div>
  );
}
