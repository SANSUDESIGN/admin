import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-canvas text-stone-900 font-sans flex flex-col items-center justify-center px-6">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-6">404</p>
      <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4">Página no encontrada</h1>
      <p className="text-sm text-stone-500 mb-12">La pieza que buscás no existe o fue movida.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-stone-900 px-6 py-3 hover:bg-stone-900 hover:text-white transition-colors duration-300"
      >
        <ArrowLeft size={14} />
        Volver al inicio
      </Link>
    </main>
  );
}
