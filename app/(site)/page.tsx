import {
  getHeroContent,
  getWorksContent,
  getValuesContent,
  getStudioContent,
  getFaqContent,
  getVisibleProducts,
} from '@/lib/content';
import { CustomCursor } from '@/components/custom-cursor';
import { Hero } from '@/components/hero';
import { SelectedWorks } from '@/components/selected-works';
import { ArtValues } from '@/components/art-values';
import { Studio } from '@/components/studio';
import { FAQ } from '@/components/faq';

export default function Page() {
  const heroContent = getHeroContent();
  const worksContent = getWorksContent();
  const valuesContent = getValuesContent();
  const studioContent = getStudioContent();
  const faqContent = getFaqContent();
  const products = getVisibleProducts();

  return (
    <div className="font-sans bg-canvas text-stone-900 min-h-screen w-full selection:bg-stone-200 selection:text-stone-900 overflow-x-hidden">
      <CustomCursor />
      <main>
        <Hero content={heroContent} />
        <SelectedWorks content={worksContent} products={products} />
        <ArtValues content={valuesContent} />
        <Studio content={studioContent} />
        <FAQ content={faqContent} />
      </main>
    </div>
  );
}
