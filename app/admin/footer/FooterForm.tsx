'use client';

import { useState } from 'react';
import type { FooterContent, FooterNavLink } from '@/lib/types';
import { Field, Textarea, SaveButton } from '@/components/admin/FormControls';

const DEFAULT_NAV_LINKS: FooterNavLink[] = [
  { label: 'Obras', href: '/#wall-art' },
  { label: 'Sobre mí', href: '/#sobre-mi' },
  { label: 'Preguntas', href: '/#preguntas' },
];

// Fallbacks mirror the storefront defaults so the editor shows the live copy, not blanks.
const FALLBACKS = {
  exploreHeading: 'EXPLORAR',
  whatsappLabel: 'WhatsApp',
  brand: 'SANSU',
  privacyLabel: 'PRIVACIDAD',
};

export function FooterForm({ defaultValues }: { defaultValues: FooterContent }) {
  const [form, setForm] = useState<FooterContent>({
    ...defaultValues,
    exploreHeading: defaultValues.exploreHeading || FALLBACKS.exploreHeading,
    whatsappLabel: defaultValues.whatsappLabel || FALLBACKS.whatsappLabel,
    brand: defaultValues.brand || FALLBACKS.brand,
    privacyLabel: defaultValues.privacyLabel || FALLBACKS.privacyLabel,
    navLinks: defaultValues.navLinks?.length ? defaultValues.navLinks : DEFAULT_NAV_LINKS,
  });
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  function set(key: keyof FooterContent, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setLink(index: number, key: keyof FooterNavLink, value: string) {
    setForm((f) => ({
      ...f,
      navLinks: f.navLinks.map((l, i) => (i === index ? { ...l, [key]: value } : l)),
    }));
  }

  function addLink() {
    setForm((f) => ({ ...f, navLinks: [...f.navLinks, { label: '', href: '' }] }));
  }

  function removeLink(index: number) {
    setForm((f) => ({ ...f, navLinks: f.navLinks.filter((_, i) => i !== index) }));
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
      <Textarea label="Texto de contacto" value={form.studioText} onChange={(v) => set('studioText', v)} rows={4} />

      <div className="border-t border-stone-200 pt-6">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-4">Columna Explorar</p>
        <div className="flex flex-col gap-4">
          <Field label="Título de columna" value={form.exploreHeading} onChange={(v) => set('exploreHeading', v)} />
          {form.navLinks.map((link, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="flex-1">
                <Field label={`Enlace ${i + 1} — texto`} value={link.label} onChange={(v) => setLink(i, 'label', v)} />
              </div>
              <div className="flex-1">
                <Field label="Destino (href)" value={link.href} onChange={(v) => setLink(i, 'href', v)} />
              </div>
              <button
                type="button"
                onClick={() => removeLink(i)}
                className="mb-1 px-3 py-2 text-xs uppercase tracking-widest text-stone-500 border border-stone-200 hover:border-stone-900 hover:text-stone-900 transition-colors"
              >
                Quitar
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addLink}
            className="w-fit text-xs uppercase tracking-widest text-stone-900 underline underline-offset-4"
          >
            + Añadir enlace
          </button>
        </div>
      </div>

      <div className="border-t border-stone-200 pt-6">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-4">Columna Redes</p>
        <div className="flex flex-col gap-4">
          <Field label="Título de columna" value={form.socialHeading} onChange={(v) => set('socialHeading', v)} />
          <Field label="Handle de Instagram" value={form.instagramHandle} onChange={(v) => set('instagramHandle', v)} />
          <Field label="URL de Instagram" value={form.instagramUrl} onChange={(v) => set('instagramUrl', v)} />
          <Field label="Etiqueta de WhatsApp" value={form.whatsappLabel} onChange={(v) => set('whatsappLabel', v)} />
          <Field label="URL de WhatsApp" value={form.whatsappUrl} onChange={(v) => set('whatsappUrl', v)} />
        </div>
      </div>

      <div className="border-t border-stone-200 pt-6">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-4">Parte inferior</p>
        <div className="flex flex-col gap-4">
          <Field label="Marca" value={form.brand} onChange={(v) => set('brand', v)} />
          <Field label="Etiqueta de privacidad" value={form.privacyLabel} onChange={(v) => set('privacyLabel', v)} />
          <Field label="Copyright" value={form.copyright} onChange={(v) => set('copyright', v)} />
        </div>
      </div>

      <SaveButton status={status} onSave={handleSave} />
    </div>
  );
}
