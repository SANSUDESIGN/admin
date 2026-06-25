import Link from 'next/link';

const sections = [
  { label: 'Hero', href: '/admin/hero', desc: 'Tagline, subtítulo, imagen de fondo' },
  { label: 'Obras', href: '/admin/works', desc: 'Título de sección, Instagram' },
  { label: 'Valores', href: '/admin/values', desc: 'Las 3 tarjetas de valores' },
  { label: 'Estudio', href: '/admin/studio', desc: 'Texto "Sobre mí"' },
  { label: 'Preguntas', href: '/admin/faq', desc: 'Preguntas frecuentes' },
  { label: 'Footer', href: '/admin/footer', desc: 'Contacto, redes, texto del pie' },
  { label: 'Productos', href: '/admin/products', desc: 'Catálogo: añadir, editar, activar/desactivar' },
  { label: 'Subir imágenes', href: '/admin/upload', desc: 'Subir fotos al CDN' },
];

export default function AdminDashboard() {
  return (
    <div className="p-10 max-w-3xl">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Panel de control</p>
      <h1 className="text-3xl font-light tracking-tighter mb-10">¿Qué quieres editar hoy?</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
    </div>
  );
}
