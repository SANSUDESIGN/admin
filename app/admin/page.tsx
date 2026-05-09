'use client';

import Link from 'next/link';
import { useState } from 'react';

const sections = [
  { label: 'Hero', href: '/admin/hero', desc: 'Título, subtítulo, imagen de fondo' },
  { label: 'Obras', href: '/admin/works', desc: 'Título de sección, Instagram' },
  { label: 'Valores', href: '/admin/values', desc: 'Las 3 tarjetas de valores' },
  { label: 'Estudio', href: '/admin/studio', desc: 'Texto "Sobre mí"' },
  { label: 'Preguntas', href: '/admin/faq', desc: 'Preguntas frecuentes' },
  { label: 'Footer', href: '/admin/footer', desc: 'Contacto, redes, texto del pie' },
  { label: 'Productos', href: '/admin/products', desc: 'Catálogo completo' },
  { label: 'Fuentes', href: '/admin/font', desc: 'Tipografía del sitio' },
];

type PublishStatus = 'idle' | 'building' | 'pushing' | 'done' | 'error';

export default function AdminDashboard() {
  const [status, setStatus] = useState<PublishStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handlePublish() {
    setStatus('building');
    setErrorMsg('');

    const res = await fetch('/api/admin/publish', { method: 'POST' });
    const data = await res.json();

    if (!data.ok) {
      setErrorMsg(data.error ?? 'Error desconocido');
      setStatus('error');
      return;
    }

    setStatus('done');
    setTimeout(() => setStatus('idle'), 8000);
  }

  return (
    <div className="p-10 max-w-3xl">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Panel de control</p>
      <h1 className="text-3xl font-light tracking-tighter mb-10">¿Qué quieres editar hoy?</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-16">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex flex-col gap-1 p-5 bg-white border border-stone-200 hover:border-stone-900 transition-colors"
          >
            <span className="text-sm font-medium">{s.label}</span>
            <span className="text-xs text-stone-400 group-hover:text-stone-600 transition-colors">{s.desc}</span>
          </Link>
        ))}
      </div>

      {/* Publish */}
      <div className="border border-stone-200 bg-white p-6">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Publicar</p>
        <p className="text-sm text-stone-600 mb-6 leading-relaxed">
          Construye el sitio y sube los cambios a producción. Vercel desplegará automáticamente.
          El proceso puede tardar 1–2 minutos.
        </p>

        <button
          onClick={handlePublish}
          disabled={status === 'building' || status === 'pushing'}
          className={`px-6 py-3 text-xs uppercase tracking-widest transition-colors ${
            status === 'done'
              ? 'bg-green-700 text-white cursor-default'
              : status === 'error'
              ? 'bg-red-700 text-white'
              : 'bg-stone-900 text-white hover:bg-stone-700 disabled:opacity-40 disabled:cursor-wait'
          }`}
        >
          {status === 'idle' && 'Publicar sitio'}
          {status === 'building' && 'Compilando… (puede tardar ~1 min)'}
          {status === 'pushing' && 'Subiendo cambios…'}
          {status === 'done' && '¡Publicado! Vercel está desplegando'}
          {status === 'error' && 'Error — ver detalles abajo'}
        </button>

        {status === 'error' && errorMsg && (
          <pre className="mt-4 p-4 bg-red-50 text-red-800 text-xs leading-relaxed overflow-auto max-h-48 border border-red-200">
            {errorMsg}
          </pre>
        )}
      </div>
    </div>
  );
}
