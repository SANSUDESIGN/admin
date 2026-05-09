'use client';

import { useEffect, useRef, useState } from 'react';
import type { FontContent } from '@/lib/types';
import { SaveButton } from '@/components/admin/FormControls';

const HEADING_FONTS = [
  'Geist',
  'Cormorant Garamond',
  'Playfair Display',
  'DM Serif Display',
  'Fraunces',
  'Libre Baskerville',
  'Lora',
  'Bodoni Moda',
  'Merriweather',
  'PT Serif',
  'IM Fell English SC',
  'Crimson Text',
  'Spectral',
  'Bitter',
];

const BODY_FONTS = [
  'Geist',
  'Inter',
  'DM Sans',
  'Plus Jakarta Sans',
  'Outfit',
  'Nunito Sans',
  'Source Sans 3',
  'Raleway',
  'Lato',
  'Montserrat',
  'Work Sans',
  'Jost',
  'Syne',
  'Mulish',
];

const ALL_FONTS = Array.from(new Set([...HEADING_FONTS, ...BODY_FONTS]));

function googleFontsUrl(families: string[]): string {
  const unique = Array.from(new Set(families));
  const params = unique
    .map((f) => `family=${encodeURIComponent(f)}:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

export function FontForm({ defaultValues }: { defaultValues: FontContent }) {
  const [form, setForm] = useState(defaultValues);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const linkRef = useRef<HTMLLinkElement | null>(null);

  useEffect(() => {
    if (!linkRef.current) {
      const el = document.createElement('link');
      el.rel = 'stylesheet';
      el.id = 'admin-font-preview';
      document.head.appendChild(el);
      linkRef.current = el;
    }
    linkRef.current.href = googleFontsUrl(ALL_FONTS);
  }, []);

  async function handleSave() {
    setStatus('saving');
    const res = await fetch('/api/admin/font', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? 'saved' : 'error');
    setTimeout(() => setStatus('idle'), 3000);
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-widest text-stone-400">
            Fuente de títulos
          </label>
          <select
            value={form.headingFont}
            onChange={(e) => setForm((f) => ({ ...f, headingFont: e.target.value }))}
            className="border border-stone-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-stone-900 transition-colors"
          >
            {HEADING_FONTS.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-widest text-stone-400">
            Fuente de cuerpo
          </label>
          <select
            value={form.bodyFont}
            onChange={(e) => setForm((f) => ({ ...f, bodyFont: e.target.value }))}
            className="border border-stone-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-stone-900 transition-colors"
          >
            {BODY_FONTS.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live preview */}
      <div className="border border-stone-200 bg-white p-8 flex flex-col gap-4">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Vista previa</p>
        <h2
          style={{ fontFamily: `'${form.headingFont}', serif` }}
          className="text-4xl font-light tracking-tighter text-stone-900"
        >
          Sansu Design
        </h2>
        <p
          style={{ fontFamily: `'${form.bodyFont}', sans-serif` }}
          className="text-sm text-stone-600 leading-relaxed max-w-sm"
        >
          Esculturas orgánicas y detalles de interior, hechos a mano — una pieza a la vez.
        </p>
        <div className="border-t border-stone-100 pt-4 flex flex-col gap-1">
          <p className="text-[10px] uppercase tracking-widest text-stone-300">
            Título — {form.headingFont}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-stone-300">
            Cuerpo — {form.bodyFont}
          </p>
        </div>
      </div>

      <SaveButton status={status} onSave={handleSave} />
    </div>
  );
}
