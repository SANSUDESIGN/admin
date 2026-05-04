import { getFaqContent } from '@/lib/content';
import { FaqForm } from './FaqForm';

export default async function FaqAdminPage() {
  const content = await getFaqContent();
  return (
    <div className="p-10 max-w-2xl">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Sección</p>
      <h1 className="text-3xl font-light tracking-tighter mb-10">Preguntas frecuentes</h1>
      <FaqForm defaultValues={content} />
    </div>
  );
}
