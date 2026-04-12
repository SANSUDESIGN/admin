import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type {
  HeroContent,
  WorksContent,
  ValuesContent,
  StudioContent,
  FaqContent,
  FooterContent,
  ProductsData,
} from './types';

const contentDir = path.join(process.cwd(), 'content');

function readYaml<T>(filename: string): T {
  const filePath = path.join(contentDir, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  return yaml.load(raw) as T;
}

export function writeYaml(filename: string, data: unknown): void {
  const filePath = path.join(contentDir, filename);
  fs.writeFileSync(filePath, yaml.dump(data, { lineWidth: -1 }), 'utf8');
}

export const getHeroContent = () => readYaml<HeroContent>('hero.yml');
export const getWorksContent = () => readYaml<WorksContent>('works.yml');
export const getValuesContent = () => readYaml<ValuesContent>('values.yml');
export const getStudioContent = () => readYaml<StudioContent>('studio.yml');
export const getFaqContent = () => readYaml<FaqContent>('faq.yml');
export const getFooterContent = () => readYaml<FooterContent>('footer.yml');
export const getProductsData = () => readYaml<ProductsData>('products.yml');
export const getProducts = () => getProductsData().products;
export const getVisibleProducts = () => getProducts().filter((p) => !p.hidden);
