'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const sections = [
  { label: 'Dashboard', href: '/admin' },
  { label: '──────────', href: null },
  { label: 'Hero', href: '/admin/hero' },
  { label: 'Obras', href: '/admin/works' },
  { label: 'Valores', href: '/admin/values' },
  { label: 'Estudio', href: '/admin/studio' },
  { label: 'Preguntas', href: '/admin/faq' },
  { label: 'Footer', href: '/admin/footer' },
  { label: '──────────', href: null },
  { label: 'Productos', href: '/admin/products' },
  { label: 'Subir imágenes', href: '/admin/upload' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <aside className="w-56 shrink-0 bg-white border-r border-stone-200 flex flex-col">
      <div className="px-6 py-6 border-b border-stone-200">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">Admin</p>
        <p className="font-bold text-sm tracking-tight uppercase">SANSU/ DESIGN</p>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {sections.map((s, i) =>
          s.href === null ? (
            <p key={i} className="text-stone-200 text-xs px-3 py-1 select-none">{s.label}</p>
          ) : (
            <Link
              key={s.href}
              href={s.href}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                (s.href === '/admin' ? pathname === '/admin' : pathname.startsWith(s.href))
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {s.label}
            </Link>
          )
        )}
      </nav>

      <div className="px-3 pb-4 flex flex-col gap-1">
        <a
          href="https://sansu.design"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-3 py-2 text-xs text-stone-400 hover:text-stone-600 transition-colors"
        >
          Ver sitio →
        </a>
        <button
          onClick={handleLogout}
          className="text-left px-3 py-2 text-xs text-stone-400 hover:text-stone-600 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
