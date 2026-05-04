import { kv } from '@vercel/kv';
import type {
  HeroContent,
  WorksContent,
  ValuesContent,
  StudioContent,
  FaqContent,
  FooterContent,
  ProductsData,
} from './types';

export async function writeKv(key: string, data: unknown): Promise<void> {
  await kv.set(key, data);
}

export const getHeroContent = () => kv.get<HeroContent>('hero');
export const getWorksContent = () => kv.get<WorksContent>('works');
export const getValuesContent = () => kv.get<ValuesContent>('values');
export const getStudioContent = () => kv.get<StudioContent>('studio');
export const getFaqContent = () => kv.get<FaqContent>('faq');
export const getFooterContent = () => kv.get<FooterContent>('footer');
export const getProductsData = () => kv.get<ProductsData>('products');

export async function getProducts() {
  const data = await getProductsData();
  return data?.products ?? [];
}

export async function getVisibleProducts() {
  const products = await getProducts();
  return products.filter((p) => !p.hidden);
}
