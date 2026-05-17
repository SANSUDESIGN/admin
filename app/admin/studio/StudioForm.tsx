'use client';

import { useState } from 'react';
import type { StudioContent } from '@/lib/types';
import { Field, Textarea, SaveButton } from '@/components/admin/FormControls';

export function StudioForm({ defaultValues }: { defaultValues: StudioContent }) {
  const [form, setForm] = useState(defaultValues);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  function set(key: keyof StudioContent, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setColumn(col: 'column1' | 'column2', i: number, value: string) {
    setForm((f) => ({
      ...f,
      [col]: f[col].map((p, idx) => idx === i ? value : p),
    }));
  }

  async function handleSave() {
    setStatus('saving');
    const res = await fetch('/api/admin/studio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? 'saved' : 'error');
    setTimeout(() => setStatus('idle'), 3000);
  }

  return (
    <div className="flex flex-col gap-6">
      <Field label="Etiqueta (ej. Sobre mí)" value={form.label} onChange={(v) => set('label', v)} />
      <Textarea label="Párrafo principal (grande)" value={form.leadParagraph} onChange={(v) => set('leadParagraph', v)} rows={3} />
      <Textarea label="Párrafo secundario" value={form.subParagraph} onChange={(v) => set('subParagraph', v)} rows={3} />

      <div>
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-3">Columna izquierda</p>
        <div className="flex flex-col gap-4">
          {form.column1.map((p, i) => (
            <Textarea key={i} label={`Párrafo ${i + 1}`} value={p} onChange={(v) => setColumn('column1', i, v)} rows={4} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-3">Columna derecha</p>
        <div className="flex flex-col gap-4">
          {form.column2.map((p, i) => (
            <Textarea key={i} label={`Párrafo ${i + 1}`} value={p} onChange={(v) => setColumn('column2', i, v)} rows={4} />
          ))}
        </div>
      </div>

      <Textarea label="Tagline (cursiva al final)" value={form.tagline} onChange={(v) => set('tagline', v)} rows={2} />
      <Field label="Foto de la artista (URL)" value={form.photoUrl ?? ''} onChange={(v) => set('photoUrl', v)} />
      <SaveButton status={status} onSave={handleSave} />
    </div>
  );
}
