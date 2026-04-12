'use client';

import { useState } from 'react';
import type { WorksContent } from '@/lib/types';
import { Field, SaveButton } from '@/components/admin/FormControls';

export function WorksForm({ defaultValues }: { defaultValues: WorksContent }) {
  const [form, setForm] = useState(defaultValues);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  function set(key: keyof WorksContent, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    setStatus('saving');
    const res = await fetch('/api/admin/works', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? 'saved' : 'error');
    setTimeout(() => setStatus('idle'), 3000);
  }

  return (
    <div className="flex flex-col gap-6">
      <Field label="Título de sección" value={form.title} onChange={(v) => set('title', v)} />
      <Field label="Subtítulo (derecha)" value={form.subtitle} onChange={(v) => set('subtitle', v)} />
      <Field label="Texto del enlace Instagram" value={form.instagramCta} onChange={(v) => set('instagramCta', v)} />
      <Field label="Handle de Instagram" value={form.instagramHandle} onChange={(v) => set('instagramHandle', v)} />
      <Field label="URL de Instagram" value={form.instagramUrl} onChange={(v) => set('instagramUrl', v)} />
      <SaveButton status={status} onSave={handleSave} />
    </div>
  );
}
