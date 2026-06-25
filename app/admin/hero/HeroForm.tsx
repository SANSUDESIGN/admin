'use client';

import { useState } from 'react';
import type { HeroContent } from '@/lib/types';
import { Field, Textarea, SaveButton } from '@/components/admin/FormControls';

export function HeroForm({ defaultValues }: { defaultValues: HeroContent }) {
  const [form, setForm] = useState(defaultValues);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  function set(key: keyof HeroContent, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    setStatus('saving');
    const res = await fetch('/api/admin/hero', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? 'saved' : 'error');
    setTimeout(() => setStatus('idle'), 3000);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Línea 1" value={form.headingLine1} onChange={(v) => set('headingLine1', v)} />
        <Field label="Línea 2" value={form.headingLine2} onChange={(v) => set('headingLine2', v)} />
        <Field label="Línea 3 (cursiva)" value={form.headingLine3} onChange={(v) => set('headingLine3', v)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-stone-100 pt-6">
        <Field label="Tagline línea 1" value={form.tagline1 ?? ''} onChange={(v) => set('tagline1', v)} placeholder="SOME THINGS AREN'T SEEN." />
        <Field label="Tagline línea 2" value={form.tagline2 ?? ''} onChange={(v) => set('tagline2', v)} placeholder="THEY'RE FELT." />
      </div>
      <Textarea label="Subtítulo" value={form.subtitle} onChange={(v) => set('subtitle', v)} rows={3} />
      <Field label="Texto del botón" value={form.ctaText} onChange={(v) => set('ctaText', v)} />
      <div className="flex flex-col gap-2">
        <Field label="URL de imagen de fondo" value={form.imageUrl} onChange={(v) => set('imageUrl', v)} />
        {form.imageUrl && (
          <img src={form.imageUrl} alt="Preview" className="w-full max-h-48 object-cover bg-stone-100" />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Field
          label="URL de video de fondo (opcional — reemplaza la imagen; la imagen se usa como póster)"
          value={form.videoUrl ?? ''}
          onChange={(v) => set('videoUrl', v)}
        />
        {form.videoUrl && (
          <video
            src={form.videoUrl}
            poster={form.imageUrl || undefined}
            muted
            loop
            autoPlay
            playsInline
            className="w-full max-h-48 object-cover bg-stone-100"
          />
        )}
      </div>
      <SaveButton status={status} onSave={handleSave} />
    </div>
  );
}
