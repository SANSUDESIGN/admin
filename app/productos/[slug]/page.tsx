import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { PRODUCTS, toSlug } from '@/lib/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: toSlug(p.title) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => toSlug(p.title) === slug);
  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | Sansu Design`,
      description: product.description,
      images: [{ url: product.images[0], alt: product.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | Sansu Design`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => toSlug(p.title) === slug);

  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const igDmUrl = 'https://ig.me/m/sansudesign';
  const waUrl = `https://wa.me/5491126201691?text=${encodeURIComponent(`Hola, me interesa la pieza "${product.title}" (${product.price})`)}`;

  const numericPrice = product.price.replace('ARS ', '').replace(/\./g, '');
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images[0],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ARS',
      price: numericPrice,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <main className="min-h-screen bg-canvas text-stone-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Back */}
      <div className="container mx-auto px-6 pt-28 pb-8">
        <Link
          href="/#seleccion-de-obras"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft size={14} />
          Volver
        </Link>
      </div>

      {/* Product */}
      <div className="container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Image gallery — vertical scroll */}
          <div className="flex flex-col gap-4">
            {product.images.map((src, i) => (
              <div key={i} className="overflow-hidden bg-stone-100 aspect-[4/5]">
                <img
                  src={src}
                  alt={`${product.title} — vista ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Details — sticky on desktop */}
          <div className="lg:sticky lg:top-28 lg:self-start flex flex-col gap-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-2">{product.title}</h1>
              <p className="text-sm text-stone-400">{product.year}</p>
            </div>

            <p className="text-3xl font-medium tracking-tight">{product.price}</p>

            <p className="text-sm text-stone-500 leading-relaxed">{product.description}</p>

            <div className="flex flex-col gap-2 text-sm text-stone-500 border-t border-stone-200 pt-6">
              <div className="flex justify-between">
                <span className="uppercase tracking-widest text-xs">Material</span>
                <span>{product.medium}</span>
              </div>
              <div className="flex justify-between">
                <span className="uppercase tracking-widest text-xs">Dimensiones</span>
                <span>{product.dimensions}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              <a
                href={product.mercadolibreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-4 bg-stone-900 text-white text-xs uppercase tracking-widest hover:bg-stone-700 transition-colors duration-300"
              >
                Comprar en MercadoLibre
                <ArrowUpRight size={16} />
              </a>
              <a
                href={igDmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-4 border border-stone-900 text-xs uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors duration-300"
              >
                Consultar por Instagram
                <ArrowUpRight size={16} />
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-4 border border-stone-200 text-stone-400 text-xs uppercase tracking-widest hover:border-stone-900 hover:text-stone-900 transition-colors duration-300"
              >
                Consultar por WhatsApp
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Related pieces */}
        {related.length > 0 && (
          <div className="mt-40">
            <div className="flex justify-between items-end mb-16 border-b border-stone-200 pb-6">
              <h2 className="text-3xl md:text-4xl font-light tracking-tighter uppercase">Piezas relacionadas</h2>
              <span className="text-xs tracking-widest hidden md:block">{product.category}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-16">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/productos/${toSlug(p.title)}`}
                  className="group flex flex-col"
                >
                  <div className="relative overflow-hidden aspect-[4/5] mb-4 bg-stone-100">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-medium tracking-tight mb-1">{p.title}</h3>
                  <p className="text-sm text-stone-400 mb-3">{p.medium}</p>
                  <p className="text-sm font-medium">{p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
