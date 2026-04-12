import { getHeroContent } from '@/lib/content';
import { HeroForm } from './HeroForm';

export default function HeroAdminPage() {
  const content = getHeroContent();
  return (
    <div className="p-10 max-w-2xl">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Sección</p>
      <h1 className="text-3xl font-light tracking-tighter mb-10">Hero</h1>
      <HeroForm defaultValues={content} />
    </div>
  );
}
