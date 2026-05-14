import { Redis } from '@upstash/redis';
import type {
  HeroContent,
  WorksContent,
  ValuesContent,
  StudioContent,
  FaqContent,
  FooterContent,
  ProductsData,
  FontContent,
} from './types';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

async function kvGet<T>(key: string): Promise<T> {
  const val = await redis.get<T>(key);
  if (val === null) throw new Error(`KV key "${key}" not found — run the seed script first.`);
  return val;
}

export async function writeKv(key: string, data: unknown): Promise<void> {
  await redis.set(key, data);
}

export const getHeroContent = () => kvGet<HeroContent>('hero');
export const getWorksContent = () => kvGet<WorksContent>('works');
export const getValuesContent = () => kvGet<ValuesContent>('values');
export const getStudioContent = () => kvGet<StudioContent>('studio');
export const getFaqContent = () => kvGet<FaqContent>('faq');
export const getFooterContent = () => kvGet<FooterContent>('footer');
export const getProductsData = () => kvGet<ProductsData>('products');
export async function getFontContent(): Promise<FontContent> {
  try {
    return await kvGet<FontContent>('font');
  } catch {
    return { headingFont: 'Geist', bodyFont: 'Geist', fontSize: 16 };
  }
}

export async function getProducts() {
  const data = await getProductsData();
  return data?.products ?? [];
}

export async function getVisibleProducts() {
  const products = await getProducts();
  return products.filter((p) => !p.hidden);
}
