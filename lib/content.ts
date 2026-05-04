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

async function kvGet<T>(key: string): Promise<T> {
  const val = await kv.get<T>(key);
  if (val === null) throw new Error(`KV key "${key}" not found — run the seed script first.`);
  return val;
}

export async function writeKv(key: string, data: unknown): Promise<void> {
  await kv.set(key, data);
}

export const getHeroContent = () => kvGet<HeroContent>('hero');
export const getWorksContent = () => kvGet<WorksContent>('works');
export const getValuesContent = () => kvGet<ValuesContent>('values');
export const getStudioContent = () => kvGet<StudioContent>('studio');
export const getFaqContent = () => kvGet<FaqContent>('faq');
export const getFooterContent = () => kvGet<FooterContent>('footer');
export const getProductsData = () => kvGet<ProductsData>('products');

export async function getProducts() {
  const data = await getProductsData();
  return data?.products ?? [];
}

export async function getVisibleProducts() {
  const products = await getProducts();
  return products.filter((p) => !p.hidden);
}
