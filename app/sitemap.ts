import { getVisibleProducts } from '@/lib/content';
import { toSlug } from '@/lib/data';

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sansu.design';

  const products = getVisibleProducts().map((p) => ({
    url: `${base}/productos/${toSlug(p.title)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${base}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    ...products,
  ];
}
