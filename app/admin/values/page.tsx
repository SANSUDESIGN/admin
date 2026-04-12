import { getValuesContent } from '@/lib/content';
import { ValuesForm } from './ValuesForm';

export default function ValuesAdminPage() {
  const content = getValuesContent();
  return (
    <div className="p-10 max-w-2xl">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Sección</p>
      <h1 className="text-3xl font-light tracking-tighter mb-10">Valores</h1>
      <ValuesForm defaultValues={content} />
    </div>
  );
}
