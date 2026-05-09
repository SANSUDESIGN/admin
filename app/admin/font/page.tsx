import { getFontContent } from '@/lib/content';
import { FontForm } from './FontForm';

export default async function FontAdminPage() {
  const content = await getFontContent();
  return (
    <div className="p-10 max-w-2xl">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Sección</p>
      <h1 className="text-3xl font-light tracking-tighter mb-10">Tipografía</h1>
      <FontForm defaultValues={content} />
    </div>
  );
}
