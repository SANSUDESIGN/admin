import { getWorksContent } from '@/lib/content';
import { WorksForm } from './WorksForm';

export default function WorksAdminPage() {
  const content = getWorksContent();
  return (
    <div className="p-10 max-w-2xl">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Sección</p>
      <h1 className="text-3xl font-light tracking-tighter mb-10">Obras</h1>
      <WorksForm defaultValues={content} />
    </div>
  );
}
