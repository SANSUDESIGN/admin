'use client';

import Link from 'next/link';
import { ArrowLeft, RotateCcw } from 'lucide-react';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-canvas text-stone-900 font-sans flex flex-col items-center justify-center px-6">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-6">Error</p>
      <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4">Algo salió mal</h1>
      <p className="text-sm text-stone-500 mb-12">Ocurrió un error inesperado. Podés intentarlo de nuevo.</p>
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-stone-900 px-6 py-3 hover:bg-stone-900 hover:text-white transition-colors duration-300"
        >
          <RotateCcw size={14} />
          Reintentar
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft size={14} />
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
