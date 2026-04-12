'use client';

import { useState } from 'react';
import type { FooterContent } from '@/lib/types';
import { Field, Textarea, SaveButton } from '@/components/admin/FormControls';

export function FooterForm({ defaultValues }: { defaultValues: FooterContent }) {
  const [form, setForm] = useState(defaultValues);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  function set(key: keyof FooterContent, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    setStatus('saving');
    const res = await fetch('/api/admin/footer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? 'saved' : 'error');
    setTimeout(() => setStatus('idle'), 3000);
  }

  return (
    <div className="flex flex-col gap-6">
      <Field label="Tagline (ej. Hablemos de arte.)" value={form.tagline} onChange={(v) => set('tagline', v)} />
      <Field label="Email de contacto" value={form.email} onChange={(v) => set('email', v)} />

      <div className="border-t border-stone-200 pt-6">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-4">Columna Estudio</p>
        <Field label="Título de columna" value={form.studioHeading} onChange={(v) => set('studioHeading', v)} />
        <div className="mt-4">
          <Textarea label="Texto" value={form.studioText} onChange={(v) => set('studioText', v)} rows={4} />
        </div>
      </div>

      <div className="border-t border-stone-200 pt-6">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-4">Columna Redes</p>
        <div className="flex flex-col gap-4">
          <Field label="Título de columna" value={form.socialHeading} onChange={(v) => set('socialHeading', v)} />
          <Field label="Handle de Instagram" value={form.instagramHandle} onChange={(v) => set('instagramHandle', v)} />
          <Field label="URL de Instagram" value={form.instagramUrl} onChange={(v) => set('instagramUrl', v)} />
          <Field label="URL de WhatsApp" value={form.whatsappUrl} onChange={(v) => set('whatsappUrl', v)} />
        </div>
      </div>

      <div className="border-t border-stone-200 pt-6">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-4">Parte inferior</p>
        <div className="flex flex-col gap-4">
          <Field label="Copyright" value={form.copyright} onChange={(v) => set('copyright', v)} />
          <Textarea label="Nota de privacidad" value={form.privacyNote} onChange={(v) => set('privacyNote', v)} rows={3} />
          <Textarea label="Tagline en menú de navegación" value={form.navTagline} onChange={(v) => set('navTagline', v)} rows={3} />
        </div>
      </div>

      <SaveButton status={status} onSave={handleSave} />
    </div>
  );
}
