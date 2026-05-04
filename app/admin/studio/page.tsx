import { getStudioContent } from '@/lib/content';
import { StudioForm } from './StudioForm';

export default async function StudioAdminPage() {
  const content = await getStudioContent();
  return (
    <div className="p-10 max-w-2xl">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Sección</p>
      <h1 className="text-3xl font-light tracking-tighter mb-10">Estudio</h1>
      <StudioForm defaultValues={content} />
    </div>
  );
}
